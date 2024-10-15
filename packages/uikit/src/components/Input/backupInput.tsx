import clsx from 'clsx';
import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import googleLibphonenumber from 'google-libphonenumber';
import './PhoneInput.css';

const PhoneNumberUtil = googleLibphonenumber.PhoneNumberUtil;
const phoneUtil = PhoneNumberUtil.getInstance();

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  validate?: (value: string) => boolean;
  isPhoneInput?: boolean;
  onValidationChange?: (isValid: boolean) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, validate, isPhoneInput, onValidationChange, ...props }, ref) => {
    const [value, setValue] = useState(props.defaultValue as string || '');
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState(true); // State to track validity
    const [showLabel, setShowLabel] = useState(true);

    const validateInput = useCallback(
      (inputValue: string) => {
        if (validate) {
          return validate(inputValue);
        }
        if (props.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(inputValue);
        }
        if (isPhoneInput) {
          try {
            const number = phoneUtil.parseAndKeepRawInput(inputValue, 'PL'); // Use country code if necessary
            return phoneUtil.isValidNumber(number);
          } catch {
            return false;
          }
        }
        return inputValue.trim() !== '';
      },
      [validate, props.type, isPhoneInput]
    );

    // UseEffect to trigger validation on input value changes
    useEffect(() => {
      const validationResult = validateInput(value);
      setIsValid(validationResult); // Update the validation state
      if (onValidationChange) {
        onValidationChange(validationResult);
      }
    }, [value, validateInput, onValidationChange, touched]);

    const handleBlur = () => {
      setTouched(true); // Mark the input as touched on blur
    };

    const handleChange = (newValue: string) => {
      setValue(newValue);
      setShowLabel(newValue.replace(/\D/g, '').length <= 2); // Hide label if more than 2 characters
    };

    // Tailwind class management for borders
    const inputBaseClasses = 'h-[58px] w-full rounded-[10px] px-4 text-lg bg-extra-dark border-2';
    const focusClasses = 'focus:outline-none focus:border-blue-light';
    const errorClasses = !isValid && touched ? 'border-error' : isValid ? 'border-green' : 'border-blue-medium';

    if (isPhoneInput) {
      return (
        <div className={clsx(inputBaseClasses, focusClasses, errorClasses)}>
          <PhoneInput
            value={value}
            onChange={handleChange}
            defaultCountry="pl"
            className="flex items-center w-full h-full bg-transparent text-blue-lightest"
            inputClassName="w-full h-full bg-transparent text-blue-lightest focus:outline-none"
            countrySelectorStyleProps={{
              buttonClassName: 'text-lg text-blue-lightest px-2 bg-transparent',
              dropdownStyleProps: {
                className: 'bg-extra-dark text-blue-lightest',
                listItemClassName: 'hover:bg-blue-medium',
              },
            }}
            inputProps={{
              name: 'phone',
              required: props.required,
              autoFocus: false,
              onBlur: handleBlur,
            }}
          />
          {showLabel && <span className="absolute left-[98px] top-1/2 transform -translate-y-1/2 text-blue-light">Telefon*</span>}
        </div>
      );
    }

    return (
      <input
        {...props}
        className={clsx(inputBaseClasses, focusClasses, errorClasses, className)}
        ref={ref}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value)}
        value={value}
      />
    );
  }
);

Input.displayName = 'Input';
export { Input };

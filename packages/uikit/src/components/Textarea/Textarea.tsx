import clsx from 'clsx';
import { forwardRef, useState, useEffect, useCallback, type TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: boolean;
  validate?: (value: string) => boolean;
  onValidationChange?: (isValid: boolean) => void;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, validate, onValidationChange, onChange, value: propValue, ...props }, ref) => {
    const [value, setValue] = useState(propValue as string || '');
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState(false);
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const validateTextarea = useCallback((inputValue: string) => {
      if (validate) {
        return validate(inputValue);
      }
      return inputValue.trim() !== '';
    }, [validate]);

    useEffect(() => {
      const validationResult = validateTextarea(value);
      setIsValid(validationResult);
      if (onValidationChange) {
        onValidationChange(validationResult);
      }
    }, [value, validateTextarea, onValidationChange]);

    useEffect(() => {
      setValue(propValue as string || '');
    }, [propValue]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      setIsFocused(false);
      setTouched(true);
      const validationResult = validateTextarea(value);
      setError(!validationResult);
      setIsValid(validationResult);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (touched) {
        const validationResult = validateTextarea(newValue);
        setError(!validationResult);
        setIsValid(validationResult);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative">
        <textarea
          className={clsx(
            'flex w-full items-center justify-center rounded-[10px] px-4 py-5 text-lg text-blue-lightest bg-extra-dark border-2 h-[160px]',
            'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none pt-8', // Added pt-8 to make room for the label
            {
              'border-blue-medium': !isFocused && !error && !touched,
              'border-blue-light': isFocused,
              'border-error': touched && error,
              'border-green': !error && touched && isValid,
            },
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          {...props}
        />
        {label && (
          <label
            className={clsx(
              'absolute left-3 text-blue-light text-lg transition-all duration-200 bg-extra-dark px-2',
              'pointer-events-none select-none', // Make label non-interactive
              {
                'top-4': !isFocused && !value,
                'top-[8px] left-2 text-xs': isFocused || value,
              }
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
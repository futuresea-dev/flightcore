import clsx from 'clsx'
import googleLibphonenumber from 'google-libphonenumber'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { PhoneInput as ReactPhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import './PhoneInput.css'

const PhoneNumberUtil = googleLibphonenumber.PhoneNumberUtil
const phoneUtil = PhoneNumberUtil.getInstance()

export type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string
  validate?: (value: string) => boolean
  onValidationChange?: (isValid: boolean) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | string) => void
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, label, validate, onValidationChange, onChange, ...props }, ref) => {
    const [value, setValue] = useState((props.defaultValue as string) || '')
    const [touched, setTouched] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [isFocused, setIsFocused] = useState(false)
    const [hasNumberEntered, setHasNumberEntered] = useState(false)

    const validateInput = useCallback(
      (inputValue: string) => {
        if (validate) {
          return validate(inputValue)
        }
        try {
          const number = phoneUtil.parseAndKeepRawInput(inputValue, 'PL')
          return phoneUtil.isValidNumber(number)
        } catch {
          return false
        }
      },
      [validate],
    )

    useEffect(() => {
      const validationResult = validateInput(value)
      setIsValid(validationResult)
      if (onValidationChange) {
        onValidationChange(validationResult)
      }

      const digits = value.replace(/\D/g, '')
      setHasNumberEntered(digits.length > 3)
    }, [value, validateInput, onValidationChange])

    const handleBlur = () => {
      setTouched(true)
      setIsFocused(false)
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleChange = (newValue: string) => {
      setValue(newValue)
      if (onChange) {
        const syntheticEvent = {
          target: {
            name: props.name,
            value: newValue,
          },
        } as React.ChangeEvent<HTMLInputElement>

        onChange(syntheticEvent)
      }
    }

    const inputBaseClasses = 'h-[58px] w-full rounded-[10px] px-4 text-lg bg-extra-dark border-2'
    const focusClasses = 'focus:outline-none focus:border-blue-light'
    const errorClasses = !isValid && touched ? 'border-error' : isValid ? 'border-green' : 'border-blue-medium'
    const dynamicPaddingClass = isFocused || hasNumberEntered ? 'input-active' : ''

    return (
      <div className={clsx(inputBaseClasses, focusClasses, errorClasses, 'relative', className)}>
        <ReactPhoneInput
          value={value}
          onChange={handleChange}
          defaultCountry="pl"
          className={clsx('relative w-full h-full bg-transparent text-blue-lightest', dynamicPaddingClass)}
          inputClassName="w-full h-full bg-transparent text-blue-lightest focus:outline-none pl-32"
          countrySelectorStyleProps={{
            buttonClassName: 'absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-blue-lightest bg-transparent',
            dropdownStyleProps: {
              className: 'bg-extra-dark text-blue-lightest',
              listItemClassName: 'hover:bg-blue-medium',
            },
          }}
          inputProps={{
            name: props.name,
            required: props.required,
            autoFocus: false,
            onBlur: handleBlur,
            onFocus: handleFocus,
          }}
        />

        {label && (
          <label
            className={clsx('absolute text-blue-light pointer-events-none transition-all duration-200 bg-extra-dark px-2', {
              'top-1/2 transform -translate-y-1/2 left-[115px] text-lg': !isFocused && !hasNumberEntered,
              'top-[8px] left-[60px] text-xs': isFocused || hasNumberEntered,
            })}>
            {label}
          </label>
        )}
      </div>
    )
  },
)

PhoneInput.displayName = 'PhoneInput'
export { PhoneInput }

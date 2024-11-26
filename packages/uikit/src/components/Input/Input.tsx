import clsx from 'clsx'
import React, { forwardRef, useCallback, useEffect, useState, type ClassAttributes, type InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & {
    label?: string
    validate?: (value: string) => boolean
    onValidationChange?: (isValid: boolean) => void
  }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, validate, onValidationChange, ...props }, ref) => {
    const [value, setValue] = useState((props.defaultValue as string) || '')
    const [touched, setTouched] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [error, setError] = useState(false)

    const validateInput = useCallback(
      (inputValue: string) => {
        if (validate) {
          return validate(inputValue)
        }
        return inputValue.trim() !== ''
      },
      [validate],
    )

    useEffect(() => {
      const validationResult = validateInput(value)
      setIsValid(validationResult)
      if (onValidationChange) {
        onValidationChange(validationResult)
      }
    }, [value, validateInput, onValidationChange])

    const handleBlur = () => {
      setIsFocused(false)
      setTouched(true)
      const validationResult = validateInput(value)
      setError(!validationResult)
      setIsValid(validationResult)
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      if (touched) {
        const validationResult = validateInput(newValue)
        setError(!validationResult)
        setIsValid(validationResult)
      }
      if (props.onChange) {
        props.onChange(e)
      }
    }

    const inputBaseClasses = 'h-[58px] w-full rounded-[10px] px-4 pt-6 text-lg bg-extra-dark border-2' // Added pt-6 to make room for the label
    const focusClasses = 'focus:outline-none focus:border-blue-light'
    const errorClasses = error && touched ? 'border-error' : isValid && touched ? 'border-green' : 'border-blue-medium'

    return (
      <div className="relative">
        <input
          {...props}
          className={clsx(inputBaseClasses, focusClasses, errorClasses, className)}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
        />
        {label && (
          <label
            className={clsx(
              'absolute left-3 text-blue-light text-lg transition-all duration-200 bg-extra-dark px-2',
              'pointer-events-none select-none',
              {
                'top-4': !isFocused && !value,
                'top-[8px] left-2 text-xs': isFocused || value,
              },
            )}>
            {label}
          </label>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

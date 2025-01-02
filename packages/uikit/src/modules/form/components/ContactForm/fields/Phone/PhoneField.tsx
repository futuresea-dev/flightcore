import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { Control } from 'react-hook-form'
import { InputPhoneNumber } from '../../../InputPhoneNumber/InputPhoneNumber'
import { validatePhoneNumber } from '../../../InputPhoneNumber/InputPhoneNumberValidator'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface PhoneFieldProps {
  control: Control<ContactFormValues>
}

export const PhoneField: FC<PhoneFieldProps> = ({ control }) => {
  const [isValidPhone, setIsValidPhone] = useState(false)

  const {
    field: { value, onBlur, onChange },
    fieldState: { error, invalid, isTouched },
  } = useContactFormControl({
    control,
    name: 'phone',
    rules: {
      required: {
        value: true,
        message: 'Numer telefonu jest wymagany',
      },
      validate: {
        validPhone: async (value: string) => {
          if (!value || !value.trim()) {
            setIsValidPhone(false)
            return true
          }
          const isValid = await validatePhoneNumber(value)
          setIsValidPhone(isValid)
          return isValid || 'Niepoprawny numer telefonu'
        },
      },
    },
    defaultValue: '',
  })

  useEffect(() => {
    const validateValue = async () => {
      if (!value || !value.trim()) {
        setIsValidPhone(false)
        return
      }
      const isValid = await validatePhoneNumber(value)
      setIsValidPhone(isValid)
    }
    validateValue()
  }, [value])

  const showError = isTouched && invalid && value?.trim().length > 0
  const showValid = Boolean(value?.trim()) && isValidPhone

  return (
    <InputPhoneNumber
      name="phone"
      label="Telefon"
      value={value || ''}
      onChange={(newValue) => {
        onChange(newValue)
      }}
      onBlur={onBlur}
      error={showError}
      valid={showValid}
    />
  )
}

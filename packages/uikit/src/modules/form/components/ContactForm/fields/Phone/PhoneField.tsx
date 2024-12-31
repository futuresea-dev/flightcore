import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { InputHelperText } from '../../../InputHelperText/InputHelperText'
import { InputPhoneNumber } from '../../../InputPhoneNumber/InputPhoneNumber'
import { validatePhoneNumber } from '../../../InputPhoneNumber/InputPhoneNumberValidator'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface PhoneFieldProps {
  control: Control<ContactFormValues>
}

export const PhoneField: FC<PhoneFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error, invalid, isDirty, isTouched },
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
          // Jeśli pole jest puste, nie pokazujemy błędu
          if (!value?.trim()) return true

          // Sprawdzamy czy numer jest poprawny
          const isValid = await validatePhoneNumber(value)
          return isValid || 'Niepoprawny numer telefonu'
        },
      },
    },
  })

  // Pole jest valid tylko gdy:
  // - było dotknięte (isTouched)
  // - ma wartość (value?.trim())
  // - przeszło walidację (!invalid)
  // - przeszło pełną walidację (value?.length >= 9)
  const isValid = isTouched && !invalid && Boolean(value?.trim()) && value?.length >= 9

  // Pokazujemy błąd tylko gdy pole było dotknięte i jest niepoprawne
  const showError = isTouched && invalid

  return (
    <>
      <InputPhoneNumber
        name="phone"
        label="Telefon"
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        error={showError}
        valid={isValid}
      />
      {error?.message && <InputHelperText variant="error" message={error.message} />}
    </>
  )
}

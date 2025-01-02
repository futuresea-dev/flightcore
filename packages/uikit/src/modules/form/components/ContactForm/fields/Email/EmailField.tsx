import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { InputEmail } from '../../../InputEmail/InputEmail'
import { InputHelperText } from '../../../InputHelperText/InputHelperText'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface EmailFieldProps {
  control: Control<ContactFormValues>
}

export const EmailField: FC<EmailFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error, invalid, isTouched },
  } = useContactFormControl({
    control,
    name: 'email',
    rules: {
      required: {
        value: true,
        message: 'Email jest wymagany',
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Niepoprawny adres email',
      },
    },
  })

  const showValid = Boolean(value && isTouched && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))

  return (
    <InputEmail
      id="email"
      name="email"
      label="Email"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={isTouched && (invalid || !!error?.message)}
      valid={showValid}
      after={error?.message && <InputHelperText variant="error" message={error.message} />}
    />
  )
}

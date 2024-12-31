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
    fieldState: { error, invalid, isDirty },
  } = useContactFormControl({
    control,
    name: 'email',
    rules: {
      required: {
        value: true,
        message: 'Email jest wymagany',
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
        message: 'Niepoprawny adres email',
      },
      validate: (value) => {
        if (value.length < 5) return 'Email powinien mieć co najmniej 5 znaków'
        if (!value.includes('@')) return 'Email musi zawierać znak @'
        if (!value.includes('.')) return 'Email musi zawierać kropkę'
        return true
      },
    },
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
  const showValid = isDirty && !invalid && emailRegex.test(value)

  return (
    <InputEmail
      id="email"
      name="email"
      label="Email"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid === true || !!error?.message}
      valid={showValid}
      after={error?.message && <InputHelperText variant="error" message={error.message} />}
    />
  )
}

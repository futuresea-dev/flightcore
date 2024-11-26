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
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Niepoprawny adres email',
      },
    },
  })
  return (
    <InputEmail
      id="email"
      name="email"
      label="Email"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid === true || !!error?.message}
      valid={invalid === false && isDirty === true}
      after={error?.message && <InputHelperText variant="error" message={error.message} />}
    />
  )
}

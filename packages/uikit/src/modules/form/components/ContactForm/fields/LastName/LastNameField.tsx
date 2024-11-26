import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { InputHelperText } from '../../../InputHelperText/InputHelperText'
import { InputText } from '../../../InputText/InputText'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface LastNameFieldProps {
  control: Control<ContactFormValues>
}

export const LastNameField: FC<LastNameFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error, invalid, isDirty },
  } = useContactFormControl({
    control,
    name: 'lastName',
    rules: {
      required: {
        value: true,
        message: 'Nazwisko jest wymagane',
      },
      minLength: {
        value: 3,
        message: 'Nazwisko powinno mieć minimum 3 znaki',
      },
      maxLength: {
        value: 100,
        message: 'Nazwisko powinno mieć maksimum 100 znaków',
      },
    },
  })
  return (
    <InputText
      id="lastname"
      name="lastName"
      label="Nazwisko"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid === true || !!error?.message}
      valid={invalid === false && isDirty === true}
      after={error?.message && <InputHelperText variant="error" message={error.message} />}
    />
  )
}

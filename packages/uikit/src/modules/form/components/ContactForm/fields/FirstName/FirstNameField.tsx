import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { InputHelperText } from '../../../InputHelperText/InputHelperText'
import { InputText } from '../../../InputText/InputText'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface FirstNameFieldProps {
  control: Control<ContactFormValues>
}

export const FirstNameField: FC<FirstNameFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error, invalid, isDirty },
  } = useContactFormControl({
    control,
    name: 'name',
    rules: {
      required: {
        value: true,
        message: 'Imie jest wymagane',
      },
      minLength: {
        value: 3,
        message: 'Imie powinno mieć minimum 3 znaki',
      },
      maxLength: {
        value: 100,
        message: 'Imie powinno mieć maksimum 100 znaków',
      },
    },
  })

  return (
    <InputText
      id="name"
      name="name"
      label="Imie"
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      error={invalid === true || !!error?.message}
      valid={invalid === false && isDirty === true}
      after={error?.message && <InputHelperText variant="error" message={error.message} />}
    />
  )
}

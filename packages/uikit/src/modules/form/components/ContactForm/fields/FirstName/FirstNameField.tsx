import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { TextInput } from '../../../TextInput/TextInput'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface FirstNameFieldProps {
  control: Control<ContactFormValues>
}

export const FirstNameField: FC<FirstNameFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useContactFormControl({
    control,
    name: 'name',
  })
  return <TextInput name="name" value={value} onChange={onChange} onBlur={onBlur} error={!!error?.message} />
}

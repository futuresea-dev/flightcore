import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { TextInput } from '../../../TextInput/TextInput'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface LastNameFieldProps {
  control: Control<ContactFormValues>
}

export const LastNameField: FC<LastNameFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useContactFormControl({
    control,
    name: 'lastName',
  })
  return <TextInput name="lastName" value={value} onChange={onChange} onBlur={onBlur} error={!!error?.message} />
}

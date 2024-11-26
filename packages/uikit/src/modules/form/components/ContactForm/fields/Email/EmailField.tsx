import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { InputEmail } from '../../../InputEmail/InputEmail'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface EmailFieldProps {
  control: Control<ContactFormValues>
}

export const EmailField: FC<EmailFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useContactFormControl({
    control,
    name: 'email',
  })
  return <InputEmail name="email" value={value} onChange={onChange} onBlur={onBlur} error={!!error?.message} />
}

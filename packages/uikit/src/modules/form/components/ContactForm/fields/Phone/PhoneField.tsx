import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { PhoneInput } from '../../../InputPhoneNumber/InputPhoneNumber'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface PhoneFieldProps {
  control: Control<ContactFormValues>
}

export const PhoneField: FC<PhoneFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useContactFormControl({
    control,
    name: 'phone',
  })
  return <PhoneInput name="phone" value={value} onChange={onChange} onBlur={onBlur} error={!!error?.message} />
}

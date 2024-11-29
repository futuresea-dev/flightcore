import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { Textarea } from '../../../Textarea/Textarea'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface MessageFieldProps {
  control: Control<ContactFormValues>
}

export const MessageField: FC<MessageFieldProps> = ({ control }) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useContactFormControl({
    control,
    name: 'message',
  })
  return <Textarea label="Wiadomosc" name="message" value={value} onChange={onChange} onBlur={onBlur} error={!!error?.message} />
}

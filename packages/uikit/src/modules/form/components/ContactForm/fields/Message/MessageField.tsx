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
    fieldState: { error, isDirty },
  } = useContactFormControl({
    control,
    name: 'message',
  })

  const showValid = isDirty && value.trim().length > 0

  return (
    <Textarea
      label="Wiadomosc"
      name="message"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete="off"
      data-form-type="other"
      aria-label="Message content"
      error={!!error?.message}
      valid={showValid}
    />
  )
}

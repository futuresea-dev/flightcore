import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { Checkbox } from '../../../Checkbox/Checkbox'
import type { ContactFormValues } from '../../ContactFormEntity'
import { useContactFormControl } from '../../useContactForm'

interface ConsentFieldProps {
  control: Control<ContactFormValues>
}

export const ConsentField: FC<ConsentFieldProps> = ({ control }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useContactFormControl({
    control,
    name: 'consent',
  })
  return (
    <Checkbox
      label="Wyrażam zgodę na przetwarzanie moich danych osobowych przez Flightcore Studios."
      checked={value}
      onChange={onChange}
      error={!!error?.message}
    />
  )
}

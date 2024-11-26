import type { FC } from 'react'
import type { Control } from 'react-hook-form'
import { Checkbox } from '../../../Checkbox/Checkbox'
import { InputHelperText } from '../../../InputHelperText/InputHelperText'
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
    rules: {
      required: {
        value: true,
        message: 'Zgoda jest wymagana',
      },
    },
  })
  return (
    <Checkbox
      id="consent"
      label={
        <>
          Wyrażam zgodę na przetwarzanie moich danych osobowych przez Flightcore Studios w celu obsługi zapytania przesłanego za
          pośrednictwem formularza kontaktowego, zgodnie z obowiązującymi przepisami prawa. Szczegółowe informacje na temat
          przetwarzania danych znajdują się w{' '}
          <a className="transition-colors hover:text-green-accent text-green font-semibold" href="/">
            Polityce Prywatności
          </a>
          .
        </>
      }
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      error={!!error?.message}
      after={error?.message && <InputHelperText variant="error" message={error.message} />}
    />
  )
}

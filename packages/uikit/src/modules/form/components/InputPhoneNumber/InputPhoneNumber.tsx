import clsx from 'clsx'
import { useState, type FC } from 'react'
import { PhoneInput as ReactPhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import './InputPhoneNumber.css'

// Import asynchronicznej walidacji

export type InputPhoneNumberProps = {
  label?: string
  name: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: boolean // dodane
  valid?: boolean // dodane
}

export const InputPhoneNumber: FC<InputPhoneNumberProps> = ({
  label = 'Telefon',
  name,
  value,
  onChange,
  onBlur,
  error = false,
  valid = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const handleChange = async (val: string) => {
    onChange(val)
  }

  const outlineClassName = valid ? 'outline-green' : error ? 'outline-red-500' : 'outline-blue-medium'

  // Decyzja, kiedy label "leci na górę":
  // np. focus -> label na górze
  // lub cokolwiek wpisano -> label na górze
  const hasAnyDigit = Boolean(value.replace(/\D/g, '').length)
  const showLabelOnTop = isFocused || hasAnyDigit

  return (
    <div className={clsx('relative h-[58px] w-full rounded-[10px]', 'bg-extra-dark outline outline-[1px]', outlineClassName)}>
      <input type="tel" autoComplete="tel" style={{ display: 'none' }} aria-hidden="true" />
      <ReactPhoneInput
        value={value || ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultCountry="pl"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
        inputStyle={{
          paddingLeft: '5rem',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: '1rem',
          color: '#dbe2e6',
        }}
        inputProps={{
          name,
          id: 'phone-input',
          placeholder: '',
          autoComplete: 'tel',
          type: 'tel',
          inputMode: 'tel', // dodaj to
          className: clsx(
            'peer block h-[58px] w-full px-[16px] py-[14px]',
            'rounded-[10px] text-body1 bg-transparent text-blue-lightest',
            'outline-none',
          ),
        }}
        countrySelectorStyleProps={{
          buttonClassName: 'absolute left-4 top-1/2 -translate-y-1/2 text-blue-lightest bg-transparent',
        }}
      />

      {label && (
        <span
          className={clsx(
            'absolute text-lg text-flightcore-ultra-light-blue pointer-events-none transition-all duration-150',
            showLabelOnTop ? 'text-xs left-[5rem] top-0.5 text-blue-light' : 'text-base left-[8rem] top-1/2 -translate-y-1/2',
          )}>
          {label}
        </span>
      )}
    </div>
  )
}

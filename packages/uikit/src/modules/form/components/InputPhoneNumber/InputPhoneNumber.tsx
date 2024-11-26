import clsx from 'clsx'
import { forwardRef, type ClassAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { PhoneInput as ReactPhoneInput, type PhoneInputRefType } from 'react-international-phone'
import { useInput } from '../../hooks/useInput'

import 'react-international-phone/style.css'

import './InputPhoneNumber.css'

export type PhoneInputProps = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & {
    value?: string
    onChange?: (phone: string) => void
    error?: boolean
    before?: ReactNode
    after?: ReactNode
  }

export const PhoneInput = forwardRef<PhoneInputProps & React.RefAttributes<PhoneInputRefType>, PhoneInputProps>(
  ({ error, ...props }, ref) => {
    const [{ touched, focused }, events] = useInput(props)

    const isValid = touched === true && error === false

    const borderClassName = clsx({
      'border-blue-medium': focused,
      'border-error': error,
      'border-green': isValid,
    })
    const dynamicPaddingClass = focused ? 'input-active' : ''

    return (
      <div className={clsx(inputBaseClasses, focusClasses, borderClassName, 'relative', props.className)}>
        <ReactPhoneInput
          {...props}
          onChange={(e) => {
            props.onChange?.(e)
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          ref={ref}
          defaultCountry="pl"
          className={clsx('relative w-full h-full bg-transparent text-blue-lightest', dynamicPaddingClass)}
          inputClassName="w-full h-full bg-transparent text-blue-lightest focus:outline-none pl-32"
          countrySelectorStyleProps={{
            buttonClassName: 'absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-blue-lightest bg-transparent',
            dropdownStyleProps: {
              className: 'bg-extra-dark text-blue-lightest',
              listItemClassName: 'hover:bg-blue-medium',
            },
          }}
          inputProps={{
            ...props,
            ...events,
            autoFocus: false,
          }}
        />
        {/* {label && (
          <label
            className={clsx('absolute text-blue-light pointer-events-none transition-all duration-200 bg-extra-dark px-2', {
              'top-1/2 transform -translate-y-1/2 left-[115px] text-lg': !isFocused && !hasNumberEntered,
              'top-[8px] left-[60px] text-xs': isFocused || hasNumberEntered,
            })}>
            {label}
          </label>
        )} */}
      </div>
    )
  },
)

const inputBaseClasses = 'h-[58px] w-full rounded-[10px] px-4 text-lg bg-extra-dark border-2'
const focusClasses = 'focus:outline-none focus:border-blue-light'

PhoneInput.displayName = 'PhoneInput'

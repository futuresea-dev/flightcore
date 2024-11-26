import { forwardRef } from 'react'
import { TextInput, type TextInputProps } from '../TextInput/TextInput'

export const InputEmail = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <TextInput {...props} ref={ref} type="email" />
})

InputEmail.displayName = 'InputEmail'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: unknown) {
  if (typeof value !== 'string') return false
  return EMAIL_REGEX.test(value)
}

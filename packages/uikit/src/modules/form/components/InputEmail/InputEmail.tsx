import { forwardRef } from 'react'
import { InputText, type InputTextPropsType } from '../InputText/InputText'

export const InputEmail = forwardRef<HTMLInputElement, InputTextPropsType>((props, ref) => {
  return <InputText {...props} ref={ref} type="email" />
})

InputEmail.displayName = 'InputEmail'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: unknown) {
  if (typeof value !== 'string') return false
  return EMAIL_REGEX.test(value)
}

import { forwardRef } from 'react'
import { InputText, type InputTextPropsType } from '../InputText/InputText'

export const InputEmail = forwardRef<HTMLInputElement, InputTextPropsType>((props, ref) => {
  return <InputText {...props} ref={ref} type="email" />
})

InputEmail.displayName = 'InputEmail'

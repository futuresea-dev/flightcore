import clsx from 'clsx'
import { forwardRef, type ClassAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { useInput } from '../../hooks/useInput'

export type TextInputSlotProps = {
  before?: ReactNode
  after?: ReactNode
}

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  TextInputSlotProps & {
    error?: boolean
  }

export type InputState = {
  focused: boolean
}

const inputBaseClasses = 'h-[58px] w-full rounded-[10px] px-4 pt-6 text-lg bg-extra-dark border-2'
const focusClasses = 'focus:outline-none focus:border-blue-light'
const errorClasses = 'border-red-500 text-red-500'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ error, before, after, ...props }, ref) => {
  const [{ focused }, events] = useInput(props)
  return (
    <div className="relative">
      {before}
      <input
        {...props}
        {...events}
        className={clsx(inputBaseClasses, focused && focusClasses, error && errorClasses, props.className)}
        ref={ref}
      />
      {after}
    </div>
  )
})

TextInput.displayName = 'Input'

import clsx from 'clsx'
import { forwardRef, isValidElement, useMemo, type ClassAttributes, type InputHTMLAttributes } from 'react'
import { InputLabel } from '../InputLabel'
import type { InputTextSlotsType } from '../InputText'

export type TextareaPropsType = InputHTMLAttributes<HTMLTextAreaElement> &
  ClassAttributes<HTMLTextAreaElement> &
  InputTextSlotsType & {
    error?: boolean
    valid?: boolean
  }

// 'flex w-full items-center justify-center rounded-[10px] px-4 py-5 text-lg text-blue-lightest bg-extra-dark border-2 h-[160px]',
// 'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none pt-8', // Added pt-8 to make room for the label

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaPropsType>(({ error, valid, label, ...props }, ref) => {
  const Label = useMemo(() => {
    if (typeof label === 'string') {
      return <InputLabel>{label}</InputLabel>
    }
    if (isValidElement(label)) return label
    return null
  }, [label])

  const outlineClassName = useMemo(() => {
    if (error) return 'outline-error'
    if (valid) return 'outline-green'
    return 'outline-blue-medium'
  }, [error, valid])
  return (
    <div className="relative">
      <textarea
        placeholder={props.id || props.name}
        {...props}
        className={clsx(inputBaseClasses, outlineClassName, props.className)}
        ref={ref}
      />
      {Label}
    </div>
  )
})

Textarea.displayName = 'Textarea'

const inputBaseClasses = [
  'peer block min-h-[160px] max-h-[320px] w-full px-[16px] py-[14px] rounded-[10px] text-body1 outline outline-[1px] outline-blue-medium bg-extra-dark placeholder:text-transparent',
  'transition-[padding,outline] transition-linear duration-[130ms]',
]

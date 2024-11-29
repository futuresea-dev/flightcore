import clsx from 'clsx'
import { forwardRef, isValidElement, useMemo, type ClassAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { InputLabel } from '../InputLabel'

export type InputTextSlotsType = {
  before?: ReactNode
  after?: ReactNode
  label?: ReactNode | string
}

export type InputTextPropsType = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  InputTextSlotsType & {
    error?: boolean
    valid?: boolean
  }

const inputBaseClasses = [
  'peer block h-[58px] w-full px-[16px] py-[14px] rounded-[10px] text-body1 outline outline-[1px] outline-blue-medium bg-extra-dark placeholder:text-transparent',
  'transition-[padding,outline] transition-linear duration-[130ms]',
]

export const InputText = forwardRef<HTMLInputElement, InputTextPropsType>(
  ({ error, valid, before, after, label, ...props }, ref) => {
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
      <label htmlFor={props.id || props.name} className="relative">
        {before}
        <div>
          <input
            placeholder={props.id || props.name}
            {...props}
            ref={ref}
            className={clsx(inputBaseClasses, 'pb-[6px]', outlineClassName, props.className)}
          />
          {Label}
        </div>
        {after}
      </label>
    )
  },
)

InputText.displayName = 'Input'

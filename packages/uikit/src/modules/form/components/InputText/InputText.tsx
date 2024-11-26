import clsx from 'clsx'
import { forwardRef, isValidElement, useMemo, type ClassAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { useInput } from '../../hooks/useInput'
import { InputContext } from '../../hooks/useInputContext'
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

const inputBaseClasses =
  'block h-[58px] w-full rounded-[10px] text-body1 outline outline-[1px] outline-blue-medium px-[16px] py-[14px] transition-[padding,outline] transition-linear duration-200 bg-extra-dark'

export const InputText = forwardRef<HTMLInputElement, InputTextPropsType>(
  ({ error, valid, before, after, label, ...props }, ref) => {
    const [inputState, events] = useInput(props)

    const Label = useMemo(() => {
      if (typeof label === 'string') {
        const isLabelActive = inputState.focused || !!props.value
        return (
          <InputLabel htmlFor={props.id} active={isLabelActive}>
            {label}
          </InputLabel>
        )
      }
      if (isValidElement(label)) return label
      return null
    }, [label, inputState.touched, inputState.focused, props.value])

    const outlineClassName = useMemo(() => {
      if (error) return 'outline-error'
      if (valid) return 'outline-green'
      if (inputState.focused) return 'outline-blue-light'
      return 'outline-blue-medium'
    }, [error, valid, inputState.focused])

    return (
      <InputContext.Provider value={inputState}>
        <div className="relative">
          {before}
          <input
            {...props}
            {...events}
            className={clsx(inputBaseClasses, inputState.focused === true && 'pb-[6px]', outlineClassName, props.className)}
            ref={ref}
          />
          {Label}
          {after}
        </div>
      </InputContext.Provider>
    )
  },
)

InputText.displayName = 'Input'

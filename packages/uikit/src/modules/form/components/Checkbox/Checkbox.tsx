import clsx from 'clsx'
import React, { useMemo, type DetailedHTMLProps, type ReactNode } from 'react'
import CheckSVG from '../../../shared/components/SVG/CheckSVG'

export type CheckboxProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: ReactNode
  error?: boolean
  valid?: boolean
  before?: ReactNode
  after?: ReactNode
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, valid, before, after, ...props }) => {
  const outlineClassName = useMemo(() => {
    if (error) return 'outline-error'
    if (props.checked || props.value || valid) return 'outline-green'
    return 'outline-blue-medium'
  }, [error, valid, props.value, props.checked])

  const backgroundClassName = useMemo(() => {
    if (error) return 'bg-extra-dark'
    if (props.checked || props.value || valid) return 'bg-green-dark'
    return 'bg-extra-dark'
  }, [error, valid, props.value, props.checked])

  return (
    <label htmlFor={props.id} className="cursor-pointer ">
      {before}
      <div className="flex gap-4">
        <div
          className={clsx(
            'block rounded-[4px] w-5 h-5 outline flex-shrink-0 transition-all duration-100',
            outlineClassName,
            backgroundClassName,
          )}>
          <CheckSVG
            fill="transparent"
            className={clsx('block w-full h-full text-white opacity-0', {
              'opacity-100': props.checked || props.value,
            })}
          />
        </div>
        <p
          className={clsx('-mt-[4px] flex-grow text-justify text-caption', {
            'text-blue-lightest': props.checked || props.value,
            'text-blue-light': !props.checked && !props.value,
            'text-error': error,
          })}>
          {label}
        </p>
        <input {...props} type="checkbox" className={clsx('appearance-none', props.className)} />
      </div>
      {after}
    </label>
  )
}

import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

export type InputHelperTextVariantType = 'error' | 'info'

export type InputHelperTextProps = {
  variant: InputHelperTextVariantType
  message: ReactNode
  className?: string
}

export const InputHelperText: FC<InputHelperTextProps> = ({ className, variant, message }) => {
  return (
    <p
      className={clsx(
        'text-right', // IMO it looks better
        'text-body3 mx-5',
        {
          error: 'text-error',
          info: 'text-blue-light',
        }[variant],
        className,
      )}>
      {message}
    </p>
  )
}

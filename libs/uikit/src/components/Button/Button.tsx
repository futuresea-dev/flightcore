import { type FC, type PropsWithChildren } from 'react'
import clsx from 'clsx'

type ButtonSize = 'large' | 'small'
type ButtonColor = 'yellow' | 'green'
type ButtonVariant = 'filled' | 'outline'

type ButtonPropsBase = {
  size?: ButtonSize
  color?: ButtonColor
  variant?: ButtonVariant
  style?: string
  disabled?: boolean
  className?: string
}

export type ButtonPropsType = PropsWithChildren<ButtonPropsBase>

export const Button: FC<ButtonPropsType> = ({
  size = 'large',
  color = 'yellow',
  variant = 'filled',
  disabled,
  children,
  className,
  style,
}) => {
  const radiusClassName = {
    large: 'rounded-[32px]',
    small: 'rounded-[20px]',
  }[size]

  const spacingClassName = {
    large: 'px-[52px] py-[14px]',
    small: 'px-[36px] py-[10px]',
  }[size]

  const typographyClassName = {
    large: 'text-blue-dark text-button',
    small: 'text-blue-dark text-body3',
  }[size]

  const colorsClassName = {
    filled: {
      yellow: 'hover:bg-yellow-accent bg-yellow',
      green: 'bg-green hover:bg-green-accent',
    },
    outline: {
      yellow:
        'border-2 border-yellow hover:border-yellow-accent text-yellow hover:text-yellow-accent',
      green:
        'border-2 border-green hover:border-green-accent text-green hover:text-green-accent',
    },
  }[variant][color]

  return (
    <button
      disabled={disabled}
      className={clsx(
        'transition-colors overflow-hidden',
        spacingClassName,
        radiusClassName,
        typographyClassName,
        colorsClassName,
        disabled && 'bg-blue-lightest',
        className
      )}
    >
      {children}
    </button>
  )
}

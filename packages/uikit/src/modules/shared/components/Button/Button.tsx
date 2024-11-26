import clsx from 'clsx'
import { useMemo, type FC, type PropsWithChildren } from 'react'

type ButtonSize = 'large' | 'small'
type ButtonColor = 'yellow' | 'green' | 'dark-blue'
type ButtonVariant = 'filled' | 'outline'

type ButtonPropsBase = {
  size?: ButtonSize
  color?: ButtonColor
  variant?: ButtonVariant
  style?: string
  disabled?: boolean
  className?: string
}

export type NativeButtonPropsType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ButtonPropsType = PropsWithChildren & NativeButtonPropsType & ButtonPropsBase

export const Button: FC<ButtonPropsType> = ({
  size = 'large',
  color = 'yellow',
  variant = 'filled',
  disabled,
  children,
  className,
  ...props
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

  const accentClassName = useMemo(() => {
    // if (checkValidation && !isFormValid) {
    //   return 'bg-blue-lightest text-blue-medium cursor-not-allowed'
    // }
    if (variant === 'filled') {
      return {
        yellow: 'bg-yellow hover:bg-yellow-accent',
        green: 'bg-green hover:bg-green-accent',
        'dark-blue': 'bg-blue-dark hover:bg-blue-medium',
      }[color]
    }
    return {
      yellow: 'border-2 border-yellow hover:border-yellow-accent text-yellow hover:text-yellow-accent',
      green: 'border-2 border-green hover:border-green-accent text-green hover:text-green-accent',
      'dark-blue': 'border-2 border-blue-dark hover:border-blue-medium text-blue-dark hover:text-blue-medium',
    }[color]
  }, [color, variant])

  return (
    <button
      className={clsx(radiusClassName, spacingClassName, typographyClassName, accentClassName, className)}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  )
}

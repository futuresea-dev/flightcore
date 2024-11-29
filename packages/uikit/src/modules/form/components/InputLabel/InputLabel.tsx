import clsx from 'clsx'
import type { DetailedHTMLProps, FC, PropsWithChildren } from 'react'

export type InputLabelPropsType = DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export const InputLabel: FC<PropsWithChildren<InputLabelPropsType>> = ({ children: label, ...props }) => {
  return (
    <span
      {...props}
      className={clsx(
        'absolute top-0 left-4 transition-all duration-150 transform',
        'text-blue-light text-caption',
        'peer-placeholder-shown:translate-y-[12px] peer-placeholder-shown:text-blue-lightest peer-placeholder-shown:text-body1',
        'peer-focus:translate-y-0 peer-focus:text-blue-light peer-focus:text-caption',
        props.className,
      )}>
      {label}
    </span>
  )
}

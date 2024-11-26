import clsx from 'clsx'
import type { DetailedHTMLProps, FC, PropsWithChildren } from 'react'

export type InputLabelPropsType = DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  active?: boolean
}

export const InputLabel: FC<PropsWithChildren<InputLabelPropsType>> = ({ children: label, active, ...props }) => {
  return (
    <label
      {...props}
      className={clsx(
        'top-0 px-[16px] block absolute',
        'text-body1 transition-[font-size,line-height] transition-linear duration-200',
        active === true && 'text-blue-light text-caption',
        active === false && 'text-blue-lightest text-body1',
        props.className,
      )}>
      {label}
    </label>
  )
}

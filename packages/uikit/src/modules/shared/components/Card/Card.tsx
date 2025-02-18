import type { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'
import styles from './Card.module.css'

type CardPropsType = {
  variant?: 'green' | 'gray'
  className?: string
  innerClassName?: string
}

export const Card: FC<PropsWithChildren<CardPropsType>> = ({ variant = 'green', className, innerClassName, children }) => {
  const variantToClassName = {
    green: styles['--green'],
    gray: styles['--gray'],
  }[variant]

  return (
    <div className={clsx(styles.root, variantToClassName, className)}>
      <div className={clsx(styles.inner, innerClassName)}>{children}</div>
    </div>
  )
}

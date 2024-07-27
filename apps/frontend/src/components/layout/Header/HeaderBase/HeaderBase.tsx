import type { FC, PropsWithChildren, ReactNode } from 'react'

import styles from './HeaderBase.module.css'

type HeaderBasePropsType = {
  brand?: ReactNode
}

export const HeaderBase: FC<PropsWithChildren<HeaderBasePropsType>> = ({ brand, children }) => {
  return (
    <div className={styles.header}>
      <div className={styles['header-container']}>
        <a className={styles.brand} href="/">
          {brand}
        </a>
        {children}
      </div>
    </div>
  )
}

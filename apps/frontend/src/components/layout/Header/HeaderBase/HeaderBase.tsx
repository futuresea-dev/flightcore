import { useTransition } from '@flightcore/uikit'
import { useMemo, useState, type FC, type PropsWithChildren, type ReactNode } from 'react'

import clsx from 'clsx'
import styles from './HeaderBase.module.css'

type HeaderBasePropsType = {
  brand?: ReactNode
}

type HeaderBaseState = {
  mode: 'absolute' | 'sticky'
  variant: 'white' | 'transparent'
  slideIn: boolean
}

export const HeaderBase: FC<PropsWithChildren<HeaderBasePropsType>> = ({ brand, children }) => {
  // const scrollDirection = useScrollDirection()

  // useScroll(
  //   useCallback(() => {
  //     const scrollValue = document.documentElement.scrollTop
  //     console.log({ scrollValue })
  //   }, []),
  // )

  // State to manage header mode and slide-in effect
  const [{ slideIn }] = useState<HeaderBaseState>({
    mode: 'sticky',
    variant: 'transparent',
    slideIn: true,
  })

  // Transition state for header animations
  const { transitionState } = useTransition({
    transitionIn: slideIn,
    transitionOnMount: false,
    duration: 130,
  })

  // Map transition states to CSS class names
  const transitionClassName = useMemo(
    () =>
      ({
        entered: styles['header--entered'],
        entering: styles['header--entering'],
        exited: styles['header--exited'],
        exiting: styles['header--exiting'],
      })[transitionState],
    [transitionState],
  )

  return (
    <div className={clsx(styles.header, transitionClassName)}>
      <div className={styles['header-container']}>
        <a className={styles.brand} href="/">
          {brand}
        </a>
        {children}
      </div>
    </div>
  )
}

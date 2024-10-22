import { useScroll, useTransition } from '@flightcore/uikit'
import { useCallback, useMemo, useRef, useState, type FC, type PropsWithChildren, type ReactNode } from 'react'

import clsx from 'clsx'
import styles from './HeaderBase.module.css'

type HeaderBasePropsType = {
  brand?: ReactNode
}

const SCROLL_BREAKPOINT = 720

export const HeaderBase: FC<PropsWithChildren<HeaderBasePropsType>> = ({ brand, children }) => {
  const [{ slideIn, behaviour }, setState] = useState<{
    slideIn: boolean
    behaviour: 'absolute' | 'fixed'
  }>({
    behaviour: 'absolute',
    slideIn: false,
  })

  const prevScrollValue = useRef(-1)
  useScroll(
    useCallback(
      (scrollValue: number) => {
        if (Math.floor(scrollValue) === 0) {
          setState((s) => ({ ...s, behaviour: 'absolute', slideIn: false }))
          prevScrollValue.current = 0
          return
        }

        const scrollDirection = prevScrollValue.current > scrollValue ? 'up' : 'down'

        if (Math.abs(prevScrollValue.current - scrollValue) < 3) return // Ignore slide logic for small scroll values

        if (scrollValue > SCROLL_BREAKPOINT) {
          setState((s) => ({ ...s, slideIn: scrollDirection === 'up', behaviour: 'fixed' }))
        }

        prevScrollValue.current = scrollValue
      },
      [slideIn],
    ),
  )

  const { transitionState } = useTransition({
    transitionIn: slideIn,
    transitionOnMount: false,
    duration: 180,
  })

  const behaviourClassName = behaviour === 'absolute' ? styles['header--absolute'] : styles['header--fixed']

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
    <div
      className={clsx(
        styles.header,
        behaviourClassName,
        behaviour === 'fixed' && styles['header--accent'],
        behaviour === 'fixed' && transitionClassName,
      )}>
      <div className={styles['header-container']}>
        <a className={styles.brand} href="/">
          {brand}
        </a>
        {children}
      </div>
    </div>
  )
}

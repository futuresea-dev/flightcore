import { useScroll, useScrollDirection, useTransition } from '@flightcore/uikit'
import { useCallback, useMemo, useState, type FC, type PropsWithChildren, type ReactNode } from 'react'

import clsx from 'clsx'
import styles from './HeaderBase.module.css'

type HeaderBasePropsType = {
  brand?: ReactNode
}

const SCROLL_BREAKPOINT = 720

export const HeaderBase: FC<PropsWithChildren<HeaderBasePropsType>> = ({ brand, children }) => {
  const scrollDirection = useScrollDirection()

  const [{ slideIn, behaviour }, setState] = useState<{
    slideIn: boolean
    behaviour: 'absolute' | 'fixed'
  }>({
    behaviour: 'absolute',
    slideIn: false,
  })

  useScroll(
    useCallback(() => {
      const scrollValue = document.documentElement.scrollTop

      if (scrollValue > SCROLL_BREAKPOINT) {
        setState({ slideIn: scrollDirection === 'up', behaviour: 'fixed' })
        return
      }

      if (scrollValue < SCROLL_BREAKPOINT) {
        if (slideIn) {
          if (scrollValue <= 0) {
            setState((s) => ({ ...s, slideIn: false, behaviour: 'absolute' }))
            return
          }
          if (scrollDirection === 'up') setState((s) => ({ ...s, slideIn: true, behaviour: 'fixed' }))
        } else {
          setState({ slideIn: false, behaviour: 'absolute' })
        }
      }
    }, [slideIn, scrollDirection]),
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

  const useTransitionClassName = behaviour === 'fixed'

  return (
    <div
      className={clsx(
        styles.header,
        behaviourClassName,
        transitionState !== 'exited' && styles['header--accent'],
        useTransitionClassName && transitionClassName,
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

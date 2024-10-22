import { CloseSVG, useTransition } from '@flightcore/uikit'
import clsx from 'clsx'
import { useMemo, type FC, type PropsWithChildren } from 'react'
import { toggleMobileMenuOverlay, useShowMobileMenuOverlay } from '../HeaderStore'

import styles from './HeaderMobileMenu.module.css'

export const HeaderMobileMenu: FC<PropsWithChildren> = ({ children }) => {
  const showMobileMenuOverlay = useShowMobileMenuOverlay()

  const { transitionState } = useTransition({
    transitionIn: showMobileMenuOverlay,
    duration: 100,
  })

  const transitionClassName = useMemo(
    () =>
      ({
        entered: styles['root--entered'],
        entering: styles['root--entering'],
        exited: styles['root--exited'],
        exiting: styles['root--exiting'],
      })[transitionState],
    [transitionState],
  )

  if (showMobileMenuOverlay === false && transitionState === 'exited') return null

  return (
    <div id="mobile-meu-overlay" className={clsx(styles.root, transitionClassName)}>
      <button role="button" onClick={toggleMobileMenuOverlay} className="absolute top-0 right-0 p-4 text-green">
        <CloseSVG />
      </button>
      {children}
    </div>
  )
}

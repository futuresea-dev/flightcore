import { CloseSVG, useDevice, useTransition } from '@flightcore/uikit'
import clsx from 'clsx'
import { useMemo, type FC, type PropsWithChildren } from 'react'
import { toggleMobileMenuOverlay, useShowMobileMenuOverlay } from '../HeaderStore'

import styles from './HeaderMobileMenu.module.css'

export const HeaderMobileMenu: FC<PropsWithChildren> = ({ children }) => {
  const showMobileMenuOverlay = useShowMobileMenuOverlay()

  const { isDesktop } = useDevice()

  const transitionIn = useMemo(() => showMobileMenuOverlay && isDesktop === false, [showMobileMenuOverlay, isDesktop])

  const { transitionState } = useTransition({
    transitionIn,
    duration: 150,
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

  return (
    <div id="mobile-menu-overlay" data-hidden={!transitionIn} className={clsx(styles.root, transitionClassName)}>
      <button role="button" onClick={toggleMobileMenuOverlay} className="absolute top-0 right-0 p-4 text-green">
        <CloseSVG />
      </button>
      {children}
    </div>
  )
}

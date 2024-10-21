import { CloseSVG, useTransition } from '@flightcore/uikit'
import clsx from 'clsx'
import { useMemo, type FC, type PropsWithChildren } from 'react'
import { toggleMobileMenuOverlay, useShowMobileMenuOverlay } from './HeaderStore'

export const HeaderMobileOverlay: FC<PropsWithChildren> = ({ children }) => {
  const showMobileMenuOverlay = useShowMobileMenuOverlay()

  const { transitionState } = useTransition({
    transitionIn: showMobileMenuOverlay,
    duration: 110,
  })

  const transitionBaseClassName = 'transition duration-[110ms]'
  const transitionClassName = useMemo(
    () =>
      ({
        entered: 'visible opacity-1',
        entering: 'opacity-0',
        exited: 'hidden opacity-0',
        exiting: 'opacity-0',
      })[transitionState],
    [transitionState],
  )

  return (
    <div
      id="mobile-meu-overlay"
      className={clsx(
        'fixed inset-0 backdrop-blur-sm bg-blue-dark bg-opacity-75 z-50',
        transitionBaseClassName,
        transitionClassName,
      )}
      onClick={() => {}}>
      <button role="button" onClick={toggleMobileMenuOverlay} className="absolute top-0 right-0 p-4 text-green">
        <CloseSVG />
      </button>
      {children}
    </div>
  )
}

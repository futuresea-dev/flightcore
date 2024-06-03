import cx from 'clsx'
import { type FC, useEffect, useRef, type PropsWithChildren } from 'react'
import { useTransition, type TransitionEvents } from '../../hooks/useTransition'

import styles from './ModalBase.module.css'

export type ModalBasePropsType = {
  show: boolean
  onRequestClose?: () => void
  transitionEvents?: TransitionEvents
}

export const ModalBase: FC<PropsWithChildren<ModalBasePropsType>> = (props) => {
  const { transitionEvents: events, show, children, onRequestClose } = props

  const overlayRef = useRef<HTMLDivElement>(null)

  const { transitionState, isMount } = useTransition({
    transitionIn: show,
    transitionOnMount: true,
    duration: 250,
    delay: 50,
    events: {
      onEntered: events?.onEntered,
      onEntering: events?.onEntering,
      onEnteringStart: events?.onEnteringStart,
      onExiting: events?.onExiting,
      onExitingStart: events?.onExitingStart,
      onExited: events?.onExited,
    },
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isMount) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [isMount])

  useEffect(() => {
    if (transitionState !== 'entered') return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      onRequestClose?.()
    }
    document.documentElement.addEventListener('keydown', onKeyDown)
    return () => {
      document.documentElement.removeEventListener('keydown', onKeyDown)
    }
  }, [onRequestClose, transitionState])

  const transitionClassName = {
    entered: styles['overlay--entered'],
    entering: styles['overlay--entering'],
    exited: styles['overlay--exited'],
    exiting: styles['overlay--exiting'],
  }[transitionState]

  if (!isMount) return

  return (
    <div
      tabIndex={0}
      onClick={onRequestClose}
      className={cx(styles.overlay, transitionClassName)}
      role="presentation"
      ref={overlayRef}
    >
      {children}
    </div>
  )
}

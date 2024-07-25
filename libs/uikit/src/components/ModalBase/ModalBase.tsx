import { createContext, useContext, useEffect, useRef, type FC, type PropsWithChildren } from 'react'

import { useTransition, type TransitionEvents, type TransitionState } from '../../hooks'

import clsx from 'clsx'
import { Portal } from '../Portal/Portal'

import styles from './ModalBase.module.css'

export type ModalBasePropsType = {
  visible: boolean
  onRequestClose?: () => void
  transitionEvents?: TransitionEvents
  className?: string
}

type ModalBaseContextType = {
  transitionState: TransitionState
}

const ModalBaseContext = createContext<ModalBaseContextType | undefined>(undefined)

export const useModalTransitionState = () => {
  const context = useContext(ModalBaseContext)
  if (!context) throw new Error('ModalBaseContext is not defined')
  return context.transitionState
}

export const ModalBase: FC<PropsWithChildren<ModalBasePropsType>> = (props) => {
  const { transitionEvents: events, visible, children, onRequestClose } = props

  const overlayRef = useRef<HTMLDialogElement>(null)

  const { transitionState, isMount } = useTransition({
    transitionIn: visible,
    duration: 220,
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
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onRequestClose, transitionState])

  const transitionClassName = {
    entered: styles['root--entered'],
    entering: styles['root--entering'],
    exited: styles['root--exited'],
    exiting: styles['root--exiting'],
  }[transitionState]

  if (isMount === false && visible === false) return null

  return (
    <Portal>
      <dialog open tabIndex={0} className={clsx(styles.root, transitionClassName)} ref={overlayRef}>
        <div className={styles.viewport}>
          <div aria-label="Dialog overlay" tabIndex={0} className={clsx(styles.overlay)} onClick={() => onRequestClose?.()} />
          <ModalBaseContext.Provider value={{ transitionState }}>{children}</ModalBaseContext.Provider>
        </div>
      </dialog>
    </Portal>
  )
}

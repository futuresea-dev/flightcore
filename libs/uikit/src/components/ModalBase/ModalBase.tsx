import cx from 'clsx'
import {
  type FC,
  useEffect,
  useRef,
  type PropsWithChildren,
  createContext,
  useContext,
} from 'react'

import {
  useTransition,
  type TransitionEvents,
  type TransitionState,
} from '../../hooks'

import styles from './ModalBase.module.css'
import { Portal } from '../Portal/Portal'

export type ModalBasePropsType = {
  show: boolean
  onRequestClose?: () => void
  transitionEvents?: TransitionEvents
  className?: string
  disableTransition?: boolean
}

type ModalBaseContextType = {
  transitionState: TransitionState
}

const ModalBaseContext = createContext<ModalBaseContextType | undefined>(
  undefined
)

export const useModalTransitionState = () => {
  const context = useContext(ModalBaseContext)
  if (!context) throw new Error('ModalBaseContext is not defined')
  return context.transitionState
}

export const ModalBase: FC<PropsWithChildren<ModalBasePropsType>> = (props) => {
  const {
    transitionEvents: events,
    show,
    children,
    disableTransition,
    onRequestClose,
  } = props

  const overlayRef = useRef<HTMLDialogElement>(null)

  const { transitionState, isMount } = useTransition({
    transitionIn: show,
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

  if (isMount === false && show === false) return null

  return (
    <Portal>
      <dialog
        open
        tabIndex={0}
        className={cx(
          styles.overlay,
          disableTransition !== true && transitionClassName
        )}
        ref={overlayRef}
        onClick={(e) => {
          // Click on overlay
          if (e.target === overlayRef.current) {
            onRequestClose?.()
          }
        }}
      >
        <ModalBaseContext.Provider value={{ transitionState }}>
          {children}
        </ModalBaseContext.Provider>
      </dialog>
    </Portal>
  )
}

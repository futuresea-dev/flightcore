import clsx from 'clsx'
import { useMemo, useRef, type FC, type PropsWithChildren } from 'react'
import { ModalBase, useModalTransitionState, type ModalBasePropsType } from '../ModalBase/ModalBase'
import { CloseSVG } from '../SVG'
import styles from './CardModal.module.css'

const CardModalContent: FC<PropsWithChildren<CardModalPropsType>> = ({
  children,
  dialogCardClassName,
  dialogCardCloseClassName,
  dialogCardViewportClassName,
  ...props
}) => {
  const modalTransitionState = useModalTransitionState()
  const dragInfo = useRef({ isDragging: false, startX: 0, startY: 0 })
  const dragThreshold = 5

  const transitionClassName: string = useMemo(
    () =>
      ({
        entered: styles['dialog--entered'],
        entering: styles['dialog--entering'],
        exited: styles['dialog--exited'],
        exiting: styles['dialog--exiting'],
      })[modalTransitionState],
    [modalTransitionState],
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    dragInfo.current = {
      isDragging: false,
      startX: e.clientX,
      startY: e.clientY,
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 1) {
      const deltaX = Math.abs(e.clientX - dragInfo.current.startX)
      const deltaY = Math.abs(e.clientY - dragInfo.current.startY)
      if (deltaX > dragThreshold || deltaY > dragThreshold) {
        dragInfo.current.isDragging = true
      }
    }
  }

  const handlePointerUp = () => {
    setTimeout(() => {
      dragInfo.current.isDragging = false
    }, 0)
  }

  const handleBackdropClick = () => {
    if (!dragInfo.current.isDragging) {
      props.onRequestClose?.()
    }
  }

  return (
    <div
      className={clsx(styles.dialog, transitionClassName, dialogCardViewportClassName)}
      onClick={handleBackdropClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}>
      <div className="flex justify-center items-center min-h-full">
        <div onClick={(e) => e.stopPropagation()} tabIndex={0} className={clsx(styles['dialog-card'], dialogCardClassName)}>
          <button className={clsx(styles['dialog-close'], dialogCardCloseClassName)} onClick={() => props.onRequestClose?.()}>
            <CloseSVG />
          </button>
          <div className={styles.innerSpacing}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export type CardModalPropsType = ModalBasePropsType & {
  dialogCardViewportClassName?: string
  dialogCardClassName?: string
  dialogCardCloseClassName?: string
}

export const CardModal: FC<PropsWithChildren<CardModalPropsType>> = ({ children, ...props }) => {
  return (
    <ModalBase {...props}>
      <CardModalContent {...props}>{children}</CardModalContent>
    </ModalBase>
  )
}

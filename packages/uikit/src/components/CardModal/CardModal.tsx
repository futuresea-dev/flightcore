import clsx from 'clsx'
import { useMemo, type FC, type PropsWithChildren } from 'react'
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
  return (
    <div onClick={props.onRequestClose} className={clsx(styles.dialog, transitionClassName, dialogCardViewportClassName)}>
      <div
        onClick={(e) => {
          e.stopPropagation()
          return false
        }}
        tabIndex={0}
        className={clsx(styles['dialog-card'], dialogCardClassName)}>
        <button className={clsx(styles['dialog-close'], dialogCardCloseClassName)} onClick={props.onRequestClose}>
          <CloseSVG />
        </button>
        {children}
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

import { createModalController, ModalBase, useModalController, useModalTransitionState } from '@flightcore/uikit'
import { useMemo } from 'react'
import { BookingIFrame } from '../BookingIFrame'

import styles from './BookingModal.module.css'

export const controller = createModalController(undefined, true)

export const BookingModalInner = () => {
  const { actions } = useModalController(controller)
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
    <div
      onClick={actions.hide}
      className={transitionClassName}
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BookingIFrame />
    </div>
  )
}

export const BookingModal = () => {
  const {
    state: { visible },
  } = useModalController(controller)

  return (
    <ModalBase show={visible}>
      <BookingModalInner />
    </ModalBase>
  )
}

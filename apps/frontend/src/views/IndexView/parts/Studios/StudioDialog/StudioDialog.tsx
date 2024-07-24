import { ModalBase, useModalTransitionState } from '@flightcore/uikit'
import { useStore } from '@nanostores/react'
import type { FC } from 'react'

import { controller } from './StudioDialogController'

import clsx from 'clsx'
import styles from './StudioDialog.module.css'

const StudioDialogContent: FC = () => {
  const focusedStudio = useStore(controller.focusedStudio)
  const modalTransitionState = useModalTransitionState()
  const transitionClassName = {
    entered: styles['dialog--entered'],
    entering: styles['dialog--entering'],
    exited: styles['dialog--exited'],
    exiting: styles['dialog--exiting'],
  }[modalTransitionState]
  return (
    <div className={clsx(styles.dialog, transitionClassName)}>
      <div className={styles['dialog-card']}>
        <button className={styles['dialog-close']} onClick={controller.hide}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M23.77 25.096L7.33 8.656A.938.938 0 018.654 7.33l16.44 16.44a.938.938 0 01-1.325 1.326z"></path>
            <path
              fill="currentColor"
              d="M25.096 8.655l-16.44 16.44a.938.938 0 01-1.327-1.325L23.77 7.33a.938.938 0 011.327 1.325z"></path>
          </svg>
        </button>
        <div style={{ width: 528, height: 400, background: '#333' }}></div>
        <p className={styles['dialog-text']}>{focusedStudio?.desc}</p>
      </div>
    </div>
  )
}

export const StudioDialog: FC = () => {
  const visible = useStore(controller.visible)
  return (
    <ModalBase
      show={visible}
      onRequestClose={controller.hide}
      transitionEvents={{
        onExited() {
          controller.clear()
        },
      }}>
      <StudioDialogContent />
    </ModalBase>
  )
}

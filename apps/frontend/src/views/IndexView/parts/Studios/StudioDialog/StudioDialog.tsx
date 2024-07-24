import { CardModal } from '@flightcore/uikit'
import { useStore } from '@nanostores/react'
import type { FC } from 'react'

import { controller } from './StudioDialogController'

import styles from './StudioDialog.module.css'

const StudioDialogContent: FC = () => {
  const focusedStudio = useStore(controller.focusedStudio)
  return (
    <div>
      <div style={{ width: 528, height: 400, background: '#333' }}></div>
      <p className={styles['dialog-text']}>{focusedStudio?.desc}</p>
    </div>
  )
}

export const StudioDialog: FC = () => {
  const visible = useStore(controller.visible)
  return (
    <CardModal
      visible={visible}
      onRequestClose={controller.hide}
      transitionEvents={{
        onExited() {
          controller.clear()
        },
      }}>
      <StudioDialogContent />
    </CardModal>
  )
}

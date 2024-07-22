import { useState, type FC } from 'react'
import { useStore } from '@nanostores/react'

import { ModalBase } from '@flightcore/uikit'
import type { CollectionEntry } from 'astro:content'

import styles from './StudioCard.module.css'
import { studioDialogController } from '../StudioDialog'

export type StudioCardPropsType = {
  studio: CollectionEntry<'studio'>['data']
}

export const StudioCard: FC<StudioCardPropsType> = ({ studio }) => {
  const { poster, title } = studio

  return (
    <>
      <div
        tabIndex={0}
        onClick={() => studioDialogController.show(studio)}
        className={styles['studio-item']}
      >
        <div className={styles['inner-container']}>
          <img src={poster} className={styles['studio-item__poster']} />
          <p className={styles['studio-item__title']}>{title}</p>
        </div>
        <div className={styles['overlay']}>
          <span>Pokaż szczegóły</span>
        </div>
      </div>
    </>
  )
}

import type { CollectionEntry } from 'astro:content'
import { type FC } from 'react'
import { studioDialogController } from '../StudioDialog'
import styles from './StudioCard.module.css'

export type StudioCardPropsType = {
  studio: CollectionEntry<'studio'>['data']
}

export const StudioCard: FC<StudioCardPropsType> = ({ studio }) => {
  const { poster, title } = studio

  return (
    <>
      <div tabIndex={0} onClick={() => studioDialogController.show(studio)} className={styles['studio-item']}>
        <div className={styles['inner-container']}>
          <img srcSet={poster} className={styles['studio-item__poster']} loading="eager" decoding="async" />
          <p className={styles['studio-item__title']}>{title}</p>
        </div>
        <div className={styles['overlay']}>
          <span>Pokaż szczegóły</span>
        </div>
      </div>
    </>
  )
}

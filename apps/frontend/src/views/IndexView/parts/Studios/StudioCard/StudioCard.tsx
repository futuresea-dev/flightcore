import type { GetImageResult } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { type FC } from 'react'
import { studioDialogController } from '../StudioDialog'
import styles from './StudioCard.module.css'

export type StudioCardPropsType = {
  studio: Omit<CollectionEntry<'studio'>['data'], 'photos' | 'poster'> & { poster: GetImageResult; photos: GetImageResult[] }
}

export const StudioCard: FC<StudioCardPropsType> = ({ studio }) => {
  const { poster, title } = studio
  return (
    <div tabIndex={0} onClick={() => studioDialogController.show(studio)} className={styles['studio-item']}>
      <div className={styles['inner-container']}>
        <img
          src={poster.src}
          srcSet={poster.srcSet.attribute}
          className={styles['studio-item__poster']}
          loading={poster.attributes.loading || 'lazy'}
          decoding={poster.attributes.decoding || 'async'}
        />
        <p className={styles['studio-item__title']}>{title}</p>
      </div>
      <div className={styles['overlay']}>
        <span>Pokaż szczegóły</span>
      </div>
    </div>
  )
}

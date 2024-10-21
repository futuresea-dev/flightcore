import type { GetImageResult } from 'astro'
import type { CollectionEntry } from 'astro:content'
import clsx from 'clsx'
import { useState, type FC } from 'react'
import { studioDialogController } from '../StudioDialog'
import styles from './StudioCard.module.css'

export type StudioCardPropsType = {
  mark?: boolean
  studio: Omit<CollectionEntry<'studio'>['data'], 'photos' | 'poster'> & { poster: GetImageResult; photos: GetImageResult[] }
}

export const StudioCard: FC<StudioCardPropsType> = ({ studio }) => {
  const { poster, title } = studio

  const [hover, setHover] = useState<boolean>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hovierDirty = typeof hover !== 'undefined'

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => studioDialogController.show(studio)}
      className={clsx(styles['studio-item'], {
        // [styles['studio-item--mark']]: mark && hovierDirty === false,
      })}>
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

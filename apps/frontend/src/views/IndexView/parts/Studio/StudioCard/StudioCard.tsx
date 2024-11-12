import clsx from 'clsx'
import { type FC } from 'react'
import { studioDialogController } from '../StudioDialog'
import type { StudioEntryType } from '../StudioDialog/StudioDialogController'

import styles from './StudioCard.module.css'

export type StudioCardPropsType = {
  studioCollectionEntry: StudioEntryType
  mark?: boolean
  onClick?: () => void
}

export const StudioCard: FC<StudioCardPropsType> = ({ studioCollectionEntry }) => {
  const { title, poster } = studioCollectionEntry

  return (
    <div tabIndex={0} onClick={() => studioDialogController.show(studioCollectionEntry)} className={clsx(styles['studio-item'])}>
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

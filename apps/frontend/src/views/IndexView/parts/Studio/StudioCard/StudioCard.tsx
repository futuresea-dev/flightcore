import { useStore } from '@nanostores/react'
import clsx from 'clsx'
import { atom } from 'nanostores'
import { type FC, useEffect } from 'react'
import { studioDialogController } from '../StudioDialog'
import type { StudioEntryType } from '../StudioDialog/StudioDialogController'
import styles from './StudioCard.module.css'

export type StudioCardPropsType = {
  studioCollectionEntry: StudioEntryType
  mark?: boolean
  onClick?: () => void
}

const expandedCardStore = atom<string | null>(null)

const globalClickHandler = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target?.closest(`.${styles['details-wrapper']}`)) {
    expandedCardStore.set(null)
  }
}

export const StudioCard: FC<StudioCardPropsType> = ({ studioCollectionEntry }) => {
  const { title, poster, desc } = studioCollectionEntry
  const expandedCardId = useStore(expandedCardStore)
  const isExpanded = expandedCardId === title

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('click', globalClickHandler)
      return () => document.removeEventListener('click', globalClickHandler)
    }
  }, [isExpanded])

  const handleClick = () => {
    if (window.innerWidth >= 1024) {
      studioDialogController.show(studioCollectionEntry)
    }
  }

  const toggleExpand = () => {
    expandedCardStore.set(isExpanded ? null : title)
  }

  return (
    <div className={styles.root}>
      <div tabIndex={0} onClick={handleClick} className={styles['studio-item']}>
        <div className={styles['inner-container']}>
          <img
            src={poster.src}
            srcSet={poster.srcSet.attribute}
            className={styles['studio-item__poster']}
            loading="lazy"
            decoding="async"
            alt={title}
          />
          <p className={styles['studio-item__title']}>{title}</p>

          <div className={clsx(styles['overlay'], '!hidden lg:!flex')}>
            <span>Pokaż szczegóły</span>
          </div>
        </div>
      </div>

      <div className={styles['details-wrapper']} style={{ zIndex: isExpanded ? 51 : 'auto' }}>
        {!isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleExpand()
            }}
            className={styles['details-button']}>
            Pokaż szczegóły
          </button>
        )}

        <div className={clsx(styles['details-panel'], isExpanded && styles['details-panel--expanded'])}>
          <div className={styles['details-content']}>
            <p className="text-white text-body3">{desc}</p>
          </div>

          {isExpanded && (
            <>
              <div className={styles['details-separator']} />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpand()
                }}
                className={styles['details-button']}>
                Ukryj szczegóły
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

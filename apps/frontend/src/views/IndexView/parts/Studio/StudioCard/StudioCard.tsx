import { CarouseleBullet, useCarousele } from '@flightcore/uikit'
import { useStore } from '@nanostores/react'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { atom } from 'nanostores'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
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
  const [isMobile, setIsMobile] = useState(false)
  const { title, poster, desc, photos } = studioCollectionEntry
  const expandedCardId = useStore(expandedCardStore)
  const isExpanded = expandedCardId === title

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [emblaRef, emblaAPI] = useEmblaCarousel({
    slidesToScroll: 1,
    loop: true,
    align: 'start',
    dragFree: false,
    direction: 'ltr',
    watchDrag: true,
  })

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarousele(emblaAPI)

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('click', globalClickHandler)
      return () => document.removeEventListener('click', globalClickHandler)
    }
  }, [isExpanded])

  const handleClick = () => {
    if (!isMobile) {
      studioDialogController.show(studioCollectionEntry)
    }
  }

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    expandedCardStore.set(isExpanded ? null : title)
  }

  return (
    <div className={styles.root}>
      <div className={styles['studio-item']} onClick={handleClick}>
        <div className={styles['inner-container']}>
          {isMobile ? (
            <div className={styles['carousel-wrapper']}>
              <div ref={emblaRef} className={styles['carousel-viewport']}>
                <div className={styles['carousel-container']}>
                  {photos.map((photo: StudioEntryType['photos'][0]) => (
                    <div key={photo.src} className={styles['carousel-slide']}>
                      <img
                        className={styles['carousel-image']}
                        src={photo.src}
                        srcSet={photo.srcSet.attribute}
                        loading="lazy"
                        decoding="async"
                        alt={title}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <img
              src={poster.src}
              srcSet={poster.srcSet.attribute}
              className={styles['studio-item__poster']}
              loading="lazy"
              decoding="async"
              alt={title}
            />
          )}

          <p className={styles['studio-item__title']}>{title}</p>

          {isMobile && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex justify-center gap-2">
              {scrollSnaps.map((_, index) => (
                <CarouseleBullet key={index} active={index === selectedIndex} onClick={() => onDotButtonClick(index)} />
              ))}
            </div>
          )}

          <div className={clsx(styles['overlay'], '!hidden lg:!flex')}>
            <span>Pokaż szczegóły</span>
          </div>
        </div>
      </div>

      <div className={styles['details-wrapper']} style={{ zIndex: isExpanded ? 51 : 'auto' }}>
        {!isExpanded && (
          <button onClick={toggleExpand} className={styles['details-button']}>
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
              <button onClick={toggleExpand} className={styles['details-button']}>
                Ukryj szczegóły
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

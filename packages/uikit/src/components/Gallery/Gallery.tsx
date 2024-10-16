import { useCallback, useEffect, useRef, type FC } from 'react'

import type { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'

import 'photoswipe/style.css'

const defaultEmblaOpts: EmblaOptionsType = {
  active: true,
  breakpoints: {
    '(min-width: 768px)': {
      active: false,
    },
  },
}

export const Gallery: FC<GalleryPropsType> = ({ items }) => {
  const [emblaRef] = useEmblaCarousel(defaultEmblaOpts, [AutoScroll({})])
  const [photoswipeSDK] = usePhotoSwipe(items)

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex items-center gap-[80px]">
        {items.map((item, index) => (
          <GalleryItem
            key={index}
            index={index}
            item={item}
            onClick={useCallback(() => photoswipeSDK?.loadAndOpen(index), [index])}
          />
        ))}
      </div>
    </div>
  )
}

export type GalleryPropsType = {
  items: GalleryItemType[]
}

export const GalleryItem: FC<{ index: number; item: GalleryItemType; onClick: () => void }> = ({
  item: { src, title, className },
  onClick,
}) => {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      className={'relative w-[242px] h-[240px] ratio-[242/240] shrink-0 grow-0 max-w-full ' + className}>
      <img src={src} loading="lazy" decoding="async" className="select-none pointer-events-none" alt={title} />
    </div>
  )
}

export type GalleryItemType = {
  src: string
  title: string
  className?: string
}

export const usePhotoSwipe = (items: GalleryItemType[], opts?: { canInit?: boolean }): [PhotoSwipeLightbox | null] => {
  const sdk = useRef<PhotoSwipeLightbox | null>(null)

  if (typeof window !== 'undefined')
    if (sdk.current === null)
      sdk.current = new PhotoSwipeLightbox({
        pswpModule: () => import('photoswipe'),
        dataSource: items.map((item) => ({
          src: item.src,
          title: item.title,
          className: item.className,
        })),
      })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sdk.current === null || opts?.canInit === false) return
    sdk.current.init()
  }, [])

  return [sdk.current]
}

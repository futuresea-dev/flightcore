import { useCallback, type FC } from 'react'

import type { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'

import 'photoswipe/style.css'
import { usePhotoSwipe } from './usePhotoSwipe'

const defaultEmblaOpts: EmblaOptionsType = {
  active: true,
  breakpoints: {
    '(min-width: 768px)': {
      active: false,
    },
  },
}

export const GalleryInteractive: FC<GalleryInteractivePropsType> = ({ items }) => {
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

export type GalleryInteractivePropsType = {
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
      className={'cursor-pointer relative w-[242px] h-[240px] ratio-[242/240] shrink-0 grow-0 max-w-full ' + className}>
      <img
        src={src}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full select-none pointer-events-none"
        alt={title}
      />
    </div>
  )
}

export type GalleryItemType = {
  src: string
  title: string
  className?: string
}

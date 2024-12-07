import AutoPlay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import type { FC } from 'react'

export const BannersCarousel: FC<{ items: BannersCarouselItemType[] }> = ({ items }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      loop: true,
    },
    [AutoPlay({ playOnInit: true, delay: 3000 })],
  )

  return (
    <div ref={emblaRef} className="relative overflow-hidden">
      <div className="flex ">
        {items.map((item) => (
          <BannersCarouselItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  )
}

export const BannersCarouselItem: FC<BannersCarouselItemType> = ({ slug, imageLarge, imageSmall }) => (
  <a href={`/offer/${slug}`} className="block" style={{ flex: '1 0 100%' }}>
    <picture className="w-full h-full">
      <source media="(min-width: 768px)" srcSet={imageLarge.src} />
      <img src={imageSmall.src} />
    </picture>
  </a>
)

export type BannersCarouselItemType = {
  slug: string
  imageLarge: {
    src: string
  }
  imageSmall: {
    src: string
  }
}

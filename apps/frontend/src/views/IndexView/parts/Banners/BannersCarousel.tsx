import AutoPlay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState, type FC } from 'react'

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
      <div className="flex">
        {items.map((item) => (
          <BannersCarouselItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  )
}

export const BannersCarouselItem: FC<BannersCarouselItemType> = ({ slug, imageLarge, imageSmall }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Sprawdź początkowo
    checkMobile()

    // Nasłuchuj zmian rozmiaru okna
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Pokaż loader podczas sprawdzania rozmiaru ekranu
  if (isMobile === null) {
    return <div className="w-full aspect-[1220/480] bg-gray-800 animate-pulse" style={{ flex: '1 0 100%' }} />
  }

  return (
    <a href={`/offer/${slug}`} className="block" style={{ flex: '1 0 100%' }}>
      <img src={isMobile ? imageSmall.src : imageLarge.src} className="w-full h-full" alt="" />
    </a>
  )
}

export type BannersCarouselItemType = {
  slug: string
  imageLarge: {
    src: string
  }
  imageSmall: {
    src: string
  }
}

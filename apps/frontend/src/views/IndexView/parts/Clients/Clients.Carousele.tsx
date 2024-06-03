import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import clsx from 'clsx'

type ClientsCarouselePropsType = {
  clientLogos: string[]
}

export const ClientsCarousele: React.FC<ClientsCarouselePropsType> = ({
  clientLogos,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, slidesToScroll: 1, skipSnaps: true },
    [
      Autoplay({
        playOnInit: true,
      }),
    ]
  )

  const autoplay = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const autoplayInterval = setInterval(autoplay, 4000) // Adjust the interval to control speed
    return () => clearInterval(autoplayInterval)
  }, [autoplay, emblaApi])

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className={'flex items-center gap-[80px]'}>
        {[
          ...clientLogos,
          ...clientLogos,
          ...clientLogos,
          ...clientLogos,
          ...clientLogos,
        ].map((logo, index) => (
          <div className={'relative shrink-0 basis-[200px]'} key={index}>
            <img src={logo} />
          </div>
        ))}
      </div>
    </div>
  )
}

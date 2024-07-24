import { type EmblaOptionsType } from 'embla-carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect } from 'react'

type ClientsCarouselePropsType = {
  clientLogos: string[]
}

const options: EmblaOptionsType = {
  loop: true,
  align: 'start',
  watchDrag: false,
}

export const ClientsCarousele: React.FC<ClientsCarouselePropsType> = ({ clientLogos }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      startDelay: 0,
      speed: 1,
      stopOnInteraction: false,
    }),
  ])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return
    if (autoScroll.isPlaying() === true) return
    autoScroll.play()
  }, [emblaApi])

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className={'flex items-center gap-[80px]'}>
        {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
          <div className={'relative shrink-0 grow-0 max-w-full'} key={index}>
            <img src={logo} loading="lazy" decoding="async" className="select-none pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

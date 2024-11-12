import { CardModal, CarouseleBullet, useCarousele } from '@flightcore/uikit'
import { useStore } from '@nanostores/react'
import AutoPlay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

import type { FC } from 'react'

import { StudioDialogController } from './StudioDialogController'

const StudioDialogContent: FC = () => {
  const focusedStudio = useStore(StudioDialogController.focusedStudio)

  const [emblaRef, emblaAPI] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      loop: true,
      align: 'start',
    },
    [AutoPlay({ playOnInit: true, delay: 3000 })],
  )

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarousele(emblaAPI)

  return (
    <div>
      <div className="relative p-[2px] rounded-[20px] aspect-[528/400] bg-gradient-to-b from-transparent from-50% to-blue-medium">
        <div ref={emblaRef} className="w-full h-full bg-blue-dark rounded-[20px] overflow-hidden">
          <div className="flex w-full h-full">
            {focusedStudio?.photos.map((photo) => (
              <div key={photo.src} className="flex-[1_0_100%]">
                <img className="w-full h-full object-center object-cover" src={photo.src} srcSet={photo.srcSet.attribute} />
              </div>
            ))}
          </div>
        </div>
        <h6 className="absolute top-[24px] left-[24px] font-bold text-[34px] leading-[40px] tracking-[0.25px] text-green-dark pointer-events-none select-none">
          {focusedStudio?.title}
        </h6>
      </div>

      <div className="flex justify-center gap-[8px] mt-[16px] mb-[24px]">
        {scrollSnaps.map((_, index) => (
          <CarouseleBullet key={index} active={index === selectedIndex} onClick={() => onDotButtonClick(index)} />
        ))}
      </div>

      <p className="whitespace-pre-wrap text-white text-body3">{focusedStudio?.desc}</p>
    </div>
  )
}

export const StudioDialog: FC = () => {
  const visible = useStore(StudioDialogController.visible)
  return (
    <CardModal
      show={visible}
      onRequestClose={StudioDialogController.hide}
      transitionEvents={{
        onExited() {
          StudioDialogController.clear()
        },
      }}>
      <StudioDialogContent />
    </CardModal>
  )
}

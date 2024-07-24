import { useCallback, useEffect, useRef, type FC } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import EmblaClassNames from 'embla-carousel-class-names'
import type { CollectionEntry } from 'astro:content'
import { useCarousele } from '@flightcore/uikit'

import { QuoteCard } from '../QuoteCard/QuoteCard'

import styles from './QuotesCarousele.module.css'

type QuotesCarouselePropsType = {
  quotes: CollectionEntry<'quotes'>['data']
}

export const QuotesCarousele: FC<QuotesCarouselePropsType> = ({ quotes }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
      watchResize: true,
      
    },
    [EmblaClassNames()]
  )

  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useCarousele(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      // console.log(slideNode)
      return slideNode as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      console.log('here', emblaApi.scrollSnapList())

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress

        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const scale = numberWithinRange(tweenValue, 0, 1).toString()
          const tweenNode = tweenNodes.current[slideIndex]

          // tweenNode.style.transform = `scale(${scale})`
          tweenNode.style.setProperty('--factor', scale)
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    console.log(emblaApi.internalEngine())

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
  }, [emblaApi, tweenScale])

  return (
    <div className="">
      <div className={styles.root}>
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.viewportContainer}>
            {quotes.map((quote, index) => (
              <div className={styles.slide} key={index}>
                <QuoteCard {...quote} className={styles.slideQuote} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

const TWEEN_FACTOR_BASE = 0.1

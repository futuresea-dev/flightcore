import { useCallback, useRef, useState } from 'react'
import { useEvent } from './useEvent'

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down')
  const scrollTopRef = useRef<number>(0)

  const handleScroll = useCallback(() => {
    const { scrollTop } = document.documentElement
    const scrollDirection = scrollTopRef.current >= scrollTop ? 'up' : 'down'
    setScrollDirection(scrollDirection)
    scrollTopRef.current = scrollTop
  }, [])

  useEvent('scroll', handleScroll, globalThis)

  return scrollDirection
}

export type ScrollDirection = 'up' | 'down' | undefined

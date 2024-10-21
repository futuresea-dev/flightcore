import { useCallback } from 'react'
import { useEvent } from './useEvent'

export const useScroll = (callback: (scrollTop: number) => void) => {
  const handleScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      const { scrollTop } = document.documentElement
      callback(scrollTop)
    })
  }, [callback])

  useEvent('scroll', handleScroll, globalThis)
}

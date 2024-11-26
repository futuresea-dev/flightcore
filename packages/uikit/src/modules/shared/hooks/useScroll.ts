import { useCallback } from 'react'
import { debounce } from '../../../utils/debounce'
import { useEvent } from './useEvent'

export const useScroll = (callback: (scrollTop: number) => void) => {
  const debouncedCallback = useCallback(debounce(callback, 5), [callback])

  const handleScroll = useCallback(() => {
    const { scrollTop } = document.documentElement
    debouncedCallback(scrollTop)
  }, [debouncedCallback])

  useEvent('scroll', handleScroll, globalThis)
}

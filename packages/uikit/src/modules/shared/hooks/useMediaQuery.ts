// useMediaQuery.ts
import { useEffect, useState } from 'react'

// Define a type for the media query hook
type MediaQueryHook = (query: string) => boolean

const isSSR = typeof window === 'undefined'

export const useMediaQuery: MediaQueryHook = (query) => {
  // State to store the result of the media query
  const [matches, setMatches] = useState<boolean>(() => {
    if (isSSR) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (isSSR) return

    // Create a media query list
    const mediaQueryList = window.matchMedia(query)

    // Define a listener to update the state when the media query changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add the listener to the media query list
    mediaQueryList.addEventListener('change', listener)

    // Clean up the listener on component unmount
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

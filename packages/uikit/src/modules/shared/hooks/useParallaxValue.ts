import { useEffect, useState } from 'react'

export const useParallaxValue = () => {
  const [parallaxValue, setParallaxValue] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight

      const maxScrollTop = documentHeight - viewportHeight
      const scrollFraction = scrollTop / maxScrollTop

      setParallaxValue(scrollFraction)
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return parallaxValue
}

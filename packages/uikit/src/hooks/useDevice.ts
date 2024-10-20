import { useMemo } from 'react'
import { useMediaQuery } from './useMediaQuery'

export const useDevice = () => {
  // Keep in line with apps/frontend/tailwind.config.mjs
  const isDesktop = useMediaQuery('(min-width: 1094px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1093px)')
  const isMobile = useMemo(() => isDesktop === false && isTablet === false, [isDesktop, isTablet])
  return useMemo(() => ({ isDesktop, isTablet, isMobile }), [isDesktop, isTablet, isMobile])
}

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import { useEffect, useRef } from 'react'
import type { GalleryItemType } from './GalleryInteractive'

export const usePhotoSwipe = (items: GalleryItemType[], opts?: { canInit?: boolean }): [PhotoSwipeLightbox | null] => {
  const sdk = useRef<PhotoSwipeLightbox | null>(null)

  if (typeof window !== 'undefined' && sdk.current === null)
    sdk.current = new PhotoSwipeLightbox({
      bgOpacity: 0.5,
      wheelToZoom: true,
      maxZoomLevel: 1,
      pswpModule: () => import('photoswipe'),
      dataSource: items.map((item) => ({
        src: item.src,
        title: item.title,
        className: item.className,
      })),
    })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sdk.current === null || opts?.canInit === false) return
    sdk.current.init()
  }, [])

  return [sdk.current]
}

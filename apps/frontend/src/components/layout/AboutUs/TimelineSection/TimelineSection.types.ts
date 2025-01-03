// TimelineSection.types.ts
interface ImageStyle {
  left?: string
  right?: string
  top?: string
  transform?: string
  zIndex?: string
  position?: string
}

type ImageLayout = {
  containerClasses: string
  imageClasses: string
  getImageStyle: (index: number) => ImageStyle
}

export const LAYOUTS: Record<'right' | 'bottom' | 'bottom-single', ImageLayout> = {
  right: {
    containerClasses: 'relative flex flex-col mt-[100px] w-full',
    imageClasses: 'w-[388px] h-[240px] rounded-lg overflow-hidden absolute z-[2]',
    getImageStyle: (index) => ({
      right: index === 1 ? '0' : '-80px',
      top: index === 1 ? '200px' : undefined,
    }),
  },
  bottom: {
    containerClasses: 'relative h-[400px] mt-[100px] flex justify-center',
    imageClasses: 'w-[388px] h-[240px] rounded-lg overflow-hidden absolute',
    getImageStyle: (index: number) => {
      switch (index) {
        case 0:
          return { left: 'calc(50% - 532px)' }
        case 1:
          return { top: '60px', zIndex: '10' }
        case 2:
          return { left: 'calc(50% + 144px)' }
        default:
          return {}
      }
    },
  },
  'bottom-single': {
    containerClasses: 'w-full flex justify-center',
    imageClasses: 'w-[866px] h-[468px] rounded-lg overflow-hidden',
    getImageStyle: () => ({
      position: 'relative',
    }),
  },
}

export interface TimelineSectionProps {
  id: string
  year: string
  title: string
  content: string
  images: {
    src: string
    alt: string
    className?: string
    style?: ImageStyle
    id?: string
  }[]
  layout?: keyof typeof LAYOUTS
}

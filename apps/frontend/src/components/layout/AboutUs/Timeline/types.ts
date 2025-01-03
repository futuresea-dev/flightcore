// components/layout/AboutUs/Timeline/types.ts
export interface TimelineImage {
  src: string
  alt: string
  className?: string
  style?: Record<string, string>
  id?: string
}

export interface TimelineSection {
  id: string
  year: string
  title: string
  content: string
  images: {
    src: string
    alt: string
    className?: string
    style?: Record<string, string>
    id?: string
  }[]
  footer?: {
    text: string
  }
  layout?: 'right' | 'bottom' | 'bottom-single'
}

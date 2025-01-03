// content/about-us/timeline/types.ts
export interface TimelineImage {
  src: string
  alt: string
  className?: string
  style?: Record<string, string>
}

export interface TimelineSection {
  id: string
  year: string
  title: string
  content: string
  images: TimelineImage[]
  layout?: 'right' | 'bottom' | 'bottom-single'
  footer?: {
    text: string
  }
}

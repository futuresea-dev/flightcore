import { type FC } from 'react'

export type VideoSourceBreakpointKey = 'sm' | 'md' | 'lg' | 'xl'

export type VideoSourceMedia = {
  [key in VideoSourceBreakpointKey]: string
}

export type VideoSourceProps = {
  /**
   * timestamp
   */
  t?: number
  source: string | VideoSourceMedia
  sourceType?: string
}

export const VideoSource: FC<VideoSourceProps> = ({ t, source, sourceType = 'video/mp4' }) => {
  if (typeof source === 'string') {
    return <source type={sourceType} src={`${source}${t ? `#t=${t}` : ''}`} />
  }

  if (typeof source === 'object') {
    const sources: JSX.Element[] = []

    const bp: Record<VideoSourceBreakpointKey, string> = {
      sm: 'max-width: 639px',
      md: 'min-width: 640px and max-width: 767px',
      lg: 'min-width: 768px and max-width: 1023px',
      xl: 'min-width: 1024px',
    }

    Object.keys(bp).forEach((key) => {
      const src = source[key as VideoSourceBreakpointKey]
      if (src) {
        sources.push(
          <source
            key={`${key}${src}`}
            src={`${src}${t ? `#t=${t}` : ''}`}
            media={`(${bp[key as VideoSourceBreakpointKey]})`}
            type={sourceType}
          />,
        )
      }
    })

    return <>{sources}</>
  }

  return null
}

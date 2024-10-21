import { VideoSource } from '@flightcore/uikit'
import { getImage } from 'astro:assets'
import { type FC } from 'react'

import heroImage from '/public/assets/images/showreel/Showreel@3x.jpg'

const image = await getImage({
  src: heroImage,
  format: 'webp',
})

const videoSource = {
  sm: '/assets/videos/hero_360p.mp4',
  md: '/assets/videos/hero_480p.mp4',
  lg: '/assets/videos/hero_720p.mp4',
  xl: '/assets/videos/hero_1080p.mp4',
}

export const HeroVideoPlayer: FC = () => {
  return (
    <video
      preload="auto"
      id="home-hero-video"
      className="relative z-0 w-full h-full object-cover object-center pointer-events-none"
      autoPlay
      loop
      muted
      poster={image.src}>
      <VideoSource source={videoSource} />
    </video>
  )
}

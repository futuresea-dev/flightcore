import { getImage } from 'astro:assets'
import { type FC } from 'react'

import heroImage from '/public/assets/images/showreel/Showreel@3x.jpg'

const image = await getImage({
  src: heroImage,
  format: 'webp',
})

// const videoSource = {
//   sm: '/assets/videos/hero_360p.mp4',
//   md: '/assets/videos/hero_480p.mp4',
//   lg: '/assets/videos/hero_720p.mp4',
//   xl: '/assets/videos/hero_1080p.mp4',
// }

export const HeroVideoPlayer: FC = () => {
  return (
    <video
      preload="auto"
      id="home-hero-video"
      className="relative z-0 w-full h-full object-cover object-center pointer-events-none"
      autoPlay
      loop
      muted
      playsInline
      poster={image.src}>
      {/* Dla ekranów mniejszych niż 640px (sm) */}
      <source src="/assets/videos/hero_360p.mp4" media="(max-width: 639px)" type="video/mp4" />
      {/* Dla ekranów od 640px do 767px (md) */}
      <source src="/assets/videos/hero_480p.mp4" media="(min-width: 640px) and (max-width: 767px)" type="video/mp4" />
      {/* Dla ekranów od 768px do 1023px (lg) */}
      <source src="/assets/videos/hero_720p.mp4" media="(min-width: 768px) and (max-width: 1023px)" type="video/mp4" />
      {/* Dla ekranów większych niż 1024px (xl) */}
      <source src="/assets/videos/hero_1080p.mp4" media="(min-width: 1024px)" type="video/mp4" />
    </video>
  )
}

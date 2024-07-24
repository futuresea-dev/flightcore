import { getImage } from 'astro:assets'

const globs = import.meta.glob<ImageMetadata>('/src/assets/studio/**/*', { eager: true, import: 'default' })

export const optimizedStudiosImages: Record<string, { src: string }> = {}

for (const globPath in globs) {
  getImage({ src: globs[globPath] }).then((optimizedImage) => {
    const [fileName] = [new URL(globs[globPath].src, 'https://directdental.com')]
      .map(({ pathname }) => pathname)
      .map((pathname) => {
        const parts = pathname.split('/')
        return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
      })
    optimizedStudiosImages[fileName] = optimizedImage
  })
}

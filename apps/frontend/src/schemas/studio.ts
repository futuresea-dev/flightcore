import { z } from 'astro:content'

export const studioSchema = z.object({
  title: z.string(),
  desc: z.string(),
  poster: z.string(),
  photos: z.array(z.string()),
})

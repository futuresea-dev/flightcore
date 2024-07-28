import { defineCollection, z } from 'astro:content'

export const clientScehma = z.array(
  z.object({
    logo: z.string(),
  }),
)

export const clientCollection = defineCollection({
  schema: clientScehma,
  type: 'data',
})

import { defineCollection, z } from 'astro:content'

const studioSchema = z.object({
  title: z.string(),
  desc: z.string(),
  poster: z.string(),
  photos: z.array(z.string()),
})

const studioCollection = defineCollection({
  schema: studioSchema,
  type: 'data',
})

const clientScehma = z.object({
  logo: z.string(),
})

const clientCollection = defineCollection({
  schema: clientScehma,
  type: 'data',
})

const quotesSchema = z.array(
  z.object({
    text: z.string(),
    author: z.string(),
  }),
)

const quotesCollection = defineCollection({
  schema: quotesSchema,
  type: 'data',
})

export const collections = {
  studio: studioCollection,
  client: clientCollection,
  quotes: quotesCollection,
}

import { defineCollection, z } from 'astro:content'

export const quotesSchema = z.array(
  z.object({
    text: z.string(),
    author: z.string(),
  }),
)

export const quotesCollection = defineCollection({
  schema: quotesSchema,
  type: 'data',
})

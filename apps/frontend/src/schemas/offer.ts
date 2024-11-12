import { z, type SchemaContext } from 'astro:content'

export const offerSchema = (context: SchemaContext) =>
  z.object({
    imageAlt: z.string(),
    imageLarge: context.image(),
    imageSmall: context.image(),
  })

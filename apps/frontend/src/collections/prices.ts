import { defineCollection, z } from 'astro:content'

export const pricesSchema = z.object({
  pricing: z.array(
    z.object({
      key: z.string(),
      title: z.string(),
      items: z.array(z.object({ key: z.string(), service: z.string(), price: z.string() })),
    }),
  ),
  vouchers: z.array(
    z.object({
      key: z.string(),
      title: z.string(),
      price: z.string(),
      background: z.string(),
      footerCheckList: z.array(z.string()),
    }),
  ),
})

export const pricesCollection = defineCollection({
  schema: pricesSchema,
  type: 'data',
})

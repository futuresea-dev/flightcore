import { z, type SchemaContext } from 'astro:content'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const voucherSchema = (_context: SchemaContext) =>
  z.object({
    title: z.string(),
    price: z.string(),
    ctaText: z.string(),
    note: z.string(),
  })

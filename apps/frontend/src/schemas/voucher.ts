import { z } from 'astro:content'

export const voucherSchema = z.object({
  title: z.string(),
  price: z.string(),
  ctaText: z.string(),
  note: z.string(),
})

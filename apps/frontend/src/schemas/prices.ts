import { z } from 'astro:content'

const pricingItemSchema = z.object({
  key: z.string(),
  service: z.string(),
  price: z.string(),
})

const pricingCategorySchema = z.object({
  key: z.string(),
  title: z.string(),
  items: z.array(pricingItemSchema),
})

const voucherSchema = z.object({
  key: z.string(),
  title: z.string(),
  price: z.string(),
  background: z.string(),
  footerCheckList: z.array(z.string()),
})

export const pricesSchema = z.object({
  pricing: z.array(pricingCategorySchema),
  vouchers: z.array(voucherSchema),
})

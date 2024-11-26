import { defineCollection } from 'astro:content'
import { clientScehma, offerSchema, pricesSchema, studioSchema, voucherSchema } from '../schemas'

const studioCollection = defineCollection({
  type: 'data',
  schema: studioSchema,
})

const clientCollection = defineCollection({
  type: 'data',
  schema: clientScehma,
})

const pricesCollection = defineCollection({
  type: 'data',
  schema: pricesSchema,
})

const voucherCollection = defineCollection({
  type: 'content',
  schema: voucherSchema,
})

const offerCollection = defineCollection({
  type: 'content',
  schema: offerSchema,
})

const articleCollection = defineCollection({
  type: 'content',
})

export const collections = {
  studio: studioCollection,
  clients: clientCollection,
  prices: pricesCollection,
  vouchers: voucherCollection,
  offers: offerCollection,
  articles: articleCollection,
}

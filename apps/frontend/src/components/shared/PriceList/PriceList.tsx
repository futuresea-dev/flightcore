import type { CollectionEntry } from 'astro:content'
import type { FC } from 'react'
import { PriceListCard } from './PriceList.Card'
import { PriceListItem } from './PriceList.Item'

type PricingType = CollectionEntry<'prices'>['data']['pricing']

export type PriceListPropsType = {
  content: PricingType['additional'] | PricingType['postproduction'] | PricingType['recording']
}

export const PriceList: FC<PriceListPropsType> = ({ content }) => {
  return (
    <PriceListCard title={content.title}>
      {content.items.map((item) => (
        <PriceListItem priceTitle={item.service} priceValue={item.price} key={item.key} />
      ))}
    </PriceListCard>
  )
}

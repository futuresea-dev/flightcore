import type { CollectionEntry } from 'astro:content'
import type { FC } from 'react'
import { PriceListCard } from './PriceList.Card'
import { PriceListItem } from './PriceList.Item'

type PricingType = CollectionEntry<'prices'>['data']['pricing'][number]

export type PriceListPropsType = {
  content: PricingType
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

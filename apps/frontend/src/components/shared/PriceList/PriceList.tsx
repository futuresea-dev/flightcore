import type { FC } from 'react'
import { PriceListCard } from './PriceList.Card'
import { PriceListItem } from './PriceList.Item'

type PriceItem = {
  key: string
  service: string
  price: string
}

type PriceContent = {
  title?: string
  key?: string
  items: PriceItem[]
}

export type PriceListPropsType = {
  content: PriceContent
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

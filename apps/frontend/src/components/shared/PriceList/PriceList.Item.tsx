import type { FC } from 'react'

export type PriceListItemPropsType = {
  priceTitle?: string
  priceValue?: string
}

export const PriceListItem: FC<PriceListItemPropsType> = ({ priceTitle, priceValue }) => {
  return (
    <article className="flex mx-[20px] py-[14px]">
      <span aria-label="Bullet point" className="block w-[10px] h-[10px] mt-[8px] rounded-full bg-blue-light mr-[12px]"></span>
      <h3 aria-label={priceTitle} className="flex-[1] font-light text-blue-lightest text-body2">
        {priceTitle}
      </h3>
      <p aria-label={priceValue} className="flex-[1] font-bold text-blue-lightest text-body1">
        {priceValue}
      </p>
    </article>
  )
}

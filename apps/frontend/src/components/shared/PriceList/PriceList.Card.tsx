import type { FC, PropsWithChildren } from 'react'

export type PriceListCardPropsType = {
  title?: string
}

export const PriceListCard: FC<PropsWithChildren<PriceListCardPropsType>> = ({ title, children }) => {
  return (
    <section aria-label={`${title}`}>
      <h2 className="text-heading3 mb-[24px]">{title}</h2>
      <div className="bg-extra-dark rounded-[20px] overflow-hidden divide-y-[1px] divide-blue-medium">{children}</div>
    </section>
  )
}

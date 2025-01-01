import type { FC } from 'react'

import { Card } from '@flightcore/uikit'

type QuoteCardPropsType = {
  text: string
  author: string
  className?: string
}

export const QuoteCard: FC<QuoteCardPropsType> = ({ text, author, className }) => (
  <Card className={className}>
    <div className="space-y-[16px] sm:space-y-[32px]">
      <p className="text-body2 text-[14px] sm:text-[16px] select-none leading-[20px] sm:leading-[24px]">{text}</p>
      <h6 className="font-bold text-[16px] sm:text-[20px] leading-[24px] sm:leading-[32px] tracking-[0.25px] select-none">
        {author}
      </h6>
    </div>
  </Card>
)

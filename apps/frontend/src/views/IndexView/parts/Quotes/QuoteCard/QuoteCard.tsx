import type { FC } from 'react'

import { Card } from '@flightcore/uikit'

type QuoteCardPropsType = {
  text: string
  author: string
  className?: string
}

export const QuoteCard: FC<QuoteCardPropsType> = ({ text, author, className }) => (
  <Card className={className}>
    <div className="space-y-[32px]">
      <p className="text-body2 select-none">{text}</p>
      <h6 className="font-bold text-[20px] leading-[32px] tracking-[0.25px] select-none">{author}</h6>
    </div>
  </Card>
)

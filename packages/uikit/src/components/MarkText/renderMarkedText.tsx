import type { FC } from 'react'
import { MarkText, type MarkTextPropsType } from './MarkText'

const markRegex = /\{mark\}(.*?)\{\/mark\}/g

export function renderMarkedText(text: string, props?: Partial<MarkTextPropsType>) {
  const parts = text.split(markRegex)
  return parts.map((part, index) => {
    if (index % 2 === 0) {
      // Not a marked part, just return as regular text
      return part
    } else {
      // Marked part, wrap in MarkText component
      return <MarkText {...props} key={index} text={part} />
    }
  })
}

export const RenderMarkedText: FC<{ text: string } & Partial<MarkTextPropsType>> = ({ text, ...props }) => {
  return renderMarkedText(text, props)
}

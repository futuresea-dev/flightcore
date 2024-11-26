import cx from 'clsx'
import type { CSSProperties, FC } from 'react'

type MarkTextSizeType = 'full' | 'large' | 'medium' | 'default'

export type MarkTextPropsType = SpanElementProps & {
  backgroundColorClassName?: string
  size?: MarkTextSizeType
  className?: string
  text: string
  children?: never
  inlineStyle?: CSSProperties
}

type SpanElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export const MarkText: FC<MarkTextPropsType> = ({
  className,
  text,
  inlineStyle,
  backgroundColorClassName = 'bg-yellow-accent',
  ...rest
}) => {
  return (
    <span
      className={cx('inline relative px-[0.125em] z-0 text-blue-dark', backgroundColorClassName, className)}
      style={inlineStyle}
      {...rest}>
      {text}
    </span>
  )
}

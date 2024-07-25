import clsx from 'clsx'
import type { FC } from 'react'

export type CarouseleBulletPropsType = {
  active?: boolean
  size?: 'small' | 'medium'
  onClick?: () => void
}

export const CarouseleBullet: FC<CarouseleBulletPropsType> = ({ onClick, active, size = 'small' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'transition-all duration-200 rounded-sm outline outline-2 outline-offset-[-2px]',
        size === 'small' && 'w-[12px] h-[12px]',
        size === 'medium' && 'w-[16px] h-[16px]',
        active && 'bg-green outline-green-darker',
        !active && 'bg-extra-dark outline-blue-medium',
      )}
    />
  )
}

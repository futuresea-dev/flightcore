import clsx from 'clsx'
import type { FC } from 'react'

export type CarouseleBulletPropsType = {
  active?: boolean
  onClick?: () => void
}

export const CarouseleBullet: FC<CarouseleBulletPropsType> = ({ onClick, active }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-sm w-[16px] h-[16px] outline outline-2 outline-offset-[-2px]',
        active && 'bg-green outline-green-darker',
        !active && 'bg-extra-dark outline-blue-medium',
      )}
    />
  )
}

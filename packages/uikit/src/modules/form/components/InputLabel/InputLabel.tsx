import clsx from 'clsx'
import type { FC, PropsWithChildren } from 'react'

export const InputLabel: FC<PropsWithChildren> = ({ children: label }) => {
  return (
    <label
      className={clsx(
        'absolute left-3 text-blue-light text-lg transition-all duration-200 bg-extra-dark px-2',
        'pointer-events-none select-none',
        // {
        //   'top-4': !isFocused && !value,
        //   'top-[8px] left-2 text-xs': isFocused || value,
        // },
      )}>
      {label}
    </label>
  )
}

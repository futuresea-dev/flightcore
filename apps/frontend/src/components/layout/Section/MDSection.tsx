import type { FC, PropsWithChildren } from 'react'

export const MDSection: FC<PropsWithChildren> = ({ children }) => {
  return <div className="my-14">{children}</div>
}

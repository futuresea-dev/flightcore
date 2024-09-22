import { type FC, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  if (typeof document === 'undefined') return
  const $node = document.getElementById('portal')
  if ($node === null) throw new Error('#portal not found')
  return createPortal(children, $node)
}

import { useRef, type FC, type PropsWithChildren } from 'react'
import { generateShortUUID } from '../../utils'

export const ModalBaseV2: FC<PropsWithChildren> = ({ children }) => {
  const id = useRef<string>()
  if (id.current === undefined) id.current = generateShortUUID()

  return (
    <dialog id={id.current} className="modal">
      {children}
    </dialog>
  )
}

export type ModalBaseV2PropsType = {
  modalId?: string
  onRequestOpen?: () => void  
  onRequestClose?: () => void
}

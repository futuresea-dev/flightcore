import { useRef } from 'react'

export const useSymbol = (symbolDescription?: string) => {
  const symbolRef = useRef<symbol>()
  if (typeof symbolRef.current === 'undefined') {
    symbolRef.current = Symbol(symbolDescription)
  }
  return symbolRef.current
}

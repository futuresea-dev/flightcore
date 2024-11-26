import { createContext, useContext } from 'react'
import type { InputState } from './useInput'

export const InputContext = createContext<InputState | undefined>(undefined)

export const useInputContext = () => {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('useInputContext must be used within a InputProvider')
  }
  return context
}

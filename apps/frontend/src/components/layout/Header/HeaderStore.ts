import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'

export const $showMobileMenuOverlay = atom<boolean>(false)

export function toggleMobileMenuOverlay() {
  $showMobileMenuOverlay.set(!$showMobileMenuOverlay.get())
}

export const useShowMobileMenuOverlay = () => useStore($showMobileMenuOverlay)

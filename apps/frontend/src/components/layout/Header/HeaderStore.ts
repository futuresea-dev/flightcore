import { atom } from 'nanostores'

export const $showMobileMenuOverlay = atom<boolean>(false)

export function toggleMobileMenuOverlay() {
  $showMobileMenuOverlay.set(!$showMobileMenuOverlay.get())
}

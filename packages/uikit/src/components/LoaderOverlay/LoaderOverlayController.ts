import { atom } from 'nanostores'

export const visible = atom()

export function show() {
  visible.set(true)
}

export function hide() {
  visible.set(false)
}

visible.subscribe((isVisible) => {
  if (typeof document === 'undefined') return
  if (isVisible) {
    document.documentElement.classList.add('overflow-hidden')
    document.getElementById('overlay')?.classList.remove('hidden')
  } else {
    document.documentElement.classList.remove('overflow-hidden')
    document.getElementById('overlay')?.classList.add('hidden')
  }
})

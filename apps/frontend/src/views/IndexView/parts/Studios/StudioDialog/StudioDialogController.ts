import type { CollectionEntry } from 'astro:content'
import { atom } from 'nanostores'

type Studio = CollectionEntry<'studio'>['data'] | undefined

export const controller = {
  visible: atom<boolean>(false),
  focusedStudio: atom<Studio>(),
  show(studio: Studio) {
    controller.focusedStudio.set(studio)
    controller.visible.set(true)
  },
  hide() {
    controller.visible.set(false)
  },
  clear() {
    controller.visible.set(false)
    controller.focusedStudio.set(undefined)
  },
}

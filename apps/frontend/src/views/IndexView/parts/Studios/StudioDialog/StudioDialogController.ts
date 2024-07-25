import type { GetImageResult } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { atom } from 'nanostores'

export type StudioType = Omit<CollectionEntry<'studio'>['data'], 'poster' | 'photos'> & {
  photos: GetImageResult[]
  poster: GetImageResult
}

export const controller = {
  visible: atom<boolean>(false),
  focusedStudio: atom<StudioType | undefined>(),
  show(studio: StudioType) {
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

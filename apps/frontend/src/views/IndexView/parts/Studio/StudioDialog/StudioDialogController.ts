import type { GetImageResult } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { atom } from 'nanostores'

export type StudioEntryType = Omit<CollectionEntry<'studio'>['data'], 'poster' | 'photos'> & {
  photos: GetImageResult[]
  poster: GetImageResult
}

export const StudioDialogController = {
  visible: atom<boolean>(false),
  focusedStudio: atom<StudioEntryType | undefined>(),
  show(studio: StudioEntryType) {
    StudioDialogController.focusedStudio.set(studio)
    StudioDialogController.visible.set(true)
  },
  hide() {
    StudioDialogController.visible.set(false)
  },
  clear() {
    StudioDialogController.visible.set(false)
    StudioDialogController.focusedStudio.set(undefined)
  },
}

import type { CollectionEntry } from 'astro:content'
import { map } from 'nanostores'

type ControllerType = {
  focusedStudio: CollectionEntry<'studio'>['data'] | undefined
}

export const controller = map<ControllerType>({
  focusedStudio: undefined,
})

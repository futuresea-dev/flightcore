import { map } from 'nanostores'

type Entry = {
  poster: string
  title: string
  desc: string
  photos: string[]
}

type StoreType = {
  entry: Entry | undefined
}

export const store = map<StoreType>({
  entry: undefined,
})

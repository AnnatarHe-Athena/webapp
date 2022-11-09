import { atomWithStorage, createJSONStorage } from 'jotai/utils'

export const STORAGE_OFFSET_KEY = 'app:list:offset'
const storage = createJSONStorage<number | undefined>(() => sessionStorage)

export const beautyListFetchOffset = atomWithStorage<number | undefined>(STORAGE_OFFSET_KEY, undefined, storage)

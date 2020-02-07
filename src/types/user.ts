import { CellItem } from "./cell"

export enum Permission {
  OPEN = 2,
  CLOSE = 3,
  WAIT_FOR_DEL = 5
}

export type TUser = {
  avatar: string
  bio: string
  email: string
  id: string
  role: number
  name: string
}

export type Collection = CellItem

export type TUserProfileWithCollection = {
  collections?: Collection[]
  users: TUser
}

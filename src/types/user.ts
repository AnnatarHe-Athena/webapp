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

export interface Collection {
    fromID: string;
    fromURL: string;
    id: string;
    img: string;
    permission: Permission;
    text: string;
}

export type TUserProfileWithCollection = {
    collections: Collection[]
    users: TUser
}

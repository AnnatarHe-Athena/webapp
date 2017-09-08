import {
    SYNC_AUTH_TOKEN,
    PROFILE_GOT
} from '../constants/auth'

export function syncAuthTokenToStore(token) {
    return {
        type: SYNC_AUTH_TOKEN,
        token
    }
}

export function profileGot(profile) {
    return { type: PROFILE_GOT, profile }
}
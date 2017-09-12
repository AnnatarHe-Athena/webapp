import {
    SYNC_AUTH_TOKEN,
    PROFILE_GOT,
    SAGA_SYNC_AUTH_TOKEN
} from '../constants/auth'

// 仅供 saga 调用
export function syncAuthTokenToStore(token) {
    return {
        type: SYNC_AUTH_TOKEN,
        token
    }
}

export function profileGot(profile) {
    return { type: PROFILE_GOT, profile }
}

// 可以供客户端 View 调用的
export function syncAuthStatus(token, id) {
  return { type: SAGA_SYNC_AUTH_TOKEN, token, id }
}

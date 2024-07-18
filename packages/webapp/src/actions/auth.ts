import {
  SYNC_AUTH_TOKEN,
  PROFILE_GOT,
  SAGA_SYNC_AUTH_TOKEN
} from '../constants/auth'
import { TUser } from '../types/user';

// 仅供 saga 调用
export function syncAuthTokenToStore(token: string) {
  return {
    type: SYNC_AUTH_TOKEN,
    token
  }
}

export function profileGot(profile: TUser) {
  return { type: PROFILE_GOT, profile }
}

// 可以供客户端 View 调用的
export function syncAuthStatus(token: string, id: string) {
  return { type: SAGA_SYNC_AUTH_TOKEN, token, id }
}

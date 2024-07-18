import {
  PROFILE_GOT
} from '../constants/auth'
import { TUser } from '../types/user';

export type ProfileStoreType = {
  info: TUser
}

const init: ProfileStoreType = {
  info: {
    id: '-1',
    email: '',
    avatar: '',
    bio: '',
    role: 0,
    name: ''
  } as TUser
}

function profileReducer(state: ProfileStoreType = init, action: any) {
  switch(action.type) {
  case PROFILE_GOT:
    return {
      info: action.profile
    }
  default:
    return state
  }
}

export default profileReducer

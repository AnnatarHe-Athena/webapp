import { fromJS } from 'immutable'
import {
  PROFILE_GOT
} from '../constants/auth'
import { TUser } from '../types/user';

const init = fromJS({
  info: {} as TUser
})

function profileReducer(state = init, action: any) {
  switch(action.type) {
  case PROFILE_GOT:
    return state.update('info', () => fromJS(action.profile))
  default:
    return state
  }
}

export default profileReducer

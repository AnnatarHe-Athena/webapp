import { fromJS } from 'immutable'
import {
    CHANGE_CATEGORIES
} from '../constants/categories'

import {
    SAGA_SYNC_AUTH_TOKEN,
    SYNC_AUTH_TOKEN
} from '../constants/auth'

const init = fromJS({
  categoryID: -1,
  token: ''
})

const reducer = (state = init, action) => {
  switch (action.type) {
    case CHANGE_CATEGORIES:
        return state.update('categoryID', _ => action.categoryID)
    case SYNC_AUTH_TOKEN:
        return state.update('token', _ => action.token)
    default:
      return state
  }
}

export default reducer


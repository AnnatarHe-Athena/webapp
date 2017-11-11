import { fromJS } from 'immutable'
import {
  CHANGE_CATEGORIES,
  UPDATE_CATEGORIES
} from '../constants/categories'

import {
  SYNC_AUTH_TOKEN
} from '../constants/auth'

const init = fromJS({
  categories: [],
  categoryID: -1,
  token: ''
})

const reducer = (state = init, action) => {
  switch (action.type) {
  case CHANGE_CATEGORIES:
    return state.update('categoryID', () => action.categoryID)
  case SYNC_AUTH_TOKEN:
    return state.update('token', () => action.token)
  case UPDATE_CATEGORIES:
    return state.update('categories', () => fromJS(action.categories))
  default:
    return state
  }
}

export default reducer


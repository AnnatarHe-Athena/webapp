import { fromJS } from 'immutable'
import {
    CHANGE_CATEGORIES
} from '../constants/categories'

const init = fromJS({
  categoryID: -1
})

const reducer = (state = init, action) => {
  switch (action.type) {
    case CHANGE_CATEGORIES:
      return state.update('categoryID', _ => action.categoryID)
      break;
    default:
      return state
  }
}

export default reducer


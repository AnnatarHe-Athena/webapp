import {
  CHANGE_CATEGORIES,
  UPDATE_CATEGORIES
} from '../constants/categories'
import {
  SYNC_AUTH_TOKEN
} from '../constants/auth'
import { Category } from '../schema/_g/graphql';

export type AppStoreType = {
  categories: Category[],
  categoryID: number,
  token: string
}

const init: AppStoreType = {
  categories: [],
  categoryID: -1,
  token: ''
}

const reducer = (state: AppStoreType = init, action: any) => {
  switch (action.type) {
    case CHANGE_CATEGORIES:
      return {
        ...state,
        categoryID: action.categoryID
      }
    case SYNC_AUTH_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}

export default reducer


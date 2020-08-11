import {
  CHANGE_CATEGORIES,
  UPDATE_CATEGORIES
} from '../constants/categories'

import {
  SYNC_AUTH_TOKEN
} from '../constants/auth'
import { fetchCategories } from '../types/fetchCategories'
// import { TCategory } from '../types/info'

export type AppStoreType = {
  categories: fetchCategories[],
  categoryID: number,
  token: string
}

const init: AppStoreType = {
  categories: [],
  categoryID: -1,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJkZXZpY2VJZCI6IjEyNC4wNDM0NDg4NDM5NTY4NyIsImV4cCI6MTYxMjcwODc3MiwiaXNzIjoiZGV4cCJ9.MX65BwavUX8T4x1g3EFtgKtBcD9QPZ-ql2IeBEOwi3M'
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


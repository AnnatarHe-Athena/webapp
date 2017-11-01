import {
  CHANGE_CATEGORIES,
  UPDATE_CATEGORIES
} from '../constants/categories'

export function changeCategory(id) {
  return { type: CHANGE_CATEGORIES, categoryID: id}
}

export function updateCategories(categories) {
  return { type: UPDATE_CATEGORIES, categories }
}

import {
  CHANGE_CATEGORIES,
  UPDATE_CATEGORIES
} from '../constants/categories'

export function changeCategory(id: number) {
  return { type: CHANGE_CATEGORIES, categoryID: id }
}

export function updateCategories(categories: any) {
  return { type: UPDATE_CATEGORIES, categories }
}

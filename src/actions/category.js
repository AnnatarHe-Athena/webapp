import {
    CHANGE_CATEGORIES
} from '../constants/categories'

export function changeCategory(id) {
    return { type: CHANGE_CATEGORIES, categoryID: id}
}

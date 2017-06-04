const PAGE_SIZE = 2
import 'whatwg-fetch'

import { getUrl, request } from '../utils/api'
import {
    MODAL_TOGGLE,
    IMAGE_CURRENT_CHANGE,
    CATEGORY_FETCHED,
    CATEGORY_CURRENT_CHANGE,
    LOAD_NEXT_START,
    LOAD_NEXT_DOING,
    LOAD_NEXT_DONE,
    LOAD_NEXT_FAIL,
    LOAD_NEXT_RESET,
    CELLS_RESET
} from '../constants/index'

export function fetchCategories({ dispatch, commit }) {
    request(getUrl('/girls/categories'))
        .then(res => res.json())
        .then(res => commit(CATEGORY_FETCHED, res.data))
}
export function getNextPage({ dispatch, commit, state }) {
    if (state.loadNextPage === 'loading') {
        return
    }
    commit(LOAD_NEXT_DOING)
    request(getUrl(`/girls/${state.currentCategory}/${PAGE_SIZE}/${state.currentPage * PAGE_SIZE}`))
        .then(res => res.json())
        .then(res => commit(LOAD_NEXT_DONE, res.data))
        // 更新当前状态
        .then(() => commit(LOAD_NEXT_RESET))
        .catch(err => commit(LOAD_NEXT_FAIL))
}

export function changeCurrentCategory({ dispatch, commit }, cate) {
    commit(CATEGORY_CURRENT_CHANGE, cate)
    commit(CELLS_RESET)
    dispatch('getNextPage')
}

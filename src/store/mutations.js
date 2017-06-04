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

const mutations = {
    [MODAL_TOGGLE](state) {
        state.modalStatus = ! state.modalStatus
    },
    [IMAGE_CURRENT_CHANGE](state, img) {
        state.currentImage = img
    },
    [CATEGORY_FETCHED](state, categories) {
        state.categories = categories
        state.categoriesLoading = false
    },
    [CATEGORY_CURRENT_CHANGE](state, category) {
        state.currentCategory = category
    },
    [CELLS_RESET](state) {
        state.currentPage = 0
        state.cells.length = 0
    },
    [LOAD_NEXT_DOING](state) {
        state.loadNextPage = 'loading'
    },
    [LOAD_NEXT_RESET](state) {
        state.loadNextPage = 'init'
    },
    [LOAD_NEXT_DONE](state, cells) {
        state.cells.push(...cells)
        state.currentPage++
        state.loadNextPage = 'done'
    },
    [LOAD_NEXT_FAIL](state, err) {
        state.loadNextPage = 'fail'
    }
}

export default mutations

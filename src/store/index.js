import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
    changeCurrentCategory,
    fetchCategories,
    getNextPage
} from '../actions/index'
import mutations from './mutations'

const store = new Vuex.Store({
    state: {
        categories: [{id: -1, name: 'loading'}],
        cells: [],
        modalStatus: false,
        currentImage: {},
        currentCategory: 0,
        categoriesLoading: true,
        currentPage: 0,
        loadNextPage: 'init' // init, loading, done, fail
    },
    getters: {
        categories(state) {
            return state.categories
        },
        cells(state) {
            return state.cells
        },
        modalState(state) {
            return state.modalStatus
        },
        currentCell(state) {
            return state.currentImage
        }
    },
    mutations,
    actions: {
        changeCurrentCategory,
        fetchCategories,
        getNextPage
    },
    strict: false
})

if (module.hot) {
  // 使 actions 和 mutations 成为可热重载模块
  module.hot.accept(['./mutations'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    const newMutations = require('./mutations').default
    // 加载新模块 
    store.hotUpdate({
      mutations: newMutations,
    })
  })
}

export default store
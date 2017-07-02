import * as Redux from 'redux'

export interface ICategory {
    id: Number,
    name: String,
    src: Number
}

export interface categoriesActionTypes extends Redux.Action {
    categories: ICategory
}

export interface categoryChangeActionType extends Redux.Action {
    category: number
}
import * as Redux from 'redux'

export interface ICategories {
    id: Number,
    name: String,
    src: Number
}

export interface categoriesActionTypes extends Redux.Action {
    categories: ICategories
}

export interface categoryChangeActionType extends Redux.Action {
    category: number
}
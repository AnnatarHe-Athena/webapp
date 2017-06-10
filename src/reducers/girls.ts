import * as Immutable from 'immutable'
import { categoriesActionTypes, ICategories } from "../model/categories"
import { IGirlsCell } from "../model/girls"
import { GOT_CATEGORIES } from "../constants/categories"

interface IGirlsStateValues {
    hasMore?: Boolean
    items: ICategories | IGirlsCell
}


const initialGirls: Immutable.Map<string, IGirlsStateValues> = Immutable.fromJS({
    categories: {
        items: [{
            id: 0,
            src: 0
        }]
    },
    cells: {
        hasMore: true,
        items: [{
            text: "",
            img: ''
        }]
    }
})

const girlsReducers = (state = initialGirls, action: categoriesActionTypes) => {
    switch(action.type) {
        case GOT_CATEGORIES:
            return state.updateIn(['categories', 'items'], v => v.push(action.categories))
        default:
            return state
    }
}

export default girlsReducers
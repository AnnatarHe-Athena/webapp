import * as Immutable from 'immutable'
import { ICategory } from "../model/categories"
import { IGirlsCell } from "../model/girls"
import { GOT_CATEGORIES, GOT_GIRLS_CELL } from "../constants/categories"

interface IGirlsStateValues {
    hasMore?: Boolean
    items: ICategory | IGirlsCell
}

const initialGirls: Immutable.Map<string, IGirlsStateValues> = Immutable.fromJS({
    categories: {
        items: []
    },
    cells: {
        "1": {
            hasMore: true,
            items: [{
                text: "",
                img: ''
            }]
        }
    }
})

const girlsReducers = (state = initialGirls, action: any) => {
    switch(action.type) {
        case GOT_CATEGORIES:
            return state.updateIn(['categories', 'items'], v => v.concat(...action.categories))
        case GOT_GIRLS_CELL:
            const cells = state.updateIn(['cells', action.belongsTo, 'items'], v => v.push(action.categories))
                .updateIn(['cells', action.belongsTo, 'hasMore'], v => true)
                // 暂时先不设置 hasMore
            return cells
        default:
            return state
    }
}

export default girlsReducers
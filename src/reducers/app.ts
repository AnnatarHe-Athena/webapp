import * as Immutable from 'immutable'
import { categoryChangeActionType } from '../model/categories'
import { CATEGORY_CHANGE_EPIC } from '../constants/categories'

const init: Immutable.Map<string, number> = Immutable.fromJS({
    cate: 0
})

const appReducer = (state = init, action: categoryChangeActionType ) => {
    switch(action.type) {
        case CATEGORY_CHANGE_EPIC:
            return state.update('cate', v => action.category)
        default:
            return state
    }
}

export default appReducer
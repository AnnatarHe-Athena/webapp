import { ActionsObservable } from 'redux-observable'
import 'rxjs'
import { CATEGORY_CHANGE, CATEGORY_CHANGE_EPIC } from "../constants/categories"

const changeCategory = (action$: ActionsObservable<any>) => {
    return action$.ofType(CATEGORY_CHANGE)
        .takeLast(1)
        .map(action => ({ type: CATEGORY_CHANGE_EPIC, cate: action.category }))
}

export default changeCategory
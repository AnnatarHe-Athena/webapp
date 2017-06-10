import { combineEpics } from 'redux-observable'
import { ActionsObservable } from 'redux-observable'
import 'rxjs'
import { request, getUrl } from "../utils/fetch";
import { GET_CATEGORIES, GOT_CATEGORIES } from "../constants/categories"

const getCategories = (action$: ActionsObservable<any>) => {
    return action$.ofType(GET_CATEGORIES)
        .mergeMap(action => request(getUrl('/girls/categories')).map(resp => ({
            type: GOT_CATEGORIES,
            categories: resp.data
        })))
}

export default combineEpics(
    getCategories
)
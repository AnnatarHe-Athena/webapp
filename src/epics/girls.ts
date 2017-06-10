// import * as Immutable from 'immutable'
import * as Redux from 'redux'
import { combineEpics } from 'redux-observable'
import { ActionsObservable } from 'redux-observable'
import 'rxjs'
import { request, getUrl } from "../utils/fetch";
import { GET_GIRLS_CELL, GOT_GIRLS_CELL } from "../constants/categories"

const PAGE_SIZE = 2

const getCells = (action$: ActionsObservable<any>, store: Redux.Store<any>) => {
    const currentCategory = store.getState().getIn(['app', 'category'])
    const items = store.getState().getIn(['girls', 'cells', 'items'])
    const offset = items ? items.length : 0
    return action$.ofType(GET_GIRLS_CELL)
        .mergeMap(action => request(getUrl(`/girls/${currentCategory}/${PAGE_SIZE}/${offset}`)).map(res => ({
            type: GOT_GIRLS_CELL,
            cells: res.data
        })))
}

export default combineEpics(
    getCells
)
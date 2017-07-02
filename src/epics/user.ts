import { combineEpics, ActionsObservable } from 'redux-observable'
import 'rxjs'
import { request, getUrl } from "../utils/fetch";
import {
    EPIC_USER_LOGIN, EPIC_USER_LOGOUT, EPIC_USER_REGIST,
    USER_LOGIN, USER_LOGOUT, USER_REGIST
} from "../constants/user"

const userLogin = (action$: ActionsObservable<any>) => {
    return action$.ofType(EPIC_USER_LOGIN)
        .takeLast(1)
        .mergeMap((action: any) => request(getUrl('/auth/signin'), { method: 'POST', body: action.user }))
        .map(res => ({ type:  USER_LOGIN, user: res.data }))
}

const userLogout = (action$: ActionsObservable<any>) => {
    return action$.ofType(EPIC_USER_LOGOUT)
        .takeLast(1)
        .map(action => request(getUrl('/auth/logout'), { method: 'POST', body: '' }))
        .map(() => ({ type: USER_LOGOUT }))
}

const userRegist = (action$: ActionsObservable<any>) => {
    return action$.ofType(EPIC_USER_REGIST)
        .takeLast(1)
        .mergeMap(action => request(getUrl('/auth/signup'), { method: 'POST', body: action.user }))
        .map(res => ({ type: USER_REGIST, user: res.data }))
}

export default combineEpics(
    userLogin,
    userLogout,
    userRegist
)
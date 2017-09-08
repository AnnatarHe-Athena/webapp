import {
    SAGA_SYNC_AUTH_TOKEN,
    SYNC_AUTH_TOKEN
} from '../constants/auth'
import { push } from 'react-router-redux'
import { put, call } from 'redux-saga/effects'

export function* syncToken(action) {
    const { token, id } = action
    // todo: 
    // 1. sync to sessionStorage
    sessionStorage.setItem('athena-token', token)
    // 2. sync to redux store
    yield put({ type: SYNC_AUTH_TOKEN, token })
    // 3. sync to localStorage
    localStorage.setItem('athena-token', token)
    // 4. set to request header

    // 5. in auth section you should async to fetch user info
    // 6. redirect to profile page
    yield call(push, '/profile' + id)
}

import {
  SAGA_SYNC_AUTH_TOKEN,
  SYNC_AUTH_TOKEN,
  LOGOUT
} from '../constants/auth'
import { navigate } from '@reach/router'
import { put, take, call } from 'redux-saga/effects'

export function* syncToken() {
  const { token, id } = yield take(SAGA_SYNC_AUTH_TOKEN)
  // 1. sync to sessionStorage
  sessionStorage.setItem('athena-token', token)
  sessionStorage.setItem('athena-user-id', id)
  // 2. sync to redux store
  yield put({ type: SYNC_AUTH_TOKEN, token })
  // 3. sync to localStorage
  localStorage.setItem('athena-token', token)
  localStorage.setItem('athena-user-id', id)
  // 4. set to request header
  // 5. in auth section you should async to fetch user info
  // 6. redirect to profile page
  yield call(navigate, `/profile/${id}`)
}

export function* logout() {
  yield take(LOGOUT)
  sessionStorage.removeItem('athena-token')
  sessionStorage.removeItem('athena-user-id')
  yield put({ type: SYNC_AUTH_TOKEN, token: '' })
  localStorage.removeItem('athena-token')
  localStorage.removeItem('athena-user-id')
  yield call(navigate, '/auth', { replace: true })
}

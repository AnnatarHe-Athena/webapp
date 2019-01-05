import { syncToken, logout } from './auth'
import { fork, all } from 'redux-saga/effects'

export default function* root () {
  yield all([
    fork(syncToken),
    fork(logout)
  ])
}

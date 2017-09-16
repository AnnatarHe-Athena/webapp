import {
    SAGA_SYNC_AUTH_TOKEN
} from '../constants/auth'
import { syncToken, logout } from './auth'
import { fork, all, take } from 'redux-saga/effects'

function echo() {
  return new Promise((resolve, reject) => {
    resolve(100)
  })
}
export default function* root () {
  yield [
    fork(syncToken),
    fork(logout)
  ]
  // yield all([
  //   fork(echo),
  //   take(SAGA_SYNC_AUTH_TOKEN, syncToken)
  // ])
}

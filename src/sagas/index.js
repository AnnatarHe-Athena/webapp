import { syncToken, logout } from './auth'
import { fork } from 'redux-saga/effects'

export default function* root () {
  yield [
    fork(syncToken),
    fork(logout)
  ]
}

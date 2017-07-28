import { fork, all } from 'redux-saga/effects'

function echo() {
  return new Promise((resolve, reject) => {
    resolve(100)
  })
}

export default function* root () {
  yield all([
    fork(echo)
  ])
}

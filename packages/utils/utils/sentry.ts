import * as Sentry from '@sentry/browser'
import { __DEV__ } from './constant'

export default function setup() {
  if (__DEV__) {
    return
  }
  Sentry.init({ dsn: 'https://c11f932d316c4a2aa7b99e43cd950678@sentry.io/238843' })
}

export function setUserInfo(info: any) {
  Sentry.setUser({
    email: info.email,
    username: info.name,
    id: info.id
  })
}

export function report(err: Error, info: any) {
  if (__DEV__) {
    console.log(err, info) // eslint-disable-line no-console
  }
  Sentry.captureException(err, { extra: info })
}

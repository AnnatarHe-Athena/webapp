import * as Sentry from '@sentry/browser'

export default function setup() {
  if (__DEV__) {
    return
  }
  Sentry.init({ dsn: 'https://c11f932d316c4a2aa7b99e43cd950678@sentry.io/238843' })
}

export function setUserInfo(info) {
  Sentry.configureScope((scope) => {
    scope.setUser({
      email: info.email,
      username: info.name,
      id: scope.id
    })
  })
}

export function report(err, info) {
  if (__DEV__) {
    console.log(err, info) // eslint-disable-line no-console
  }
  Sentry.captureEvent(err, {extra: info})
}

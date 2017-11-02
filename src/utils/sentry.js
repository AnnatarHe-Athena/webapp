export default function setup() {
  if (__DEV__) {
    return
  }

  let times = 0,
    loadRavenTimer = null

  function clean() {
    clearInterval(loadRavenTimer)
    loadRavenTimer = null
  }

  function setupRaven() {
    // retry 3 times
    if (times > 3) {
      console.error('load raven fail') // eslint-disable-line no-console
      clean()
    }

    if (Raven && Raven.config) {
      Raven.config('https://c11f932d316c4a2aa7b99e43cd950678@sentry.io/238843').install()
      clean()
    } else {
      times++
    }
  }

  // run a loop to setup raven and run it immediately
  loadRavenTimer = setInterval(setupRaven, 3000)
  setupRaven()
}

export function report(err, info) {
  if (__DEV__) {
    console.log(err, info) // eslint-disable-line no-console
  }
  if (Raven && Raven.captureException) {
    Raven.captureException(err, { extra: info })
    return
  }

  console.error('no raven loaded') // eslint-disable-line no-console
}

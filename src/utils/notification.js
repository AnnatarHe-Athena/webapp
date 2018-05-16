
function requestPermission() {
  return new Promise((resolve, reject) => {
    if (!('Notification' in window)) {
      reject('你浏览器太烂了，换了吧')
    }
    if (Notification.permission === 'granted') {
      resolve()
    }

    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        resolve()
      } else {
        reject('你得开推送通知，不然我没办法及时给你发消息啊')
      }
    })
  })
}

export function sendNotification(info) {
  return requestPermission().then(() => {
    const n = new Notification(info.title, { body: info.desc })
    setTimeout(() => {
      n.close()
    }, 5000)
  }).catch(err => {
    alert(`${err}, ${info.title}`)
  })
}

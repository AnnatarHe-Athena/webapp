
export function getRealSrcLink(url, type = 'bmiddle') {
  if (__DEV__) {
    return 'https://picsum.photos/400/500'
  }

  if (!url) {
    throw new Error('must provide a url')
    return
  }
  url = window.atob(url)
  if (url.indexOf('http') === 0) {
    return url
  }
  if (url.indexOf('qn://') === 0) {
    const qnBaseURL = url.replace('qn://', 'https://cdn.annatarhe.com/')
    let resultUrl = ''
    switch (type) {
    case 'bmiddle':
      resultUrl = qnBaseURL + '-thumbnails'
      break
    case 'large':
      resultUrl = qnBaseURL + '-copyrightDB'
      break
    }

    if (isWebpSupported() && !url.includes('.gif')) {
      resultUrl += '.webp'
    }
    return resultUrl
  }
  return `https://wx3.sinaimg.cn/${type}/${url}`
}

const SNSToProfileURLMap = {
  zhihu: 'https://www.zhihu.com/people/{{ id }}',
  douban: 'https://www.douban.com/people/{{ id }}/',
  weibo: 'https://weibo.com/u/{{ id }}'
}

export function getUserInfoURL(id, origin) {

  // 微博用户会有自定义子路由，这里做处理
  if (origin.indexOf('weibo') > 2 && (!/\d+/.test(id))) {
    return `https://weibo.com/${id}/profile`
  }

  for (let key in SNSToProfileURLMap) {
    if (SNSToProfileURLMap.hasOwnProperty(key)) {
      if (origin.indexOf(key) > 2 && origin.indexOf(key) < 15) {
        return SNSToProfileURLMap[key].replace('{{ id }}', id)
      }
    }
  }
  return 'javascript:;'
}

export function getTitleHref(origin) {
  if (origin && origin.indexOf('zhihu.com') > 0) {
    const _infoArr = origin.split('/')
    const id = _infoArr[_infoArr.length - 1]
    return 'https://www.zhihu.com/answer/' + id
  }
  return origin
}


let webpSupported = null
export function isWebpSupported() {
  if (webpSupported !== null) {
    return webpSupported
  }
  webpSupported = !![].map &&
  document
    .createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0
  return webpSupported
}

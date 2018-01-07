
export function getRealSrcLink(url, type = 'bmiddle') {
  if (!url) {
    throw new Error('must provide a url')
    return
  }
  url = window.atob(url)
  // if (process.env.NODE_ENV !== 'production') {
  //   return 'http://via.placeholder.com/350x150'
  // }
  if (url.indexOf('http') === 0) {
    return url
  }
  if (url.indexOf('qn://') === 0) {
    const qnBaseURL = url.replace('qn://', 'https://cdn.annatarhe.com/')
    switch (type) {
      case 'bmiddle':
        return qnBaseURL + '-thumbnails'
      case 'large':
        return qnBaseURL + '-copyrightDB'
    }
  }
  return `https://wx3.sinaimg.cn/${type}/${url}`
}

const SNSToProfileURLMap = {
  zhihu: 'https://www.zhihu.com/people/{{ id }}',
  douban: 'https://www.douban.com/people/{{ id }}/',
  weibo: 'https://weibo.com/u/{{ id }}'
}

export function getUserInfoURL(id, origin) {
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

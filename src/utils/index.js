
export function getRealSrcLink(url, type = 'bmiddle') {
  url = window.atob(url)
  // if (process.env.NODE_ENV !== 'production') {
  //   return 'http://via.placeholder.com/350x150'
  // }
  if (url.indexOf('http') === 0) {
    return url
  }
  if (url.indexOf('qn://') === 0) {
    return url.replace('qn://', 'https://cdn.annatarhe.com/') + '-copyrightDB'
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

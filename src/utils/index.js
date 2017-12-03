
export function getRealSrcLink(url, type = 'bmiddle') {
  // if (process.env.NODE_ENV !== 'production') {
  //   return 'http://via.placeholder.com/350x150'
  // }
  if (url.indexOf('http') === 0) {
    return url
  }
  if (url.indexOf('qn://') === 0) {
    return url.replace('qn://', 'https://cdn.annatarhe.com/')
  }
  return `https://wx3.sinaimg.cn/${type}/${url}`
}

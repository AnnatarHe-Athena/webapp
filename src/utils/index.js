
export function getRealSrcLink(url, type = 'bmiddle') {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://via.placeholder.com/350x150'
  }
  return url.indexOf('http') === 0 ? url : `https://wx3.sinaimg.cn/${type}/${url}`
}

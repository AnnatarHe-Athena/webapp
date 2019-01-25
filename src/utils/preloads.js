
export function preloadImage(url) {
  if (!url) {
    return
  }
  // 不支持就不预加载了吧。。。
  if (!window.requestIdleCallback) {
    return
  }
  window.requestIdleCallback(() => {
    const img = new Image()
    img.src = url
  })
}

// 考虑到我比较穷，如果所有图片都加载大图可能付不起钱，还是不调用好了。
export function preloadImages(urls) {
  urls.forEach(url => {
    preloadImage(url)
  })
}

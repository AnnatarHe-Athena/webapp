import aesjs from 'aes-js'
import { imagePrefix, prefix } from '@athena/network/apollo'

const AES_BLOCK_SIZE = 16
function base64ToHex(str: string) {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}

export function getAESIVFromUserEmail(email: string): Uint8Array {
  const result = new TextEncoder().encode(email.repeat(AES_BLOCK_SIZE))
  return result.slice(0, AES_BLOCK_SIZE)
}

export function getAESKeyFromUserEmail(email: string): Uint8Array {
  let result = ""

  for (let i = 0; i < 32; i++) {
    if (result.length > 32) {
      break
    }

    result = result + '|||' + email
  }

  return (new TextEncoder().encode(result)).slice(0, 32)
}

export function decryptData(key: Uint8Array, encryptedHex: string): string {
  const bb = base64ToHex(encryptedHex)
  const encryptedBytes = aesjs.utils.hex.toBytes(bb)
  const iv = encryptedBytes.slice(0, 16)

  const aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, AES_BLOCK_SIZE)
  const t = encryptedBytes.slice(16)
  const decryptedBytes = aesCfb.decrypt(t)
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
  return decryptedText.trim()
}

export function getRealSrcLink(url: string, type = 'large') {
  // if (__DEV__) {
  //   return 'https://picsum.photos/400/500'
  // }

  if (!url) {
    throw new Error('must provide a url')
  }
  // url = window.atob(url)
  if (url.startsWith('http')) {
    if (!url.startsWith('https')) {
      url = url.replace('http', 'https')
    }
    return url
  }
  if (url.indexOf('qn://') === 0) {
    const qnBaseURL = url.replace('qn://', 'https://cdn-lc.annatarhe.cn/')
    const resultUrl = qnBaseURL
    // switch (type) {
    //   case 'bmiddle':
    //     resultUrl = qnBaseURL + '-thumbnails'
    //   break
    //   case 'large':
    //     resultUrl = qnBaseURL + '-copyrightDB'
    //   break
    // }

    // if (isWebpSupported() && !url.includes('.gif')) {
    //   resultUrl += '.webp'
    // }
    return resultUrl
  }
  if (url.startsWith('//ci.xiaohongshu.com')) {
    return `https:${url}`
  }
  // return `https://wx3.sinaimg.cn/${type}/${url}`
  return `${imagePrefix}/${type}/${url}`
}

const SNSToProfileURLMap: any = {
  zhihu: 'https://www.zhihu.com/people/{{ id }}',
  douban: 'https://www.douban.com/people/{{ id }}/',
  weibo: 'https://weibo.com/u/{{ id }}'
}

export function getUserInfoURL(id: string, origin: string) {

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

export function getTitleHref(origin: string) {
  if (origin && origin.indexOf('zhihu.com') > 0) {
    const _infoArr = origin.split('/')
    const id = _infoArr[_infoArr.length - 1]
    return 'https://www.zhihu.com/answer/' + id
  }
  return origin
}


let webpSupported: boolean | null = null
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

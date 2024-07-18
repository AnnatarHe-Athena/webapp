import * as https from 'node:https'
import { protocol } from "electron"

function downloadWeiboImage(url: string): Promise<Response> {
  const u = new URL(url.replace('athena://', 'https://'))
  return new Promise((resolve, reject) => {
    https.get({
      host: u.host,
      path: u.pathname,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36',
        referer: 'https://weibo.com/',
      },
    }, res => {
      if ((res.statusCode ?? 500) >= 300) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`))
      }
      const body: Buffer[] = []
      res.on('data', chunk => {
        body.push(chunk)
      })
      res.on('end', () => {
        const headers = new Headers()
        Object.keys(res.headers).forEach(key => {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          headers.append(key, res.headers[key] as any)
        })

        const result = Buffer.concat(body)
        const resp = new Response(result, {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: headers,
        })

        resolve(resp)
      })
    })
  })
}


export function initWeiboImageProtocol() {
  protocol.registerSchemesAsPrivileged([{
    scheme: 'athena',
    privileges: {
      secure: true,
      supportFetchAPI: false,
      bypassCSP: true
    }
  }])
}

export function weiboImageProtocolHandler() {
  protocol.handle('athena', (req) => {
    return downloadWeiboImage(req.url)
  })
}


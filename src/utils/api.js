import 'whatwg-fetch'
import { apiServer } from '../config'

export function getUrl(url) {
    if (process.env.NODE_ENV !== 'production') {
        return '/api' + url
    }
    return apiServer + url
}

export function request(url, opts) {
    return fetch(url, Object.assign({}, opts, {
        mode: 'cors',
        credentials: 'include'
    }))
}

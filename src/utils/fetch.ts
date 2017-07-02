import 'whatwg-fetch'
import { Observable } from "rxjs/Observable"
// import "rxjs/add/observable/dom/ajax"
// import "rxjs/add/observable/dom/AjaxObservable"
import { apiServer } from '../config'
import { fetchOptions } from '../constants/interface'

export function getUrl(url: string) {
    if (process.env.NODE_ENV !== 'production') {
        return '/api' + url
    }
    return apiServer + url
}

export function request(url: string, opts?: fetchOptions) {
    const _opts = Object.assign({}, opts, {
        mode: 'cros',
        credentials: 'include'
    })
    const _request = fetch(url, _opts).then(res => res.json())
    return Observable.fromPromise(_request)
}
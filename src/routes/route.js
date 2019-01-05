import React from 'react'
import Loadable from 'react-loadable'
import Root from '../components/Root'
import Index from '../pages/index/Index'
import Welcome from '../pages/welcome/Welcome'
import { report } from '../utils/sentry'

function asyncLoadComponent(path) {
  return Loadable({
    loader: () => import('../pages/' + path),
    loading: () => <span>loading</span>
  })
}

const r = [
  { path: '/', component: Welcome },
  { path: '/category/:cid', component: Index },
  { path: '/auth', component: asyncLoadComponent('auth/Auth') },
  { path: '/profile/:id', component: asyncLoadComponent('profile/Profile') },
  { path: '/profile/:id/create', component: asyncLoadComponent('add/Index') },
  { path: '/about', component: asyncLoadComponent('info/Info') }
]

export default r

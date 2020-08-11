import React from 'react'
import Loadable from 'react-loadable'
import Index from '../pages/index/Index'
import Welcome from '../pages/welcome/Welcome'
import Spinner from 'react-spinkit'

function asyncLoadComponent(path: string) {
  return Loadable({
    loader: () => import('../pages/' + path),
    loading: (props) => {
      return (
      <div className='flex items-center justify-center h-full w-full'>
        <Spinner name='circle' />
        <span className='ml-4'>Loading...</span>
      </div>
    )
  },
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

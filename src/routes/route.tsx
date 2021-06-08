import React from 'react'
import Loadable from 'react-loadable'
import Index from '../pages/index/Index'
import Welcome from '../pages/welcome/Welcome'
import AuthPage from '../pages/auth/Auth'
import ProfilePage from '../pages/profile/Profile'
import ProfileCellCreatePage from '../pages/add/Index'
import About from '../pages/info/Info'
// import Spinner from 'react-spinkit'

function asyncLoadComponent(path: string) {
  return Loadable({
    loader: () => import('../pages/' + path),
    loading: (props) => {
      return (
      <div className='flex items-center justify-center h-full w-full'>
        {/* <Spinner name='circle' /> */}
        <span className='ml-4'>Loading...</span>
      </div>
    )
  },
  })
}

const r = [
  { path: '/', component: Welcome },
  { path: '/category/:cid', component: Index },
  { path: '/auth', component: AuthPage },
  { path: '/profile/:id', component: ProfilePage },
  { path: '/profile/:id/create', component: ProfileCellCreatePage },
  { path: '/about', component: About }
]

export default r

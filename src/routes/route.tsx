import React from 'react'
import Index from '../pages/index/Index'
import Welcome from '../pages/welcome/Welcome'
import AuthPage from '../pages/auth/Auth'
import ProfilePage from '../pages/profile/Profile'
import ProfileCellCreatePage from '../pages/add/Index'
import About from '../pages/info/Info'
import VenusPage from '../pages/venus/venus'
import PrivacyPage from '../pages/privacy/privacy'

const r = [
  { path: '/', component: Welcome },
  { path: '/category/:cid', component: Index },
  { path: '/auth', component: AuthPage },
  { path: '/profile/:id', component: ProfilePage },
  { path: '/profile/:id/venus', component: VenusPage },
  { path: '/profile/:id/create', component: ProfileCellCreatePage },
  { path: '/about', component: About },
  { path: '/privacy', component: PrivacyPage }
]

export default r

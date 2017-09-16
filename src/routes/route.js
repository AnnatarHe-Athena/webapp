import Root from '../components/Root'
import Index from '../pages/index/Index'
import Girls from '../pages/girls/Girls'

function asyncLoadComponent(path) {
  return (ns, cb) => import("../pages/" + path)
    .then(mod => mod.default)
    .then(mod => cb(null, mod))
    .catch(err => console.error(err))
}

function _isLogged() {
  return sessionStorage.getItem('athena-token') 
}

function checkAuthStatus(ns, replace) {
  if (!_isLogged()) {
    replace('/auth')
  }
}

function redirectToProfile(ns, replace) {
  const userToken = _isLogged()
  if (userToken) {
    replace(`/profile/${userToken.split('|')[0]}`)
  }
}


const routes = {
  path: '/',
  component: Root,
  indexRoute: { component: Index },
  childRoutes: [{
    path: 'category/:cid',
    component: Index,
    onEnter: checkAuthStatus
  }, {
    path: 'auth',
    getComponent: asyncLoadComponent("auth/Auth"),
    onEnter: redirectToProfile
  }, {
    path: 'profile/:id',
    getComponent: asyncLoadComponent("profile/Profile"),
    onEnter: checkAuthStatus
   }, {
    path: 'profile/:id/create',
    getComponent: asyncLoadComponent("add/Index"),
    onEnter: checkAuthStatus
 }]
}

export default routes

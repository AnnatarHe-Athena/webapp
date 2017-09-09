import Root from '../components/Root'
import Index from '../pages/index/Index'
import Girls from '../pages/girls/Girls'

const asyncLoadComponent = path => (ns, cb) => import("../pages/" + path)
.then(mod => mod.default)
.then(mod => cb(null, mod))
.catch(err => console.error(err))

const routes = {
  path: '/',
  component: Root,
  indexRoute: { component: Index },
  childRoutes: [{
    path: 'category/:cid',
    component: Index
  }, {
    path: 'auth',
    getComponent: asyncLoadComponent("auth/Auth")
  }, {
    path: 'profile/:id',
    getComponent: asyncLoadComponent("profile/Profile")
   }, {
    path: 'profile/:id/create',
    getComponent: asyncLoadComponent("add/Index")
 }]
}

export default routes

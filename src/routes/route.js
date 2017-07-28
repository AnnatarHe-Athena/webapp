import Index from '../pages/index/Index'
import Girls from '../pages/girls/Girls'

const routes = [{
    path: '/',
    strict: true,
    exact: true,
    component: Index,
}, {
    path: '/girls',
    strict: true,
    exact: true,
    component: Girls,
}]

export default routes

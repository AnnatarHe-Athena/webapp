import Root from '../components/Root'
import Index from '../pages/index/Index'
import Girls from '../pages/girls/Girls'

// const routes = [{
//     path: '/',
//     strict: true,
//     exact: true,
//     component: Index,
// }, {
//     path: '/girls',
//     strict: true,
//     exact: true,
//     component: Girls,
// }]

const routes = {
    path: '/',
    component: Root,
    indexRoute: { component: Index },
    childRoutes: [
        { path: 'profile', component: Girls }
    ]
}

export default routes

import { RouteConfig } from "react-router-config";
import Index from "../pages/index/index"
import Cells from '../pages/girls/cells'
import Categories from '../pages/girls/categories'

const routes: [RouteConfig] = [{
    path: '/',
    strict: true,
    exact: true,
    component: Index,
}, {
    path: '/girls',
    strict: true,
    exact: true,
    component: Categories,
}, {
    path: '/girls/:category',
    component: Cells
}]

export default routes
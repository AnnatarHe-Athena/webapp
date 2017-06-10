import { createEpicMiddleware } from "redux-observable"
import rootEpic from './root'

const epicMiddleware = createEpicMiddleware(rootEpic)


if (module['hot']) {
    module['hot'].accept('../epics/index', () => {
        const rootEpic = require('../epics/index').default
        epicMiddleware.replaceEpic(rootEpic)
    })
}
export default epicMiddleware
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from "../reducers/index"
import rootEpic from '../epics/index'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose

export default createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(rootEpic)
    )
)
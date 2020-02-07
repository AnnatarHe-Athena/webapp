import { createStore, compose, applyMiddleware, Middleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from '../reducers/index'
import sagas from '../sagas/index'

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose

const sagaMiddleware = createSagaMiddleware()

const middlewares: Middleware[] = [
  sagaMiddleware
]

if (__DEV__) {
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(sagaMiddleware, ...middlewares)
  )
)

sagaMiddleware.run(sagas)

export default store

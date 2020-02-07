import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from '../reducers/index'
import sagas from '../sagas/index'

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(logger, sagaMiddleware)
  )
)

sagaMiddleware.run(sagas)

export default store

import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import rootReducer from '../reducers/index'
import sagas from '../sagas/index'
import { apolloClient } from '../setup/apollo'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  fromJS({}),
  composeEnhancers(
    applyMiddleware(sagaMiddleware, apolloClient.middleware(), routerMiddleware(browserHistory))
  )
)

sagaMiddleware.run(sagas)

export default store

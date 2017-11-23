import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'
import profile from './profile'
import app from './app'

export default combineReducers({
  routing: routerReducer,
  app, profile
})

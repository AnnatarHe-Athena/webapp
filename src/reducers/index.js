import { combineReducers } from 'redux-immutable'
import profile from './profile'
import app from './app'

export default combineReducers({
  app, profile
})

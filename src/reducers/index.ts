import { combineReducers } from 'redux-immutable'
import girls from './girls'
import app from './app'

export default combineReducers({
    girls, app
})
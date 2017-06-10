import { combineEpics } from 'redux-observable'
import categoriesEpic from './categories'
import app from './app'
import girls from './girls'

export default combineEpics(
    categoriesEpic, app, girls
)
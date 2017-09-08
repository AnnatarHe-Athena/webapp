import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'
import { apolloClient } from '../setup/apollo'
import profile from './profile'
import app from './app'

export default combineReducers({
    routing: routerReducer,
    apollo: apolloClient.reducer(),
    app, profile
})

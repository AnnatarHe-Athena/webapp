import { combineReducers } from 'redux'
import profile, { ProfileStoreType } from './profile'
import app, { AppStoreType } from './app'

export type AppStore = {
  app: AppStoreType,
  profile: ProfileStoreType
}

export default combineReducers({
  app, profile
})

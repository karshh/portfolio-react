import { combineReducers } from 'redux'
import timeReducer from './time'

export * from './types'

export default combineReducers({
  time: timeReducer
})

import { combineReducers } from 'redux'
import { reducer as timeReducer } from './time'
import { reducer as weatherReducer } from './weather'

export * from './types'

export const reducer = combineReducers({
  time: timeReducer,
  weather: weatherReducer
})

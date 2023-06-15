import { combineReducers } from 'redux'
import { reducer as timeReducer } from './time'
import { reducer as weatherReducer } from './weather'
import { reducer as newsReducer } from './news'

export * from './types'

export const reducer = combineReducers({
  time: timeReducer,
  weather: weatherReducer,
  news: newsReducer
})

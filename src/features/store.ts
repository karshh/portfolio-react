import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'

export const store = configureStore({ reducer })

export const state = store.getState()
export type AppState = typeof state

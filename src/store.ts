import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'src/features'

export const store = configureStore({ reducer })

export const state = store.getState()
export type AppState = typeof state
export type AppDispatch = typeof store.dispatch

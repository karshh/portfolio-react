import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type TimeState } from './types'

const initialState: TimeState = {
  time: undefined
}

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    timeStarted: () => {},
    timeSucceeded: (state: TimeState, action: PayloadAction<Date>) => {
      state.time = action.payload
    },
    timeFailed: () => {}
  }
})

export const { timeStarted, timeSucceeded, timeFailed } = timeSlice.actions
export default timeSlice.reducer

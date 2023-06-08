import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type TimeState, ApiLoadStatus, type TimeZone } from './types'
import axios from 'axios'

const initialState: TimeState = {
  unixtime: -1,
  timezone: undefined,
  status: ApiLoadStatus.LOADING
}

interface TimeResponse {
  unixtime: number
  abbreviation: TimeZone
}

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTime.pending, (state, _) => {
        state.status = ApiLoadStatus.LOADING
      })
      .addCase(fetchTime.fulfilled, (state, action) => {
        state.unixtime = action.payload.unixtime
        state.timezone = action.payload.abbreviation
        state.status = ApiLoadStatus.SUCCESS
      })
      .addCase(fetchTime.rejected, (state, _) => {
        state.status = ApiLoadStatus.FAILED
      })
  }
})

export const fetchTime = createAsyncThunk('time/getTime', async () => {
  const response = await axios.get<TimeResponse>('http://worldtimeapi.org/api/timezone/America/Edmonton')
  return response.data
})

export const reducer = timeSlice.reducer

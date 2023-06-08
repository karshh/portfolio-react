import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ApiLoadStatus, type WeatherState } from './types'
import axios from 'axios'

const initialState: WeatherState = {
  temperature: undefined,
  status: ApiLoadStatus.LOADING
}

interface WeatherResponse {
  current_weather: {
    temperature: number
  }
}

const weatherSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, _) => {
        state.status = ApiLoadStatus.LOADING
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.temperature = action.payload.current_weather.temperature
        state.status = ApiLoadStatus.SUCCESS
      })
      .addCase(fetchWeather.rejected, (state, _) => {
        state.status = ApiLoadStatus.FAILED
      })
  }
})

export const fetchWeather = createAsyncThunk('weather/getWeather', async () => {
  const response = await axios.get<WeatherResponse>('https://api.open-meteo.com/v1/forecast?latitude=51.1315&longitude=-114.0105&current_weather=true')
  return response.data
})

export const reducer = weatherSlice.reducer

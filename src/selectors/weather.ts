import { type WeatherState } from 'src/features'
import { type AppState } from 'src/store'

export const getWeather = (state: AppState): WeatherState => state.weather

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApiLoadStatus, type WeatherState } from 'src/features'
import { fetchWeather } from 'src/features/weather'
import { getWeather } from 'src/selectors'
import { type AppDispatch } from 'src/store'
import loading from 'src/assets/loading.gif'

const Weather = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()
  const weather: WeatherState = useSelector(getWeather)

  useEffect(() => {
    setTimeout(() => {
      void dispatch(fetchWeather())
    }, 3000)
  }, [])

  switch (weather.status) {
    case ApiLoadStatus.SUCCESS:
      return weather.temperature === undefined ? <></> : <span>{weather.temperature}&nbsp;&deg;C</span>
    case ApiLoadStatus.FAILED:
      return <img src={loading} alt='loading' />
    case ApiLoadStatus.LOADING:
      return <img src={loading} alt='loading' />
  }
}

export default Weather

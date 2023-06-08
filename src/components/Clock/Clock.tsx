
import { useEffect } from 'react'
import { format } from 'date-fns'
import { getTime } from 'src/selectors'
import { type AppDispatch } from 'src/store'
import { type TimeState, ApiLoadStatus } from 'src/features'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTime } from 'src/features/time'
import loading from 'src/assets/loading.gif'

const Clock = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()
  const time: TimeState = useSelector(getTime)

  useEffect(() => {
    setTimeout(() => {
      void dispatch(fetchTime())
    }, 5000)
  }, [])

  switch (time.status) {
    case ApiLoadStatus.SUCCESS:
      return time.unixtime < 0 ? <></> : <span>{ format(time.unixtime, 'h:mm a ') } { time.timezone ?? '' }</span>
    case ApiLoadStatus.FAILED:
      return <img src={loading} alt='loading' />
    case ApiLoadStatus.LOADING:
      return <img src={loading} alt='loading' />
  }
}

export default Clock

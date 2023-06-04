import { type AppState } from 'src/features/store'
import { type TimeState } from 'src/features/reducers'

export const getTime = (state: AppState): TimeState => state.time

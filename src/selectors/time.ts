import { type TimeState } from 'src/features'
import { type AppState } from 'src/store'

export const getTime = (state: AppState): TimeState => state.time

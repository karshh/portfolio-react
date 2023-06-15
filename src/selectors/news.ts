import { type NewsState } from 'src/features'
import { type AppState } from 'src/store'

export const getNews = (state: AppState): NewsState => state.news

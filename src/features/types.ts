export enum ApiLoadStatus {
  LOADING,
  SUCCESS,
  FAILED
}

export enum TimeZone {
  MDT,
  MST
}

interface AbstractState {
  status: ApiLoadStatus
}

export interface TimeState extends AbstractState {
  unixtime: number
  timezone?: TimeZone
}

export interface WeatherState extends AbstractState {
  temperature?: number
}

export interface NewsItem {
  title: string
  pubdate: Date
  linkUrl: URL
}

export interface NewsState extends AbstractState {
  newsItems: NewsItem[]
}

export enum ApiLoadStatus {
  LOADING,
  SUCCESS,
  FAILED
}

export enum TimeZone {
  MDT,
  MST
}

export interface TimeState {
  unixtime: number
  timezone?: TimeZone
  status: ApiLoadStatus
}

export interface WeatherState {
  temperature?: number
  status: ApiLoadStatus
}

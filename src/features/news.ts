import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ApiLoadStatus, type NewsState } from './types'
import axios from 'axios'

const initialState: NewsState = {
  newsItems: [],
  status: ApiLoadStatus.LOADING
}

interface NewsItemResponse {
  title: string
  pubdate: string
  link: {
    url: string
  }
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state, _) => {
        state.status = ApiLoadStatus.LOADING
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsItems = action.payload
          .map(item => ({
            title: item.title,
            pubdate: new Date(item.pubdate),
            linkUrl: new URL(item.link.url)
          }))
          .slice(0, 11)
        state.status = ApiLoadStatus.SUCCESS
      })
      .addCase(fetchNews.rejected, (state, _) => {
        state.status = ApiLoadStatus.FAILED
      })
  }
})

export const fetchNews = createAsyncThunk('news/getNews', async () => {
  const response = await axios.get<NewsItemResponse[]>('https://data.calgary.ca/resource/3x6m-4vs7.json')
  return response.data
})

export const reducer = newsSlice.reducer

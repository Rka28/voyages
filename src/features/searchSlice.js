import { createSlice } from '@reduxjs/toolkit'
import { thunk, trackStatus } from '../api'

export const searchDestinations = thunk('search/run', ({ keyword, region }) => {
  const params = new URLSearchParams()
  if (keyword) params.set('keyword', keyword)
  if (region) params.set('region', region)
  return { path: `destinations/search.php?${params}` }
})

const searchSlice = createSlice({
  name: 'search',
  initialState: { results: [], active: false, loading: false, error: null },
  reducers: {
    clearSearch(state) {
      state.results = []
      state.active = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchDestinations.fulfilled, (state, { payload }) => {
      state.results = payload
      state.active = true
    })
    trackStatus(builder, searchDestinations)
  },
})

export const { clearSearch } = searchSlice.actions
export default searchSlice.reducer

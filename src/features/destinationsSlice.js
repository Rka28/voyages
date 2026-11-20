import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { thunk, trackStatus } from '../api'

export const fetchRegions = thunk('destinations/fetchRegions', () => ({
  path: 'regions/index.php',
}))

export const fetchDestinations = thunk('destinations/fetchAll', () => ({
  path: 'destinations/index.php',
}))

export const fetchDestination = thunk('destinations/fetchOne', (slug) => ({
  path: `destinations/show.php?slug=${slug}`,
}))

export const fetchByRegion = thunk('destinations/fetchByRegion', (region) => ({
  path: `destinations/by-region.php?region=${region}`,
}))

export const createDestination = thunk('destinations/create', (body) => ({
  path: 'destinations/store.php',
  method: 'POST',
  body,
}))

export const deleteDestination = thunk('destinations/delete', (id) => ({
  path: 'destinations/delete.php',
  method: 'POST',
  body: { id },
}))

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState: { list: [], regions: [], current: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegions.fulfilled, (state, { payload }) => {
        state.regions = payload
      })
      .addCase(fetchDestination.pending, (state) => {
        state.current = null
      })
      .addCase(fetchDestination.fulfilled, (state, { payload }) => {
        state.current = payload
      })
      .addCase(deleteDestination.fulfilled, (state, { meta }) => {
        state.list = state.list.filter((d) => d.id !== meta.arg)
      })
      .addMatcher(isFulfilled(fetchDestinations, fetchByRegion), (state, { payload }) => {
        state.list = payload
      })
    trackStatus(builder, fetchDestinations, fetchDestination, fetchByRegion, createDestination, deleteDestination)
  },
})

export default destinationsSlice.reducer

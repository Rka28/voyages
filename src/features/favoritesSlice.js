import { createSlice } from '@reduxjs/toolkit'
import { thunk, trackStatus } from '../api'

export const fetchFavorites = thunk('favorites/fetchAll', () => ({ path: 'favorites/index.php' }))

export const addFavorite = thunk('favorites/add', (body) => ({
  path: 'favorites/store.php',
  method: 'POST',
  body,
}))

export const removeFavorite = thunk('favorites/remove', (destinationId) => ({
  path: 'favorites/delete.php',
  method: 'POST',
  body: { destinationId },
}))

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, { payload }) => {
        state.list = payload
      })
      .addCase(addFavorite.fulfilled, (state, { meta }) => {
        const { destinationId, title, image } = meta.arg
        state.list.push({ destination_id: destinationId, destination_title: title, destination_image: image })
      })
      .addCase(removeFavorite.fulfilled, (state, { meta }) => {
        state.list = state.list.filter((f) => String(f.destination_id) !== String(meta.arg))
      })
    trackStatus(builder, fetchFavorites, addFavorite, removeFavorite)
  },
})

export default favoritesSlice.reducer

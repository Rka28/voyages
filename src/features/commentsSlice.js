import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import { api, thunk, trackStatus } from '../api'

export const fetchCommentsByDestination = thunk('comments/fetchByDestination', (id) => ({
  path: `comments/by-destination.php?destination_id=${id}`,
}))

export const fetchMyComments = thunk('comments/fetchMine', () => ({ path: 'comments/by-user.php' }))

export const fetchAllComments = createAsyncThunk('comments/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const destinations = await api('destinations/index.php')
    const lists = await Promise.all(
      destinations.map(async (d) => {
        const comments = await api(`comments/by-destination.php?destination_id=${d.id}`)
        return comments.map((c) => ({ ...c, destination_name: d.name }))
      }),
    )
    return lists.flat()
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const addComment = thunk('comments/add', (body) => ({
  path: 'comments/store.php',
  method: 'POST',
  body,
}))

export const deleteComment = thunk('comments/delete', (id) => ({
  path: 'comments/delete.php',
  method: 'POST',
  body: { id },
}))

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteComment.fulfilled, (state, { meta }) => {
        state.list = state.list.filter((c) => c.id !== meta.arg)
      })
      .addMatcher(
        isFulfilled(fetchCommentsByDestination, fetchMyComments, fetchAllComments),
        (state, { payload }) => {
          state.list = payload
        },
      )
    trackStatus(builder, fetchCommentsByDestination, fetchMyComments, fetchAllComments, addComment, deleteComment)
  },
})

export default commentsSlice.reducer

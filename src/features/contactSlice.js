import { createSlice } from '@reduxjs/toolkit'
import { thunk, trackStatus } from '../api'

export const sendContact = thunk('contact/send', (body) => ({
  path: 'contact/store.php',
  method: 'POST',
  body,
}))

export const fetchContacts = thunk('contact/fetchAll', () => ({ path: 'contact/index.php' }))

const contactSlice = createSlice({
  name: 'contact',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      state.list = payload
    })
    trackStatus(builder, sendContact, fetchContacts)
  },
})

export default contactSlice.reducer

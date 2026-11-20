import { createSlice } from '@reduxjs/toolkit'
import { thunk, trackStatus } from '../api'

export const fetchUsers = thunk('users/fetchAll', () => ({ path: 'users/index.php' }))

export const adminChangePassword = thunk('users/adminChangePassword', (body) => ({
  path: 'users/change-password.php',
  method: 'POST',
  body,
}))

export const updateProfile = thunk('users/updateProfile', (body) => ({
  path: 'profile/update.php',
  method: 'POST',
  body,
}))

export const changePassword = thunk('users/changePassword', (body) => ({
  path: 'profile/change-password.php',
  method: 'POST',
  body,
}))

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.list = payload
    })
    trackStatus(builder, fetchUsers, adminChangePassword, updateProfile, changePassword)
  },
})

export default usersSlice.reducer

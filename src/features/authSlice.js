import { createSlice } from '@reduxjs/toolkit'
import { thunk, trackStatus } from '../api'
import { updateProfile } from './usersSlice'

const saved = JSON.parse(localStorage.getItem('auth') || 'null')

const toUser = (u) =>
  u && { ...u, firstName: u.firstName ?? u.first_name, lastName: u.lastName ?? u.last_name }

export const loginUser = thunk('auth/login', (body) => ({
  path: 'auth/login.php',
  method: 'POST',
  body,
}))

export const registerUser = thunk('auth/register', (body) => ({
  path: 'auth/register.php',
  method: 'POST',
  body,
}))

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: saved?.token ?? null,
    user: saved?.user ?? null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { accessToken, ...user } = payload
        state.token = accessToken
        state.user = toUser(user)
      })
      .addCase(updateProfile.fulfilled, (state, { payload, meta }) => {
        state.user = toUser({ ...state.user, ...meta.arg, ...payload.user })
      })
    trackStatus(builder, loginUser, registerUser)
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

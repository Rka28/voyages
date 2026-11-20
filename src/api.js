import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL || 'https://qyklv804.webmo.me'

export async function api(path, { method = 'GET', body, token } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (token) headers['X-Auth-Token'] = token

  const res = await fetch(`${API_URL}/api/${path}`, {
    method,
    headers,
    body: body && JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))

  if (!res.ok || data.success === false) {
    throw new Error(data.message || data.error || 'Erreur serveur')
  }
  return data.data ?? data
}

export const thunk = (type, request) =>
  createAsyncThunk(type, async (arg, { getState, rejectWithValue }) => {
    try {
      const { path, ...options } = request(arg)
      return await api(path, { ...options, token: getState().auth.token })
    } catch (e) {
      return rejectWithValue(e.message)
    }
  })

export const trackStatus = (builder, ...thunks) =>
  builder
    .addMatcher(isPending(...thunks), (state) => {
      state.loading = true
      state.error = null
    })
    .addMatcher(isFulfilled(...thunks), (state) => {
      state.loading = false
    })
    .addMatcher(isRejected(...thunks), (state, action) => {
      state.loading = false
      state.error = action.payload
    })

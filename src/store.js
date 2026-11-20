import { configureStore } from '@reduxjs/toolkit'
import auth from './features/authSlice'
import comments from './features/commentsSlice'
import contact from './features/contactSlice'
import destinations from './features/destinationsSlice'
import favorites from './features/favoritesSlice'
import search from './features/searchSlice'
import theme from './features/themeSlice'
import users from './features/usersSlice'

export const store = configureStore({
  reducer: { auth, comments, contact, destinations, favorites, search, theme, users },
})

store.subscribe(() => {
  const { auth, theme } = store.getState()
  localStorage.setItem('auth', JSON.stringify({ token: auth.token, user: auth.user }))
  localStorage.setItem('theme', theme)
})

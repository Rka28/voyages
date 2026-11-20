import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import AdminComments from './pages/admin/AdminComments'
import AdminContacts from './pages/admin/AdminContacts'
import AdminDestinations from './pages/admin/AdminDestinations'
import AdminUsers from './pages/admin/AdminUsers'
import Dashboard from './pages/admin/Dashboard'
import Contact from './pages/Contact'
import DestinationDetail from './pages/DestinationDetail'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Region from './pages/Region'
import Register from './pages/Register'

export default function App() {
  const theme = useSelector((state) => state.theme)

  useEffect(() => {
    document.documentElement.dataset.bsTheme = theme
  }, [theme])

  return (
    <>
      <Header />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regions/:slug" element={<Region />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoute admin />}>
            <Route path="/admin" element={<Dashboard />}>
              <Route index element={<Navigate to="contacts" replace />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="destinations" element={<AdminDestinations />} />
              <Route path="comments" element={<AdminComments />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  )
}

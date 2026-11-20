import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'
import { toggleTheme } from '../features/themeSlice'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const theme = useSelector((state) => state.theme)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar expand="md" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          ✈️ Voyages
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Destinations
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
            {user?.role === 'admin' && (
              <Nav.Link as={NavLink} to="/admin">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-md-center gap-2">
            <Button variant="outline-secondary" size="sm" onClick={() => dispatch(toggleTheme())}>
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
            {user ? (
              <>
                <Nav.Link as={NavLink} to="/profile">
                  {user.avatar && <Image src={user.avatar} roundedCircle width={28} className="me-2" />}
                  {user.username}
                </Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Connexion
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Inscription
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

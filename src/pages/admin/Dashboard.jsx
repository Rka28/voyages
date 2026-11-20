import { Nav } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

const links = [
  ['contacts', 'Contacts'],
  ['users', 'Utilisateurs'],
  ['destinations', 'Destinations'],
  ['comments', 'Commentaires'],
]

export default function Dashboard() {
  return (
    <>
      <h1 className="mb-4">Administration</h1>
      <Nav variant="tabs" className="mb-4">
        {links.map(([to, label]) => (
          <Nav.Item key={to}>
            <Nav.Link as={NavLink} to={to}>
              {label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Outlet />
    </>
  )
}

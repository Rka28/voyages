import { useEffect, useState } from 'react'
import { Alert, Badge, Button, Image, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import PasswordModal from '../../components/PasswordModal'
import { adminChangePassword, fetchUsers } from '../../features/usersSlice'

export default function AdminUsers() {
  const dispatch = useDispatch()
  const { list, error } = useSelector((state) => state.users)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const submitPassword = async (body) =>
    adminChangePassword.fulfilled.match(await dispatch(adminChangePassword({ user_id: selected.id, ...body })))

  return (
    <>
      {error && !selected && <Alert variant="danger">{error}</Alert>}
      <Table striped hover responsive className="align-middle">
        <thead>
          <tr>
            <th></th>
            <th>Utilisateur</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u.id}>
              <td>{u.avatar && <Image src={u.avatar} roundedCircle width={36} />}</td>
              <td>{u.username}</td>
              <td>
                {u.first_name} {u.last_name}
              </td>
              <td>{u.email}</td>
              <td>
                <Badge bg={u.role === 'admin' ? 'primary' : 'secondary'}>{u.role}</Badge>
              </td>
              <td className="text-end">
                <Button size="sm" variant="outline-secondary" onClick={() => setSelected(u)}>
                  Mot de passe
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selected && (
        <PasswordModal
          title={`Mot de passe de ${selected.username}`}
          onSubmit={submitPassword}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}

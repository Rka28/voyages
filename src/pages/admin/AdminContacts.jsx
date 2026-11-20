import { useEffect } from 'react'
import { Alert, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContacts } from '../../features/contactSlice'

export default function AdminContacts() {
  const dispatch = useDispatch()
  const { list, error } = useSelector((state) => state.contact)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Sujet</th>
          <th>Message</th>
          <th>Membre</th>
        </tr>
      </thead>
      <tbody>
        {list.map((c) => (
          <tr key={c.id}>
            <td>{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.subject}</td>
            <td>{c.message}</td>
            <td>{c.user_id ? `#${c.user_id}` : '—'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

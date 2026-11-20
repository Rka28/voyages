import { useEffect, useState } from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmModal from '../../components/ConfirmModal'
import { deleteComment, fetchAllComments } from '../../features/commentsSlice'

export default function AdminComments() {
  const dispatch = useDispatch()
  const { list, error } = useSelector((state) => state.comments)
  const [toDelete, setToDelete] = useState(null)

  useEffect(() => {
    dispatch(fetchAllComments())
  }, [dispatch])

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Date</th>
            <th>Destination</th>
            <th>Auteur</th>
            <th>Commentaire</th>
            <th>Note</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id}>
              <td>{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
              <td>{c.destination_name}</td>
              <td>{c.username ?? `#${c.user_id}`}</td>
              <td>{c.content}</td>
              <td className="text-warning">{c.rating > 0 && '★'.repeat(c.rating)}</td>
              <td className="text-end">
                <Button size="sm" variant="outline-danger" onClick={() => setToDelete(c)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmModal
        show={!!toDelete}
        title="Supprimer le commentaire"
        onConfirm={() => dispatch(deleteComment(toDelete.id))}
        onClose={() => setToDelete(null)}
      >
        Supprimer ce commentaire ?
      </ConfirmModal>
    </>
  )
}

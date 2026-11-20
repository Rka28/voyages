import { ListGroup } from 'react-bootstrap'

export default function Comments({ comments, showDestination = false }) {
  if (!comments.length) return <p className="text-body-secondary">Aucun commentaire.</p>

  return (
    <ListGroup>
      {comments.map((c) => (
        <ListGroup.Item key={c.id}>
          <div className="d-flex justify-content-between">
            <strong>{showDestination ? c.destination_name || c.destination_id : c.username}</strong>
            {c.rating > 0 && <span className="text-warning">{'★'.repeat(c.rating)}</span>}
          </div>
          <p className="mb-1">{c.content}</p>
          <small className="text-body-secondary">{new Date(c.created_at).toLocaleDateString('fr-FR')}</small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

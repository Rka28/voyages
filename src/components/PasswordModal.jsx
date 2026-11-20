import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import useForm from '../hooks/useForm'

export default function PasswordModal({ title, onSubmit, onClose, withCurrent = false }) {
  const { loading, error } = useSelector((state) => state.users)
  const [form, onChange] = useForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { newPassword, confirmPassword } = form
    setDone(await onSubmit(withCurrent ? form : { newPassword, confirmPassword }))
  }

  return (
    <Modal show onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {done && <Alert variant="success">Mot de passe modifié.</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {withCurrent && (
            <Form.Group className="mb-3">
              <Form.Label>Mot de passe actuel</Form.Label>
              <Form.Control type="password" name="currentPassword" value={form.currentPassword} onChange={onChange} required />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Nouveau mot de passe</Form.Label>
            <Form.Control type="password" name="newPassword" value={form.newPassword} onChange={onChange} required />
            <Form.Text>8 caractères min., une majuscule, une minuscule, un chiffre et un caractère spécial.</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmation</Form.Label>
            <Form.Control type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
          <Button type="submit" disabled={loading}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

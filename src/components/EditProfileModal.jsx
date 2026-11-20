import { Alert, Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { avatarUrl } from '../avatar'
import { updateProfile } from '../features/usersSlice'
import useForm from '../hooks/useForm'

export default function EditProfileModal({ onClose }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { loading, error } = useSelector((state) => state.users)
  const [form, onChange, setForm] = useForm({
    username: user.username,
    email: user.email,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    gender: user.gender ?? '',
    avatar: user.avatar ?? '',
  })

  const newAvatar = () => setForm({ ...form, avatar: avatarUrl(Math.random().toString(36).slice(2)) })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(updateProfile(form))
    if (updateProfile.fulfilled.match(result)) onClose()
  }

  return (
    <Modal show onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier mon profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="text-center mb-3">
            {form.avatar && <Image src={form.avatar} roundedCircle width={90} className="d-block mx-auto mb-2" />}
            <Button size="sm" variant="outline-secondary" onClick={newAvatar}>
              Nouvel avatar
            </Button>
          </div>
          <Row className="g-3 mb-3">
            <Col sm={6}>
              <Form.Label>Prénom</Form.Label>
              <Form.Control name="firstName" value={form.firstName} onChange={onChange} required />
            </Col>
            <Col sm={6}>
              <Form.Label>Nom</Form.Label>
              <Form.Control name="lastName" value={form.lastName} onChange={onChange} required />
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control name="username" value={form.username} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={onChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Select name="gender" value={form.gender} onChange={onChange}>
              <option value="">Non précisé</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

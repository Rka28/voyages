import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { avatarUrl } from '../avatar'
import { registerUser } from '../features/authSlice'
import useForm from '../hooks/useForm'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  const [form, onChange] = useForm({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(registerUser({ ...form, avatar: avatarUrl(form.username) }))
    if (registerUser.fulfilled.match(result)) navigate('/login', { state: { registered: true } })
  }

  return (
    <Card className="auth-card mx-auto shadow-sm">
      <Card.Body className="p-4">
        <h1 className="h3 mb-4">Inscription</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
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
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Genre</Form.Label>
            <Form.Select name="gender" value={form.gender} onChange={onChange}>
              <option value="">Non précisé</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="w-100" disabled={loading}>
            Créer mon compte
          </Button>
        </Form>
        <p className="mt-3 mb-0 text-center">
          Déjà inscrit ? <Link to="/login">Connexion</Link>
        </p>
      </Card.Body>
    </Card>
  )
}

import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../features/authSlice'
import useForm from '../hooks/useForm'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error } = useSelector((state) => state.auth)
  const [form, onChange] = useForm({ username: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginUser(form))
    if (loginUser.fulfilled.match(result)) navigate('/profile')
  }

  return (
    <Card className="auth-card mx-auto shadow-sm">
      <Card.Body className="p-4">
        <h1 className="h3 mb-4">Connexion</h1>
        {location.state?.registered && <Alert variant="success">Compte créé, vous pouvez vous connecter.</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control name="username" value={form.username} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={onChange} required />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={loading}>
            Se connecter
          </Button>
        </Form>
        <p className="mt-3 mb-0 text-center">
          Pas de compte ? <Link to="/register">Inscription</Link>
        </p>
      </Card.Body>
    </Card>
  )
}

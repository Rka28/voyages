import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { sendContact } from '../features/contactSlice'
import useForm from '../hooks/useForm'

export default function Contact() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { loading, error } = useSelector((state) => state.contact)
  const [sent, setSent] = useState(false)

  const empty = {
    name: user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.username : '',
    email: user?.email ?? '',
    subject: '',
    message: '',
  }
  const [form, onChange, setForm] = useForm(empty)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(sendContact(user ? { ...form, user_id: user.id } : form))
    if (sendContact.fulfilled.match(result)) {
      setSent(true)
      setForm(empty)
    }
  }

  return (
    <Card className="auth-card mx-auto shadow-sm">
      <Card.Body className="p-4">
        <h1 className="h3 mb-4">Contact</h1>
        {sent && <Alert variant="success">Message envoyé, merci !</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control name="name" value={form.name} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sujet</Form.Label>
            <Form.Control name="subject" value={form.subject} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={5} name="message" value={form.message} onChange={onChange} required />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={loading}>
            Envoyer
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

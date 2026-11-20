import { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmModal from '../../components/ConfirmModal'
import {
  createDestination,
  deleteDestination,
  fetchDestinations,
  fetchRegions,
} from '../../features/destinationsSlice'
import useForm from '../../hooks/useForm'

const fields = [
  ['name', 'Nom'],
  ['slug', 'Slug'],
  ['capital', 'Capitale'],
  ['image', 'Image (URL)'],
  ['lat', 'Latitude'],
  ['long', 'Longitude'],
]

function DestinationFormModal({ regions, onClose }) {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.destinations)
  const [form, onChange] = useForm({
    name: '',
    slug: '',
    region_id: '',
    capital: '',
    description: '',
    image: '',
    lat: '',
    long: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(createDestination({ ...form, region_id: Number(form.region_id) }))
    if (createDestination.fulfilled.match(result)) {
      dispatch(fetchDestinations())
      onClose()
    }
  }

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle destination</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row className="g-3">
            {fields.map(([name, label]) => (
              <Col sm={6} key={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control name={name} value={form[name]} onChange={onChange} required />
              </Col>
            ))}
            <Col sm={6}>
              <Form.Label>Région</Form.Label>
              <Form.Select name="region_id" value={form.region_id} onChange={onChange} required>
                <option value="">Choisir…</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} name="description" value={form.description} onChange={onChange} required />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            Créer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default function AdminDestinations() {
  const dispatch = useDispatch()
  const { list, regions, error } = useSelector((state) => state.destinations)
  const user = useSelector((state) => state.auth.user)
  const [creating, setCreating] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  useEffect(() => {
    dispatch(fetchDestinations())
    dispatch(fetchRegions())
  }, [dispatch])

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => setCreating(true)}>+ Ajouter une destination</Button>
      </div>
      {error && !creating && <Alert variant="danger">{error}</Alert>}

      <Table striped hover responsive className="align-middle">
        <thead>
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Capitale</th>
            <th>Région</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((d) => (
            <tr key={d.id}>
              <td>
                <img src={d.image} alt="" className="thumb rounded" />
              </td>
              <td>{d.name}</td>
              <td>{d.capital}</td>
              <td>{d.region_name}</td>
              <td className="text-end">
                {String(d.created_by) === String(user.id) && (
                  <Button size="sm" variant="outline-danger" onClick={() => setToDelete(d)}>
                    Supprimer
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {creating && <DestinationFormModal regions={regions} onClose={() => setCreating(false)} />}

      <ConfirmModal
        show={!!toDelete}
        title="Supprimer la destination"
        onConfirm={() => dispatch(deleteDestination(toDelete.id))}
        onClose={() => setToDelete(null)}
      >
        Supprimer définitivement {toDelete?.name} ?
      </ConfirmModal>
    </>
  )
}

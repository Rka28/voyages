import { useEffect } from 'react'
import { Badge, Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DestinationList from '../components/DestinationList'
import { fetchDestinations, fetchRegions } from '../features/destinationsSlice'
import { clearSearch, searchDestinations } from '../features/searchSlice'
import useForm from '../hooks/useForm'

export default function Home() {
  const dispatch = useDispatch()
  const { list, regions, loading, error } = useSelector((state) => state.destinations)
  const search = useSelector((state) => state.search)
  const [form, onChange, setForm] = useForm({ keyword: '', region: '' })

  useEffect(() => {
    dispatch(fetchDestinations())
    dispatch(fetchRegions())
    dispatch(clearSearch())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.keyword || form.region) dispatch(searchDestinations(form))
  }

  const reset = () => {
    setForm({ keyword: '', region: '' })
    dispatch(clearSearch())
  }

  return (
    <>
      <h1 className="mb-4">Destinations</h1>

      <Form onSubmit={handleSubmit} className="mb-3">
        <Row className="g-2">
          <Col md={6}>
            <Form.Control name="keyword" value={form.keyword} onChange={onChange} placeholder="Pays, capitale…" />
          </Col>
          <Col md={3}>
            <Form.Select name="region" value={form.region} onChange={onChange}>
              <option value="">Toutes les régions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3} className="d-flex gap-2">
            <Button type="submit" className="flex-grow-1">
              Rechercher
            </Button>
            {search.active && (
              <Button variant="outline-secondary" onClick={reset}>
                Effacer
              </Button>
            )}
          </Col>
        </Row>
      </Form>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {regions.map((r) => (
          <Badge key={r.id} as={Link} to={`/regions/${r.slug}`} bg="secondary" className="text-decoration-none">
            {r.name}
          </Badge>
        ))}
      </div>

      {search.active ? (
        <DestinationList destinations={search.results} loading={search.loading} error={search.error} />
      ) : (
        <DestinationList destinations={list} loading={loading} error={error} />
      )}
    </>
  )
}

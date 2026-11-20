import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import DestinationCard from './DestinationCard'

export default function DestinationList({ destinations, loading, error }) {
  if (loading) return <Spinner className="d-block mx-auto my-5" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!destinations.length) return <Alert variant="info">Aucune destination trouvée.</Alert>

  return (
    <Row xs={1} sm={2} lg={3} className="g-4">
      {destinations.map((d) => (
        <Col key={d.id}>
          <DestinationCard destination={d} />
        </Col>
      ))}
    </Row>
  )
}

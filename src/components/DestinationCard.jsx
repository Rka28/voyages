import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function DestinationCard({ destination }) {
  return (
    <Card className="h-100 shadow-sm destination-card">
      <Card.Img variant="top" src={destination.image} alt={destination.name} />
      <Card.Body>
        <Card.Title>{destination.name}</Card.Title>
        <Card.Text className="text-body-secondary mb-0">
          {destination.capital}
          {destination.region_name && ` · ${destination.region_name}`}
        </Card.Text>
        <Link to={`/destinations/${destination.slug}`} className="stretched-link" />
      </Card.Body>
    </Card>
  )
}

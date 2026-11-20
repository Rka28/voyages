import 'leaflet/dist/leaflet.css'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'

export default function DestinationMap({ lat, long, name }) {
  const position = [Number(lat), Number(long)]

  return (
    <MapContainer center={position} zoom={5} className="map rounded shadow-sm">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker center={position} radius={10}>
        <Popup>{name}</Popup>
      </CircleMarker>
    </MapContainer>
  )
}

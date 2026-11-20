import { useEffect, useState } from 'react'
import { Button, Card, Col, Image, Row, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Comments from '../components/Comments'
import EditProfileModal from '../components/EditProfileModal'
import PasswordModal from '../components/PasswordModal'
import { fetchMyComments } from '../features/commentsSlice'
import { fetchDestinations } from '../features/destinationsSlice'
import { fetchFavorites } from '../features/favoritesSlice'
import { changePassword } from '../features/usersSlice'

export default function Profile() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const favorites = useSelector((state) => state.favorites.list)
  const comments = useSelector((state) => state.comments.list)
  const destinations = useSelector((state) => state.destinations.list)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    dispatch(fetchFavorites())
    dispatch(fetchMyComments())
    dispatch(fetchDestinations())
  }, [dispatch])

  const findDestination = (id) => destinations.find((d) => String(d.id) === String(id))

  const myComments = comments.map((c) => ({
    ...c,
    destination_name: c.destination_name ?? findDestination(c.destination_id)?.name,
  }))

  const submitPassword = async (body) => changePassword.fulfilled.match(await dispatch(changePassword(body)))

  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Body className="d-flex flex-column flex-sm-row align-items-center gap-4">
          {user.avatar && <Image src={user.avatar} roundedCircle width={110} />}
          <div className="flex-grow-1 text-center text-sm-start">
            <h1 className="h3 mb-1">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-body-secondary mb-1">@{user.username}</p>
            <p className="mb-0">{user.email}</p>
            {user.role === 'admin' && <span className="badge bg-primary mt-2">Admin</span>}
          </div>
          <div className="d-flex flex-column gap-2">
            <Button variant="outline-primary" onClick={() => setModal('profile')}>
              Modifier mon profil
            </Button>
            <Button variant="outline-secondary" onClick={() => setModal('password')}>
              Changer mon mot de passe
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Tabs defaultActiveKey="favorites" className="mb-3">
        <Tab eventKey="favorites" title={`Favoris (${favorites.length})`}>
          {favorites.length ? (
            <Row xs={2} md={4} className="g-3">
              {favorites.map((f) => (
                <Col key={f.destination_id}>
                  <Card className="h-100 shadow-sm destination-card">
                    <Card.Img variant="top" src={f.destination_image} alt={f.destination_title} />
                    <Card.Body className="py-2">
                      <Link
                        to={`/destinations/${findDestination(f.destination_id)?.slug ?? ''}`}
                        className="stretched-link text-decoration-none"
                      >
                        {f.destination_title}
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-body-secondary">Aucun favori pour le moment.</p>
          )}
        </Tab>
        <Tab eventKey="comments" title={`Mes commentaires (${comments.length})`}>
          <Comments comments={myComments} showDestination />
        </Tab>
      </Tabs>

      {modal === 'profile' && <EditProfileModal onClose={() => setModal(null)} />}
      {modal === 'password' && (
        <PasswordModal
          title="Changer mon mot de passe"
          withCurrent
          onSubmit={submitPassword}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}

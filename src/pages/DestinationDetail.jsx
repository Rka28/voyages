import { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Comments from '../components/Comments'
import ConfirmModal from '../components/ConfirmModal'
import DestinationMap from '../components/DestinationMap'
import { addComment, fetchCommentsByDestination } from '../features/commentsSlice'
import { fetchDestination } from '../features/destinationsSlice'
import { addFavorite, fetchFavorites, removeFavorite } from '../features/favoritesSlice'
import useForm from '../hooks/useForm'

export default function DestinationDetail() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { current: destination, loading, error } = useSelector((state) => state.destinations)
  const comments = useSelector((state) => state.comments)
  const favorites = useSelector((state) => state.favorites.list)
  const user = useSelector((state) => state.auth.user)
  const [form, onChange, setForm] = useForm({ content: '', rating: '5' })
  const [showFavorite, setShowFavorite] = useState(false)
  const id = destination?.id

  useEffect(() => {
    dispatch(fetchDestination(slug))
  }, [dispatch, slug])

  useEffect(() => {
    if (id) dispatch(fetchCommentsByDestination(id))
  }, [dispatch, id])

  useEffect(() => {
    if (user) dispatch(fetchFavorites())
  }, [dispatch, user])

  if (loading && !destination) return <Spinner className="d-block mx-auto my-5" />
  if (error && !destination) return <Alert variant="danger">{error}</Alert>
  if (!destination) return null

  const isFavorite = favorites.some((f) => String(f.destination_id) === String(id))

  const toggleFavorite = () =>
    dispatch(
      isFavorite
        ? removeFavorite(id)
        : addFavorite({ destinationId: id, title: destination.name, image: destination.image }),
    )

  const handleComment = async (e) => {
    e.preventDefault()
    const result = await dispatch(
      addComment({ destination_id: id, content: form.content, rating: Number(form.rating) }),
    )
    if (addComment.fulfilled.match(result)) {
      setForm({ content: '', rating: '5' })
      dispatch(fetchCommentsByDestination(id))
    }
  }

  return (
    <>
      <Row className="g-4">
        <Col lg={7}>
          <img src={destination.image} alt={destination.name} className="w-100 rounded shadow-sm mb-3 detail-img" />
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <h1>{destination.name}</h1>
              <p className="text-body-secondary">
                Capitale : {destination.capital}
                {destination.region_name && ` · ${destination.region_name}`}
              </p>
            </div>
            {user && (
              <Button variant={isFavorite ? 'danger' : 'outline-danger'} onClick={() => setShowFavorite(true)}>
                {isFavorite ? '♥ Favori' : '♡ Favori'}
              </Button>
            )}
          </div>
          <p>{destination.description}</p>
        </Col>
        <Col lg={5}>
          {destination.lat && destination.long && (
            <DestinationMap lat={destination.lat} long={destination.long} name={destination.name} />
          )}
        </Col>
      </Row>

      <section className="mt-5">
        <h2 className="h4 mb-3">Commentaires</h2>

        {user ? (
          <Form onSubmit={handleComment} className="mb-4">
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={form.content}
              onChange={onChange}
              placeholder="Votre avis sur cette destination…"
              required
              className="mb-2"
            />
            <div className="d-flex gap-2">
              <Form.Select name="rating" value={form.rating} onChange={onChange} className="w-auto">
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {'★'.repeat(n)}
                  </option>
                ))}
              </Form.Select>
              <Button type="submit" disabled={comments.loading}>
                Publier
              </Button>
            </div>
          </Form>
        ) : (
          <p>
            <Link to="/login">Connectez-vous</Link> pour laisser un commentaire.
          </p>
        )}

        {comments.error && <Alert variant="danger">{comments.error}</Alert>}
        <Comments comments={comments.list} />
      </section>

      <ConfirmModal
        show={showFavorite}
        variant="primary"
        title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        onConfirm={toggleFavorite}
        onClose={() => setShowFavorite(false)}
      >
        {isFavorite ? `Retirer ${destination.name} de vos favoris ?` : `Ajouter ${destination.name} à vos favoris ?`}
      </ConfirmModal>
    </>
  )
}

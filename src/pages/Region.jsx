import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import DestinationList from '../components/DestinationList'
import { fetchByRegion, fetchRegions } from '../features/destinationsSlice'

export default function Region() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { list, regions, loading, error } = useSelector((state) => state.destinations)
  const region = regions.find((r) => r.slug === slug)

  useEffect(() => {
    dispatch(fetchByRegion(slug))
    dispatch(fetchRegions())
  }, [dispatch, slug])

  return (
    <>
      <Link to="/">← Toutes les destinations</Link>
      <h1 className="my-3">{region?.name ?? slug}</h1>
      <DestinationList destinations={list} loading={loading} error={error} />
    </>
  )
}

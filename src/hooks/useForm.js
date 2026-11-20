import { useState } from 'react'

export default function useForm(initial) {
  const [form, setForm] = useState(initial)
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  return [form, onChange, setForm]
}

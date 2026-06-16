import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Paper, Typography, TextField, MenuItem, Alert } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function AddTeacherPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', subject: '', email: '', contactNumber: '' })
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([])
  const [error, setError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(data => setSubjects(data.data))
      .catch(console.error)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))

    // Live email validation
    if (name === 'email') {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setEmailError('This email address is not invalid.')
      } else {
        setEmailError('')
      }
    }

    // Live phone validation
    if (name === 'contactNumber') {
      if (value && !/^[689]\d{7}$/.test(value)) {
        setPhoneError('The work contact number is not valid.')
      } else {
        setPhoneError('')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneError || emailError) return
    setError('')

    const res = await fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      navigate('/teachers')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to add teacher.')
    }
  }

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
      <Typography variant="h5" fontWeight={700} mb={3}>Add Teacher</Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField label="Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. John Smith" required fullWidth />

        <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} select required fullWidth>
          <MenuItem value="" disabled>Select a subject</MenuItem>
          {subjects.map(s => (
            <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="e.g. john@school.edu"
          required
          fullWidth
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          label="Work Contact Number"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          placeholder="e.g. 91234567"
          fullWidth
          error={!!phoneError}
          helperText={phoneError}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/teachers')}>
            Back
          </Button>
          <Button type="submit" variant="contained" disabled={!!phoneError || !!emailError}>
            Add Teacher
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

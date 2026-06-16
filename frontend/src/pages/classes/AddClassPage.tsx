import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Paper, Typography, TextField, MenuItem, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'

interface Teacher {
  name: string
  email: string
  subject: string
}

export default function AddClassPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', level: '', teacherEmail: '' })
  const [levels, setLevels] = useState<{ id: number; name: string }[]>([])
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/levels')
      .then(res => res.json())
      .then(data => setLevels(data.data))
      .catch(console.error)

    fetch('/api/subjects')
      .then(res => res.json())
      .then(data => setSubjects(data.data))
      .catch(console.error)

    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => setTeachers(data.data))
      .catch(console.error)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  // Filter teachers by selected subject
  const filteredTeachers = selectedSubject
    ? teachers.filter(t => t.subject === selectedSubject)
    : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      navigate('/classes')
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create class.')
    }
  }

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Add Class</Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Typography sx={{ color: 'error.main', fontSize: '0.9rem' }}>{error}</Typography>}

        <TextField label="Class Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. 1A, 2B" required fullWidth />

        {/* Level */}
        <TextField label="Level" name="level" value={form.level} onChange={handleChange} select required fullWidth>
          <MenuItem value="" disabled>Select a level</MenuItem>
          {levels.map(l => (
            <MenuItem key={l.id} value={l.name}>{l.name}</MenuItem>
          ))}
        </TextField>

        {/* Subject — shown after level is selected */}
        {form.level && (
          <TextField
            label="Subject"
            value={selectedSubject}
            onChange={e => {
              setSelectedSubject(e.target.value)
              setForm(f => ({ ...f, teacherEmail: '' })) // reset teacher when subject changes
            }}
            select
            required
            fullWidth
          >
            <MenuItem value="" disabled>Select a subject</MenuItem>
            {subjects.map(s => (
              <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
            ))}
          </TextField>
        )}

        {/* Form Teacher — shown after subject is selected */}
        {selectedSubject && (
          <TextField
            label="Form Teacher"
            name="teacherEmail"
            value={form.teacherEmail}
            onChange={handleChange}
            select
            required
            fullWidth
          >
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map(t => (
                <MenuItem key={t.email} value={t.email}>
                  {t.name} ({t.email})
                </MenuItem>
              ))
            ) : (
              [
                <MenuItem key="none" disabled>
                  No teachers for this subject
                </MenuItem>,
                <Divider key="divider" />,
                <MenuItem
                  key="add"
                  onClick={() => navigate('/teachers/add')}
                  sx={{ color: 'primary.main', fontWeight: 600 }}
                >
                  <AddIcon fontSize="small" sx={{ mr: 1 }} />
                  Add Teacher
                </MenuItem>,
              ]
            )}
          </TextField>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/classes')}>
            Back
          </Button>
          <Button type="submit" variant="contained">Add Class</Button>
        </Box>
      </Box>
    </Paper>
  )
}

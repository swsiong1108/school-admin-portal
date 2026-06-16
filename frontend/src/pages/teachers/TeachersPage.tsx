import { useEffect, useState } from 'react'
import {
  Box, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

interface Teacher {
  name: string
  email: string
  subject: string
  contactNumber: string
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => setTeachers(data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Teachers</Typography>
        {teachers.length > 0 && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/teachers/add')}>
            Add Teacher
          </Button>
        )}
      </Box>

      {!loading && teachers.length === 0 && (
        <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography color="text.secondary">No teachers yet.</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/teachers/add')}>
            Add Teacher
          </Button>
        </Box>
      )}

      {teachers.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F4F6F8' }}>
              <TableRow>
                <TableCell><b>#</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Subject</b></TableCell>
                <TableCell><b>Work Contact</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow key={teacher.email} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.contactNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}

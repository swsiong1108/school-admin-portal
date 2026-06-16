import { useEffect, useState } from 'react'
import {
  Box, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

interface ClassItem {
  name: string
  level: string
  formTeacher: { name: string } | null
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/classes')
      .then(res => res.json())
      .then(data => setClasses(data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Classes</Typography>
        {classes.length > 0 && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/classes/add')}>
            Add Class
          </Button>
        )}
      </Box>

      {!loading && classes.length === 0 && (
        <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography color="text.secondary">No classes yet.</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/classes/add')}>
            Add Class
          </Button>
        </Box>
      )}

      {classes.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F4F6F8' }}>
              <TableRow>
                <TableCell><b>#</b></TableCell>
                <TableCell><b>Class Level</b></TableCell>
                <TableCell><b>Class Name</b></TableCell>
                <TableCell><b>Form Teacher</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((cls, index) => (
                <TableRow key={cls.name} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cls.level}</TableCell>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.formTeacher?.name ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}

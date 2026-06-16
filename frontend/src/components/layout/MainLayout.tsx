import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNav />
      <Box sx={{ flex: 1, p: 3, bgcolor: 'background.default' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

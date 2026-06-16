import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'

const navItems = [
    { to: '/classes',  label: 'Classes' },
    { to: '/teachers', label: 'Teachers' },

]

export default function TopNav() {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white' }}>
      <Toolbar sx={{ gap: 1 }}>
        {/* Logo */}
        <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ mr: 4, color: 'primary.main', fontWeight: 700 }}>
        School Portal
        </Typography>

        {/* Nav Links */}
        <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
          {navItems.map(({ to, label }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              end
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                '&.active': {
                    fontWeight: 700,
                    borderBottom: '2px solid currentColor',
                    borderRadius: 0,
                },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
import React from 'react'
import { Drawer, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function VendorDrawerAthleteSelector({ open, onClose, athletes = [], selectedAthletes = [], onSelectionChange }) {
  const [filter, setFilter] = React.useState('')
  const filtered = React.useMemo(() => {
    const f = String(filter).toLowerCase()
    return athletes.filter(a => a.name.toLowerCase().includes(f))
  }, [athletes, filter])

  const toggle = (id) => {
    const exists = selectedAthletes.includes(id)
    const next = exists ? selectedAthletes.filter(x => x !== id) : [...selectedAthletes, id]
    onSelectionChange?.(next)
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 420 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>Select athletes</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
      </Box>
      <Box sx={{ p: 2, pt: 0 }}>
        <TextField fullWidth size="small" variant="filled" label="Search" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </Box>
      <List dense disablePadding>
        {filtered.map(a => {
          const labelId = `ath-${a.id}`
          const checked = selectedAthletes.includes(a.id)
          return (
            <ListItem key={a.id} disablePadding secondaryAction={null}>
              <ListItemButton role={undefined} onClick={() => toggle(a.id)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={a.name} secondary={`${a.position || '—'} • ${a.team || a.ageGroup || ''}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

export { VendorDrawerAthleteSelector }
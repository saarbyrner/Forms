import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Paper, Typography, Autocomplete, TextField, Link } from '@mui/material'
import { ArrowDropDownOutlined } from '@mui/icons-material'
import { DataGrid, GridPagination } from '@mui/x-data-grid'
import '../../styles/design-tokens.css'
import { Button, Icon, StatusChip } from '../../components'
import { athletesSimple, assessments } from '../../data'

// Map of known form ids to names for display only
const FORM_TITLES = {
  378: 'Test - Toggle Switch',
  364: 'RFU Exit Medical',
  348: 'More than equal',
  347: 'Hilly test',
  346: 'Form with conditional'
}

function Screen03_FormResponsesForTemplate() {
  const navigate = useNavigate()
  const { formId } = useParams()

  const formTitle = React.useMemo(() => FORM_TITLES[Number(formId)] || `Form ${formId}`,[formId])

  function slugify(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const targetSlug = React.useMemo(() => slugify(formTitle), [formTitle])

  // Assigned athletes: those that have at least one assessment for this template
  const assignedAthletes = React.useMemo(() => {
    const names = new Set(
      assessments
        .filter(a => slugify(a.assessment_template) === targetSlug)
        .map(a => a.athlete_name)
    )
    // If no matches, fall back to first 12 athletes
    return (names.size > 0 ? Array.from(names) : athletesSimple.slice(0, 12).map(a => a.name))
  }, [targetSlug])

  // Responses: reflect latest status based on presence of an assessment record
  const allResponses = React.useMemo(() => {
    const latestByAthlete = new Map()
    for (const a of assessments.filter(a => slugify(a.assessment_template) === targetSlug)) {
      const key = a.athlete_name
      const when = new Date(a.updated_at || a.assessment_date)
      const prev = latestByAthlete.get(key)
      if (!prev || when > prev.when) {
        latestByAthlete.set(key, { status: a.status, when })
      }
    }
    return assignedAthletes.map((name, idx) => {
      const rec = latestByAthlete.get(name)
      const status = rec ? (String(rec.status).toLowerCase() === 'completed' ? 'Complete' : rec.status) : 'Not started'
      return {
        id: `${targetSlug}-${idx + 1}`,
        athleteName: name,
        lastUpdated: rec ? rec.when.toLocaleString() : '—',
        status
      }
    })
  }, [assignedAthletes, targetSlug])

  const [selectedAthlete, setSelectedAthlete] = React.useState(null)
  const [selectedStatus, setSelectedStatus] = React.useState(null)
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 25 })

  const filteredRows = React.useMemo(() => {
    return allResponses.filter(row => {
      const athleteOk = !selectedAthlete || row.athleteName === selectedAthlete
      const statusOk = !selectedStatus || row.status === selectedStatus
      return athleteOk && statusOk
    })
  }, [allResponses, selectedAthlete, selectedStatus])

  const columns = React.useMemo(() => ([
    {
      field: 'athleteName',
      headerName: 'Name',
      minWidth: 240,
      flex: 1,
      headerClassName: 'grid-cell--pad-left',
      cellClassName: 'grid-cell--pad-left',
      renderCell: (params) => (
        <Typography component="span" variant="body2" sx={{ color: 'var(--color-text-primary)' }}>
          <Link component="button" underline="none" onClick={(e) => { e.stopPropagation() }} sx={{ color: 'var(--color-text-primary)' }}>
            {params.value}
          </Link>
        </Typography>
      )
    },
    {
      field: 'lastUpdated',
      headerName: 'Last updated',
      minWidth: 260
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 160,
      renderCell: (params) => (
        <StatusChip status={params.value} type={params.value === 'Complete' ? 'success' : params.value === 'In progress' ? 'primary' : 'default'} />
      )
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      minWidth: 120,
      headerClassName: 'grid-cell--pad-right',
      cellClassName: 'grid-cell--pad-right',
      renderCell: () => (
        <Button size="small" variant="secondary">Start</Button>
      )
    }
  ]), [])

  return (
    <Box sx={{ py: 2, bgcolor: 'var(--color-background-primary)', height: '100%' }}>
      <Paper elevation={0} sx={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <Box sx={{ px: 3, pt: 2, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button variant="secondary" size="small" aria-label="Back" onClick={() => navigate('/forms/form_answers_sets')}>
            <Icon icon="arrow_back" />
          </Button>
          <Typography variant="h5" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
            {formTitle}
          </Typography>
        </Box>

        {/* Filters */}
        <Box sx={{ px: 3, pb: 1, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Autocomplete
            size="small"
            options={assignedAthletes}
            value={selectedAthlete}
            onChange={(_, v) => setSelectedAthlete(v)}
            popupIcon={<ArrowDropDownOutlined fontSize="small" />}
            renderInput={(params) => (
              <TextField {...params} label="Athlete" variant="filled" />
            )}
            sx={{ minWidth: 280, maxWidth: 420 }}
          />

          <Autocomplete
            size="small"
            options={["Not started", "In progress", "Complete"]}
            value={selectedStatus}
            onChange={(_, v) => setSelectedStatus(v)}
            popupIcon={<ArrowDropDownOutlined fontSize="small" />}
            renderInput={(params) => (
              <TextField {...params} label="Status" variant="filled" />
            )}
            sx={{ minWidth: 220, maxWidth: 320 }}
          />
        </Box>

        {/* Grid */}
        <Box sx={{
          height: 560,
          width: '100%',
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'var(--color-background-primary)',
            '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 600, fontSize: '14px' }
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid var(--color-border-secondary)',
            display: 'flex',
            alignItems: 'center'
          },
          '& .grid-cell--pad-left': { pl: 3, paddingLeft: '24px !important' },
          '& .grid-cell--pad-right': { pr: 3, paddingRight: '24px !important' },
          '& .MuiDataGrid-footerContainer': { px: 3 },
        }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            disableRowSelectionOnClick
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[25, 50, 100]}
            slots={{ pagination: GridPagination }}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default Screen03_FormResponsesForTemplate



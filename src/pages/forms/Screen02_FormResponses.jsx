import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Divider,
  Autocomplete,
  TextField,
  Link
} from '@mui/material'
import { ArrowDropDownOutlined } from '@mui/icons-material'
import { DataGrid, GridPagination } from '@mui/x-data-grid'
import '../../styles/design-tokens.css'
import { Button, StatusChip, Icon } from '../../components'

function a11yProps(index) {
  return {
    id: `form-responses-tab-${index}`,
    'aria-controls': `form-responses-tabpanel-${index}`
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props
  if (value !== index) return null
  return (
    <Box
      role="tabpanel"
      id={`form-responses-tabpanel-${index}`}
      aria-labelledby={`form-responses-tab-${index}`}
      sx={{ pt: 2 }}
      {...other}
    >
      {children}
    </Box>
  )
}

function Screen02_FormResponses() {
  const navigate = useNavigate()

  // Stubbed data for the grid; wire this to real data later
  const allForms = React.useMemo(() => ([
    { id: 378, name: 'Test - Toggle Switch', updatedAt: 'July 17, 2025 11:22 am' },
    { id: 364, name: 'RFU Exit Medical', updatedAt: 'May 20, 2025 11:49 am' },
    { id: 348, name: 'More than equal', updatedAt: 'April 09, 2025 9:57 am' },
    { id: 347, name: 'Hilly test', updatedAt: 'March 28, 2025 2:03 pm' },
    { id: 346, name: 'Form with conditional', updatedAt: 'March 21, 2025 12:18 pm' },
  ]), [])

  const [tabValue, setTabValue] = React.useState(0)
  const [selectedFormName, setSelectedFormName] = React.useState(null)
  const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 25 })

  // Stubbed data for Completed tab based on the provided dump
  const completedRows = React.useMemo(() => ([
    { id: 467635, athleteName: 'Allan Santos Athlete', name: 'Test - Toggle Switch', productArea: 'Medical', category: 'Other', examiner: 'Bhuvan Bhatt', completionDate: 'Jul 17, 2025', status: 'Complete' },
    { id: 467105, athleteName: 'test', name: 'Test - Toggle Switch', productArea: 'Medical', category: 'Other', examiner: 'Bhuvan Bhatt', completionDate: 'Jul 17, 2025', status: 'Complete' },
    { id: 467101, athleteName: 'Allan Santos', name: 'Test - Toggle Switch', productArea: 'Medical', category: 'Other', examiner: 'Bhuvan Bhatt', completionDate: 'Jul 17, 2025', status: 'Complete' },
    { id: 467095, athleteName: 'Akanksha', name: 'Test - Toggle Switch', productArea: 'Medical', category: 'Other', examiner: 'Bhuvan Bhatt', completionDate: 'Jul 17, 2025', status: 'Complete' },
    { id: 467088, athleteName: 'Adam Conway', name: 'Test - Toggle Switch', productArea: 'Medical', category: 'Other', examiner: 'Bhuvan Bhatt', completionDate: 'Jul 17, 2025', status: 'Complete' },
    { id: 467087, athleteName: 'Adam Conway', name: 'General Medical', productArea: 'Medical', category: 'Other', examiner: 'Willian Gama', completionDate: 'Jul 2, 2025', status: 'Complete' },
    { id: 467083, athleteName: 'Adam Conway', name: 'General Medical', productArea: 'Medical', category: 'Other', examiner: 'Willian Gama', completionDate: 'Jul 2, 2025', status: 'Complete' },
    { id: 467079, athleteName: 'Adam Conway', name: 'Kiosk Test', productArea: 'Medical', category: 'Other', examiner: 'Adam Conway', completionDate: 'Jun 26, 2025', status: 'Complete' },
  ]), [])

  const [completedFormName, setCompletedFormName] = React.useState(null)

  const completedFilteredRows = React.useMemo(() => {
    if (!completedFormName) return completedRows
    return completedRows.filter(r => r.name.toLowerCase().includes(String(completedFormName).toLowerCase()))
  }, [completedRows, completedFormName])

  const filteredRows = React.useMemo(() => {
    if (!selectedFormName) return allForms
    return allForms.filter(f => f.name.toLowerCase().includes(String(selectedFormName).toLowerCase()))
  }, [allForms, selectedFormName])

  const columns = React.useMemo(() => ([
    {
      field: 'name',
      headerName: 'Template',
      flex: 1,
      minWidth: 360,
      sortable: true,
      headerClassName: 'grid-cell--pad-left',
      cellClassName: 'grid-cell--pad-left',
      renderCell: (params) => (
        <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
          <Link
            component="button"
            underline="none"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/forms/${params.row.id}/build`)
            }}
            sx={{ color: 'var(--color-text-primary)' }}
          >
            {params.value}
          </Link>
        </Typography>
      )
    },
    {
      field: 'updatedAt',
      headerName: 'Last updated at',
      width: 260,
      sortable: true,
      headerClassName: 'grid-cell--pad-right',
      cellClassName: 'grid-cell--pad-right',
    },
  ]), [navigate])

  const completedColumns = React.useMemo(() => ([
    {
      field: 'athleteName',
      headerName: 'Athlete',
      minWidth: 220,
      flex: 1,
      headerClassName: 'grid-cell--pad-left',
      cellClassName: 'grid-cell--pad-left',
      renderCell: (params) => (
        <Typography component="span" variant="body2" sx={{ color: 'var(--color-text-primary)' }}>
          <Link
            component="button"
            underline="none"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/forms/form_answers_sets/${params.row.id}`)
            }}
            sx={{ color: 'var(--color-text-primary)' }}
          >
            {params.value}
          </Link>
        </Typography>
      )
    },
    {
      field: 'name',
      headerName: 'Template',
      minWidth: 260,
      flex: 1,
      renderCell: (params) => (
        <Typography component="span" variant="body2" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
          <Link
            component="button"
            underline="none"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/forms/form_answers_sets/${params.row.id}`)
            }}
            sx={{ color: 'var(--color-text-primary)' }}
          >
            {params.value}
          </Link>
        </Typography>
      )
    },
    { field: 'productArea', headerName: 'Product area', minWidth: 120 },
    { field: 'category', headerName: 'Category', minWidth: 120 },
    { field: 'examiner', headerName: 'Examiner', minWidth: 180 },
    { field: 'completionDate', headerName: 'Completed on', minWidth: 140 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: (params) => (
        <StatusChip status={params.value} type="success" />
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
      renderCell: (params) => (
        <Button
          size="small"
          variant="secondary"
          aria-label="Delete"
          onClick={(e) => {
            e.stopPropagation()
            // TODO: hook up real delete
            // eslint-disable-next-line no-console
            console.log('Delete clicked for', params.row.id)
          }}
        >
          <Icon icon="delete" size="medium" />
        </Button>
      )
    },
  ]), [navigate])

  return (
    <Box sx={{ py: 2, bgcolor: 'var(--color-background-primary)', height: '100%' }}>
      <Paper elevation={0} sx={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <Box sx={{ px: 3, pt: 2, pb: 1 }}>
          <Typography variant="h5" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
            Form responses
          </Typography>
        </Box>
        
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          aria-label="Form responses tabs"
          sx={{
            px: 3,
            pt: 1,
            minHeight: 44,
            borderBottom: '1px solid var(--color-border-primary)',
            '& .MuiTab-root': {
              minHeight: 44,
              textTransform: 'none',
              fontWeight: 600,
              color: 'var(--color-text-muted)'
            },
            '& .MuiTab-root.Mui-selected': {
              color: 'var(--color-text-primary)'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--color-primary)'
            }
          }}
        >
          <Tab label="Forms" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
        </Tabs>
        {/* Baseline handled via borderBottom on Tabs */}

        {/* Forms tab */}
        <TabPanel value={tabValue} index={0}>
          {/* Filters */}
          <Box sx={{ px: 3, pb: 1, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Autocomplete
              size="small"
              options={allForms.map(f => f.name)}
              value={selectedFormName}
              onChange={(_, v) => setSelectedFormName(v)}
              popupIcon={<ArrowDropDownOutlined fontSize="small" />}
              renderInput={(params) => (
                <TextField {...params} label="Form" variant="filled" />
              )}
              sx={{ minWidth: 280, maxWidth: 420 }}
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
            '& .MuiDataGrid-withBorderColor': {},
            // Internal 24px padding via first/last columns to keep full-bleed edges
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
        </TabPanel>

        {/* Completed tab */}
        <TabPanel value={tabValue} index={1}>
          {/* Filters */}
          <Box sx={{ px: 3, pb: 1, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Autocomplete
              size="small"
              options={[...new Set(completedRows.map(r => r.name))]}
              value={completedFormName}
              onChange={(_, v) => setCompletedFormName(v)}
              popupIcon={<ArrowDropDownOutlined fontSize="small" />}
              renderInput={(params) => (
                <TextField {...params} label="Form" variant="filled" />
              )}
              sx={{ minWidth: 280, maxWidth: 420 }}
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
            '& .MuiDataGrid-withBorderColor': {},
            // Internal 24px padding via first/last columns to keep full-bleed edges
            '& .grid-cell--pad-left': { pl: 3, paddingLeft: '24px !important' },
            '& .grid-cell--pad-right': { pr: 3, paddingRight: '24px !important' },
            '& .MuiDataGrid-footerContainer': { px: 3 },
          }}>
            <DataGrid
              rows={completedFilteredRows}
              columns={completedColumns}
              disableRowSelectionOnClick
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[25, 50, 100]}
              slots={{ pagination: GridPagination }}
            />
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  )
}

export default Screen02_FormResponses



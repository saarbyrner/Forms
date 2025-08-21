import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3001
  },
  
  build: {
    target: 'es2015',
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material', 
      '@mui/x-data-grid',
      '@mui/x-date-pickers',
      '@emotion/react',
      '@emotion/styled'
    ]
  },
  
  resolve: {}
})
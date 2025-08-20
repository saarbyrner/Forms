import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3001
  },
  
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'mui-core': ['@mui/material', '@mui/icons-material'],
          'mui-x': ['@mui/x-data-grid', '@mui/x-date-pickers']
        }
      }
    }
  },
  
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material', 
      '@mui/x-data-grid',
      '@mui/x-date-pickers',
      '@mui/x-data-grid/models',
      '@emotion/react',
      '@emotion/styled'
    ],
    force: true
  },
  
  define: {
    global: 'globalThis'
  }
})
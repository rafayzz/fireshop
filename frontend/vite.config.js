import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Allow access from network (not just localhost)
    host: '0.0.0.0',
    port: 5175,
    // Expose on all network interfaces
    strictPort: false,
  },
  // Environment variables
  define: {
    __BACKEND_URL__: JSON.stringify(process.env.VITE_BACKEND_URL || 'http://localhost:5000'),
  },
})

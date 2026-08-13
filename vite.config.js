import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://team-server:8000',
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/ws': {
        target: 'ws://team-server:8000',
        ws: true,
        changeOrigin: true
      }
    }
  }
})

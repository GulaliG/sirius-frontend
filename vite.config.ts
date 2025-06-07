import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/upload': {
        target: 'https://sirius-backend-4wsr.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/submit-survey': {
        target: 'https://sirius-backend-4wsr.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/report': {
        target: 'https://sirius-backend-4wsr.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

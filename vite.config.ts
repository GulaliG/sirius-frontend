import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const BACKENDS = [
  'https://sirius-backend-4wsr.onrender.com',
  'https://sirius-draw-test-94500a1b4a2f.herokuapp.com'
]

function chooseBackend(): string {
  return BACKENDS[0]
}

const TARGET = chooseBackend()

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/upload': {
        target: TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/submit-survey': {
        target: TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/report': {
        target: TARGET,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

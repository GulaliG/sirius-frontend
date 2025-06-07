import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const API = env.VITE_API_URL

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/upload': { target: API, changeOrigin: true, secure: false },
        '/submit-survey': { target: API, changeOrigin: true, secure: false },
        '/report': { target: API, changeOrigin: true, secure: false },
      },
    },
    define: {
      __API_BASE__: JSON.stringify(API),
    },
  }
})

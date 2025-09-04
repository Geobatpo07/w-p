import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ Mets le nom exact de ton repo GitHub ici
  base: '/wedding-proposal/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5173, // port par défaut Vite
    open: true, // ouvre automatiquement dans le navigateur
  }
})

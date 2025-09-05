import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const isVercel = !!process.env.VERCEL;
  return {
    plugins: [react()],
    base: isVercel ? '/' : '/w-p/',  // 🔥 racine sur Vercel, sous-dossier sur GitHub
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
    server: {
      port: 5173,
      open: true,
    }
  }
})

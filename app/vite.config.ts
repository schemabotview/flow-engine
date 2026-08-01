import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite dev/build. The app is a fixed 1920×1080 stage (see App.tsx) scaled to fit the
// window in preview; a later capture recorder drives it at a 1:1 viewport.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

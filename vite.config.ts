import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // The GitHub Pages workflow sets BASE_PATH to "/<repo-name>/"; locally the site runs at "/".
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})

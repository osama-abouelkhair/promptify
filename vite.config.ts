import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

import fs from 'node:fs'
import path from 'node:path'

function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist')
      const indexPath = path.resolve(distDir, 'index.html')
      const notFoundPath = path.resolve(distDir, '404.html')
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    copyIndexTo404()
  ],
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  build: {
    assetsDir: 'assets',
  }
})

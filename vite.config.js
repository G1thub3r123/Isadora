import { defineConfig } from 'vite'

export default defineConfig({
  base: '/isadora/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser'
  }
})

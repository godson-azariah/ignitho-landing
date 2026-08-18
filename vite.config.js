/* Build settings. Nobody visiting the site sees any of this. */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  }
  
})

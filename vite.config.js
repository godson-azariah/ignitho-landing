/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  BUILD SETTINGS

   WHERE YOU SEE THIS
     Nowhere. Nobody visiting the site ever sees this.

   WHAT IS IN HERE
     · The instructions for turning the source files into the small
       bundle that gets published.

   WORTH KNOWING
     Editing this changes how the site is built, not how it looks.
   ========================================================================== */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  }
  
})

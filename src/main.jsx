/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE IGNITION SWITCH

   WHERE YOU SEE THIS
     Nothing. It is the first file the browser runs, and it draws
     nothing of its own.

   WHAT IS IN HERE
     · It finds the empty box in index.html and tells the site to start
       drawing itself inside it.
     · Three lines long, and the only place the whole site is switched
       on.

   WORTH KNOWING
     If this file were deleted the page would load and stay completely
     blank.
   ========================================================================== */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
 
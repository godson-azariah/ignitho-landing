/* A scripted `behavior: 'smooth'` ignores CSS, so the reduced-motion
   preference cannot be handled in the stylesheet — it has to be read here.

   `scroll-behavior: smooth` is deliberately NOT set on the root: there it
   animates every scroll the browser initiates itself, including scrollbar
   drags and Page Up/Down, which is what made scrolling feel unlike scrolling. */
export const scrollEase = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

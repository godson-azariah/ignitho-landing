import { useEffect } from 'react';

/* What every overlay on the page needs and nothing else: while it is open it
   owns the viewport, and Escape closes it.

   Each overlay calling this for itself is why there is no central list of
   "things that might be open" to keep in step — the menu sheet and the agent
   simulator do not know about each other. */
export function useOverlay(open, onClose) {
  useEffect(() => {
    if (!open) return undefined;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}

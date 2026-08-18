/* Two rules, shared by the phone menu, the contact form and the test window:
   while one is open the page behind it cannot scroll, and Escape closes it.

   Each one asks for this itself, so there is no central list of "things that
   might be open" to keep in step. */

import { useEffect } from 'react';

/* What every overlay on the page needs and nothing else: while it is open it
   owns the visible part of the screen, and Escape closes it.

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

import { useEffect, useState } from 'react';

/* Which section the reader is currently in, for the navbar to mark.

   AN OBSERVER, NOT A SCROLL HANDLER. The obvious version measures every
   section's `getBoundingClientRect` on every scroll event, which is a forced
   layout per frame on the main thread for something that changes maybe five
   times a page. `IntersectionObserver` does the same work off it and only calls
   back when an answer actually changes.

   THE `rootMargin` IS THE WHOLE ALGORITHM. It shrinks the root to a thin band
   near the top of the viewport — from 100px down, which clears the fixed
   masthead, to 25% of the height. A section is "current" when it crosses that
   band, which is roughly where a reader's eye sits. Without the band every
   section from the fold down would be intersecting at once and the answer would
   always be the first one.

   LAST INTERSECTING WINS, not first. Sections here are contiguous, so the only
   time two intersect is when a boundary is inside the band — and at that moment
   the one further down is the one being entered. Taking the first would keep the
   outgoing section marked until it had left entirely, which reads as the navbar
   lagging behind the page.

   `ids` must be a stable array. It is a dependency, so a literal rebuilt on each
   render would tear the observer down and rebuild it on every render too. */
export function useScrollSpy(ids, enabled) {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setCurrent(null);
      return undefined;
    }

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    /* Kept outside the callback: an observer reports only what CHANGED, so the
       state of every other section has to be remembered between calls. */
    const seen = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        let hit = null;
        for (const id of ids) if (seen.get(id)) hit = id;
        setCurrent(hit);
      },
      { rootMargin: '-100px 0px -75% 0px', threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, enabled]);

  return current;
}

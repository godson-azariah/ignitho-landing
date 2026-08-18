/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE ONE WATCHER THAT TRIGGERS EVERY FADE-IN

   WHERE YOU SEE THIS
     Everywhere something fades in as you scroll.

   WHAT IS IN HERE
     · A single watcher shared by all fifty-odd revealing blocks,
       instead of one each. Blocks stop being watched the moment they
       have appeared.

   WORTH KNOWING
     This is purely about speed — fifty separate watchers is real work
     for no gain.
   ========================================================================== */

/* One IntersectionObserver for the whole page rather than one per element.

   There are around fifty reveals; fifty separate observers each keep their own
   record of root bounds and re-run on every scroll tick, which is real work for
   no reason. Targets are unobserved the moment they land, so the registry
   empties itself as you read down the page. */
let io = null;
const callbacks = new WeakMap();

export function observeReveal(el, onEnter) {
  if (typeof IntersectionObserver === 'undefined') {
    onEnter();
    return undefined;
  }

  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const fn = callbacks.get(entry.target);
          callbacks.delete(entry.target);
          io.unobserve(entry.target);
          fn?.();
        }
      },
      /* Fires BEFORE the element reaches the visible part of the screen, not after. A negative
         bottom margin would shrink the root, so an element would have to clear
         the bottom of the first screen before anything happened — by which point you are already
         looking at it and the animation reads as a lag. A positive margin
         extends the root past the bottom of the first screen instead. */
      { threshold: 0, rootMargin: '0px 0px 140px 0px' }
    );
  }

  callbacks.set(el, onEnter);
  io.observe(el);
  return () => {
    callbacks.delete(el);
    io.unobserve(el);
  };
}

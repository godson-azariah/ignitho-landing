/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE MENU BAR SHADOW

   WHERE YOU SEE THIS
     The top menu bar.

   WHAT IS IN HERE
     · One thing: whether the page has been scrolled at all. If it has,
       the bar lifts onto a soft shadow; at the very top it carries only
       a thin line.

   WORTH KNOWING
     The bar used to hide itself when you scrolled down. It no longer
     does — navigation that comes and goes makes you check whether it is
     there.
   ========================================================================== */

import { useEffect, useState } from 'react';

/* The top bar's one piece of scroll state: whether the page has moved under it
   at all, which is what decides between a thin line and a soft shadow.

   IT USED TO RETURN A SECOND FLAG, `hidden`, AND THE BAR RETRACTED ON THAT.
   Scrolling down past 80px hid it, scrolling up brought it back, with a 6px
   small amount of movement that is ignored so trackpad jitter could not flicker it. The whole mechanism has
   gone: a fixed bar that comes and goes makes the reader check whether the
   navigation is there before reaching for it, and the four destinations in it
   are the page's only way between sections. It stays put.

   That took `lastY` and the direction comparison with it — with nothing to
   decide about, this is now a single threshold read. The read is still gated to
   one per animation frame, because scroll fires far faster than anything can be
   painted in response to it, and `scrollTop` is a layout-flushing property. */
export function useTopBarShadow() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const read = () => {
      ticking = false;
      setScrolled(document.documentElement.scrollTop > 8);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrolled };
}

import { useEffect, useRef, useState } from 'react';

/* The masthead's two pieces of scroll state: whether it should be retracted,
   and whether the page has moved under it at all.

   The 6px deadband stops trackpad jitter from flickering the bar, and the
   whole read is gated to one per animation frame — scroll fires far faster
   than anything can be painted in response to it. */
export function useScrollChrome() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const read = () => {
      ticking = false;
      const y = document.documentElement.scrollTop;
      if (y <= 80) setHidden(false);
      else if (y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      setScrolled(y > 8);
      lastY.current = y;
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

  return { hidden, scrolled };
}

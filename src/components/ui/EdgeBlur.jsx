/* The blurred edges at the top and bottom of the window, which smudge out
   content scrolling under them rather than letting the screen cut it off.

   They answer the scroll instead of sitting there. Each edge only exists
   while there is page beyond it: the top one fades in once you leave the
   top, the bottom one fades out as you reach the end. And the faster the
   page moves, the heavier the smudge: the scroll speed is eased into
   `--edge-v` (0 at rest, 1 at a fast flick), which raises the strongest
   layers and deepens the whole edge, then settles back once you stop.

   One loop, running only while the page is moving. Nothing reacts for
   anyone whose device asks for reduced motion; the edges just sit at rest.
   Styles in edges.css. */

import { useEffect, useRef } from 'react';

const LAYERS = 7;

export function EdgeBlur() {
  const top = useRef(null);
  const bottom = useRef(null);

  useEffect(() => {
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let v = 0;
    let frame = 0;

    const paint = () => {
      const y = window.scrollY;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      const t = top.current;
      const b = bottom.current;
      if (t) {
        t.style.setProperty('--edge-on', Math.min(y / 120, 1).toFixed(3));
        t.style.setProperty('--edge-v', v.toFixed(3));
      }
      if (b) {
        b.style.setProperty('--edge-on', Math.min(Math.max(end - y, 0) / 120, 1).toFixed(3));
        b.style.setProperty('--edge-v', v.toFixed(3));
      }
    };

    const tick = (now) => {
      const y = window.scrollY;
      const dt = Math.max(now - lastT, 1);
      const speed = still ? 0 : Math.min(Math.abs(y - lastY) / dt / 2.2, 1);
      lastY = y;
      lastT = now;
      /* rise quickly, settle slowly */
      v += (speed - v) * (speed > v ? 0.35 : 0.06);
      paint();
      frame = v > 0.004 || speed > 0 ? requestAnimationFrame(tick) : 0;
      if (!frame) {
        v = 0;
        paint();
      }
    };

    const onScroll = () => {
      if (!frame) {
        lastT = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', paint);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', paint);
    };
  }, []);

  const layers = Array.from({ length: LAYERS }, (_, i) => <i key={i} />);
  return (
    <>
      <div ref={top} aria-hidden="true" className="edge-blur is-top">
        {layers}
      </div>
      <div ref={bottom} aria-hidden="true" className="edge-blur is-bottom">
        {layers}
      </div>
    </>
  );
}

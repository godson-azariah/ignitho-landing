import { useEffect, useRef, useState } from 'react';

/* The hero stage: a bloom, three layers of folds hung at different depths —
   the mid one inside a billowing frame — a travelling sheen, and the rule
   grid on top. Purely ambient: no pointer handlers, no per-frame JavaScript,
   every moving layer animates transform only. */
export function HeroStage() {
  const surfaceRef = useRef(null);
  const [live, setLive] = useState(true);

  /* Nothing here is worth a single frame once it is off screen. Scrolling
     down the page used to leave six animated layers running against the
     compositor forever; now they park until the hero comes back. */
  useEffect(() => {
    const el = surfaceRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), {
      rootMargin: '200px 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div
        ref={surfaceRef}
        className={`art-surface ${live ? '' : 'art-idle'}`}
        aria-hidden="true"
      >
        <div className="glow" />

        <div className="curtain-field">
          {/* Back layer — wide, slow folds reading as depth behind the rest */}
          <div className="curtain curtain-c" />
          {/* Mid layer, hung inside a billowing frame */}
          <div className="billow">
            <div className="curtain curtain-b" />
          </div>
          {/* Front layer — the crisp folds */}
          <div className="curtain curtain-a" />
          <div className="sheen" />
          {/* the floor-up falloff, painted rather than masked */}
          <div className="curtain-veil" />
        </div>

        <div className="art-grid" />
      </div>

      {/* Grid-intersection marks — the drawing detail, corners only */}
      <div className="pointer-events-none absolute inset-0 z-[2] text-white/25" aria-hidden="true">
        <span className="crosshair left-5 top-5 sm:left-7 sm:top-7 lg:left-9 lg:top-9" />
        <span className="crosshair right-5 top-5 sm:right-7 sm:top-7 lg:right-9 lg:top-9" />
        <span className="crosshair bottom-5 left-5 sm:bottom-7 sm:left-7 lg:bottom-9 lg:left-9" />
        <span className="crosshair bottom-5 right-5 sm:bottom-7 sm:right-7 lg:bottom-9 lg:right-9" />
      </div>
    </>
  );
}

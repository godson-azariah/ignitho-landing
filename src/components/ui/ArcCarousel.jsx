/* A looping, draggable arc of cards, after the Google Labs experiments
   rail: the card in the middle stands highest and straight, and each card
   to either side drops a little and tilts outward, so the row reads as a
   fan. Drag it, flick it, or use the two arrows under it; it never ends,
   because the positions are taken modulo the count. Short lists are
   repeated until the fan has enough cards to close.

   Positions are written straight to the DOM each frame rather than through
   state, so a drag costs one transform per card and no React render.
   Styles in carousel.css. */

import { useEffect, useMemo, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const MIN_CARDS = 9; /* enough for the fan to close on the widest screens */
const TILT = 0; /* degrees per card away from the middle: a straight row */
const DROP = 0; /* px per card squared away from the middle */
const EASE = 0.11; /* how fast the row settles on its target each frame */

/* One suite as a card: a short picture band with the suite's number and
   icon, then the name, its line, the measured target and the way in. */
export function SuiteTile({ suite, onOpen }) {
  const Icon = suite.icon;
  return (
    <button type="button" className="arc-card" onClick={() => onOpen?.(suite.id)}>
      <span className="arc-media">
        <img src={suite.imageUrl} alt="" loading="lazy" decoding="async" draggable={false} />
        <span className="arc-num">Suite {suite.number}</span>
        <span className="arc-ico">
          <Icon strokeWidth={1.9} />
        </span>
      </span>
      <span className="arc-name">{suite.name}</span>
      <span className="arc-tag">{suite.tagline}</span>
      <span className="arc-roi">
        <span>Measured target ROI</span>
        <b>{suite.businessImpact}</b>
      </span>
    </button>
  );
}

export function ArcCarousel({ items, onOpen }) {
  const stage = useRef(null);
  const cards = useRef([]);
  const s = useRef({ x: 0, target: 0, raf: 0, drag: null, moved: false });

  /* repeat short lists so the loop closes without a gap */
  const list = useMemo(() => {
    const out = [];
    for (let c = 0; out.length < Math.max(MIN_CARDS, items.length); c++) {
      items.forEach((it) => out.push({ ...it, key: `${it.id}-${c}` }));
    }
    return out;
  }, [items]);
  const n = list.length;

  /* re-run whenever the list changes (a tab, a search), not only when its
     length does: the same count with different cards still needs laying
     out, and refs past the new end must not linger */
  useEffect(() => {
    const st = s.current;
    st.x = 0;
    st.target = 0;
    cards.current.length = n;
    const el = stage.current;
    if (!el) return undefined;

    const step = () => (el.offsetWidth < 640 ? 272 : 380);
    const layout = () => {
      const w = el.offsetWidth;
      const reach = w / step() / 2 + 1; /* cards past this are off screen */
      cards.current.forEach((card, i) => {
        if (!card) return;
        let d = (((i - st.x) % n) + n) % n;
        if (d > n / 2) d -= n;
        const off = Math.abs(d) > reach;
        card.style.transform = `translate3d(calc(-50% + ${(d * step()).toFixed(1)}px), ${(d * d * DROP).toFixed(1)}px, 0) rotate(${(d * TILT).toFixed(2)}deg)`;
        card.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
        card.style.visibility = off ? 'hidden' : 'visible';
      });
    };
    const tick = () => {
      const diff = st.target - st.x;
      if (Math.abs(diff) < 0.0005) {
        st.x = st.target;
        layout();
        st.raf = 0;
        return;
      }
      st.x += diff * EASE;
      layout();
      st.raf = requestAnimationFrame(tick);
    };
    const go = () => {
      if (!st.raf) st.raf = requestAnimationFrame(tick);
    };
    el.__go = go; /* the arrows and the drag handlers below reach these here */
    el.__layout = layout;

    /* a two-finger swipe on a trackpad: a sideways wheel moves the row one
       to one, and when the fingers lift it settles on the nearest card. An
       upright wheel is left alone, so the page still scrolls past. Not
       passive, because a sideways swipe must not also go back a page. */
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      cancelAnimationFrame(st.raf);
      st.raf = 0;
      st.x += e.deltaX / step();
      st.target = st.x;
      layout();
      clearTimeout(st.snap);
      st.snap = setTimeout(() => {
        st.target = Math.round(st.x);
        go();
      }, 140);
    };
    el.addEventListener('wheel', onWheel, { passive: false });

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    return () => {
      ro.disconnect();
      el.removeEventListener('wheel', onWheel);
      clearTimeout(st.snap);
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    };
  }, [list, n]);

  const nudge = (dir) => {
    const st = s.current;
    st.target = Math.round(st.target) + dir;
    stage.current?.__go?.();
  };

  /* drag: the row follows the pointer one to one, then settles on the
     nearest card, carried a little further by the speed of the flick */
  const onDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const st = s.current;
    cancelAnimationFrame(st.raf);
    st.raf = 0;
    st.moved = false;
    st.drag = { px: e.clientX, x0: st.x, v: 0, t: performance.now(), last: e.clientX };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    e.currentTarget.classList.add('is-dragging');
  };
  const onMove = (e) => {
    const st = s.current;
    const d = st.drag;
    if (!d) return;
    const stepPx = stage.current.offsetWidth < 640 ? 272 : 380;
    const dx = e.clientX - d.px;
    if (Math.abs(dx) > 6) st.moved = true;
    const now = performance.now();
    const dt = Math.max(1, now - d.t);
    d.v = (e.clientX - d.last) / dt; /* px per ms */
    d.last = e.clientX;
    d.t = now;
    st.x = d.x0 - dx / stepPx;
    st.target = st.x;
    stage.current.__layout?.(); /* the pointer drives; draw this frame now */
  };
  const onUp = (e) => {
    const st = s.current;
    const d = st.drag;
    if (!d) return;
    st.drag = null;
    e.currentTarget.classList.remove('is-dragging');
    const stepPx = stage.current.offsetWidth < 640 ? 272 : 380;
    const throwCards = (-d.v * 220) / stepPx; /* a flick carries on a bit */
    st.target = Math.round(st.x + Math.max(-2, Math.min(2, throwCards)));
    stage.current.__go?.();
  };
  const onClickCapture = (e) => {
    if (s.current.moved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="arc">
      <div
        ref={stage}
        className="arc-stage"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={onClickCapture}
      >
        {list.map((suite, i) => (
          <div key={suite.key} ref={(el) => (cards.current[i] = el)} className="arc-slot">
            <SuiteTile suite={suite} onOpen={onOpen} />
          </div>
        ))}
      </div>
      <div className="arc-nav">
        <button type="button" aria-label="Previous" onClick={() => nudge(-1)}>
          <ArrowLeft strokeWidth={2} />
        </button>
        <button type="button" aria-label="Next" onClick={() => nudge(1)}>
          <ArrowRight strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

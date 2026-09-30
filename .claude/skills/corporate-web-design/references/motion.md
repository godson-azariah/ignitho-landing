# Motion Implementation (React + Vite, no dependencies)

## CSS tokens and reveal styles
```css
:root {
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-ui: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-wipe: cubic-bezier(0.77, 0, 0.175, 1);
  --dur-hover: 180ms;
  --dur-ui: 280ms;
  --dur-reveal: 800ms;
  --dur-intro: 1100ms;
  --stagger: 80ms;
}

/* Hidden only once JS has confirmed it can reveal, so SSR and no-JS pages stay visible */
.reveal-ready [data-reveal] {
  opacity: 0;
  transform: translate3d(0, 24px, 0);
  transition:
    opacity var(--dur-reveal) var(--ease-out-expo),
    transform var(--dur-reveal) var(--ease-out-expo);
  transition-delay: calc(var(--i, 0) * var(--stagger));
}
.reveal-ready [data-reveal].is-in { opacity: 1; transform: none; }

/* Line mask: wrap each headline line in <span class="line"><span>…</span></span> */
.line { display: block; overflow: hidden; padding-bottom: 0.08em; }
.line > span { display: block; transition: transform var(--dur-intro) var(--ease-out-expo);
  transition-delay: calc(150ms + var(--i, 0) * var(--stagger)); }
.reveal-ready [data-reveal="lines"] { opacity: 1; transform: none; }
.reveal-ready [data-reveal="lines"]:not(.is-in) .line > span { transform: translate3d(0, 105%, 0); }

/* Clip unmask for media */
.reveal-ready [data-reveal="clip"] {
  opacity: 1; transform: none;
  clip-path: inset(6% round 24px);
  transition: clip-path var(--dur-intro) var(--ease-out-expo);
}
.reveal-ready [data-reveal="clip"].is-in { clip-path: inset(0 round 24px); }
[data-reveal="clip"] img, [data-reveal="clip"] video {
  transform: scale(1.06); transition: transform 1400ms var(--ease-out-expo);
}
[data-reveal="clip"].is-in img, [data-reveal="clip"].is-in video { transform: none; }

@media (prefers-reduced-motion: reduce) {
  .reveal-ready [data-reveal], .reveal-ready [data-reveal] * {
    opacity: 1 !important; transform: none !important; clip-path: none !important; transition: none !important;
  }
}
```

## One observer for the whole page
```jsx
// src/hooks/useReveal.js — call once in App
import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target); // reveal once
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    const scan = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    scan();
    root.classList.add('reveal-ready');
    const mo = new MutationObserver(scan); // pick up sections mounted later
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}
```
Usage: `<div data-reveal style={{ '--i': index }}>`. The hero uses `data-reveal="lines"`, and it is in view on load, so it animates straight away.

## Count-up stat
```jsx
function CountUp({ to, duration = 1200, suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(to); // SSR and no-JS show the final value
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current; let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t) => { const p = Math.min((t - t0) / duration, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 4)))); if (p < 1) raf = requestAnimationFrame(tick); };
      setN(0); raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el); return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{n}{suffix}</span>;
}
```

## Micro-interactions
```css
.btn { transition: background-color var(--dur-hover) var(--ease-standard), transform var(--dur-hover) var(--ease-standard); }
.btn:active { transform: scale(0.98); }
.btn .arrow { transition: transform var(--dur-ui) var(--ease-ui); }
.btn:hover .arrow { transform: translateX(3px); }

.card { transition: border-color var(--dur-ui) var(--ease-ui), transform var(--dur-ui) var(--ease-ui); }
.card:hover { transform: translateY(-2px); border-color: rgb(10 10 11 / 0.16); }

.link { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition: background-size var(--dur-ui) var(--ease-ui); }
.link:hover { background-size: 100% 1px; }

.nav { transition: background-color var(--dur-ui), border-color var(--dur-ui), backdrop-filter var(--dur-ui); }
.nav.is-scrolled { background: rgb(255 255 255 / 0.72); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }

@keyframes marquee { to { transform: translateX(-50%); } } /* the track holds 2 copies of the logos */
.marquee-track { animation: marquee 50s linear infinite; }
.marquee:hover .marquee-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
```

## Motion budget per page
- Use at most **one** signature moment, either the hero line mask or one clip unmask on the main visual.
- Everything else uses fade-up with stagger. Never stack two effects on one element.
- If more than 3 things animate at once outside the hero, reduce the number.

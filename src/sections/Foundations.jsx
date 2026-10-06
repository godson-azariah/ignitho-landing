/* The three universal foundations (section 2). Each suite card ends in a
   small dark pill, "Open its accelerators". Pressing it grows that pill,
   in place, into an island the way the Dynamic Island grows out of its
   compact state: one spring, no pause, the pill's label giving way to the
   contents as the shape opens. The island is only as big as it needs to be
   (a header and the three accelerator cards), sits over the cards within
   their own box, and shrinks back into the very same pill on close, so
   nothing blinks: the card underneath never goes anywhere.

   The motion follows Apple's spring model (damping ratio and response):
   a slight overshoot on the way open, critically damped on the way back.
   The island is laid out once at its final size and revealed by a
   clip-path from the pill's rectangle, so no frame re-lays anything out.

   `accelerators` is the id the top bar's "Capability Modules" scrolls to.
   Styles in island.css (.di-). Earlier versions are kept in
   design-research/backup. */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SuiteCard } from '../components/ui/SuiteCard.jsx';
import { SUITES } from '../data/suites.js';
import { SHELL } from '../lib/layout.js';

const FOUNDATIONS = SUITES.filter((s) => s.type === 'foundation');
const SUBTITLE = 'Agentic AI';
const CTA = 'Open its agent';
const INK = '#16063a';

/* Apple's spring, by damping ratio and response (seconds), sampled into a
   CSS linear() easing; returns the easing and the settle time. */
function appleSpring(dampingRatio, response) {
  const w = (2 * Math.PI) / response;
  const k = w * w;
  const c = 2 * dampingRatio * w;
  const dt = 1 / 240;
  let x = 0;
  let v = 0;
  let t = 0;
  const pts = [0];
  while (t < 2) {
    v += (-k * (x - 1) - c * v) * dt;
    x += v * dt;
    t += dt;
    pts.push(x);
    if (t > 0.2 && Math.abs(1 - x) < 0.0006 && Math.abs(v) < 0.006) break;
  }
  const step = Math.max(1, Math.floor(pts.length / 90));
  const kept = pts.filter((_, i) => i % step === 0);
  kept[kept.length - 1] = 1;
  return { easing: `linear(${kept.map((p) => p.toFixed(4)).join(', ')})`, ms: Math.round(t * 1000) };
}
const OPEN = appleSpring(0.82, 0.4);
const CLOSE = appleSpring(1, 0.3);

const still = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Island({ suite, pill, closing, onClose }) {
  const shell = useRef(null);
  const inner = useRef(null);
  const label = useRef(null);
  const [pillBox, setPillBox] = useState(null);
  const Icon = suite.icon;
  const picks = suite.accelerators.slice(0, 3);

  useEffect(() => {
    const el = shell.current;
    const box = el?.parentElement;
    if (!el || !box || !pill) return undefined;
    const r = box.getBoundingClientRect();

    /* its own size: the contents' width up to the box's, the contents'
       height; placed so it grows out of the pill, inside the box */
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.width = `${Math.min(r.width, 960)}px`;
    el.style.height = '';
    const w = el.offsetWidth;
    /* its height is its contents' (no stretched, half-empty cards), centred
       in the box the cards stood in */
    const h = el.offsetHeight;
    /* the contents grow out of the pill, not out of the island's middle */
    inner.current.style.transformOrigin = `${pill.left - r.left - Math.max(0, (r.width - w) / 2) + pill.width / 2}px ${pill.top - r.top}px`;
    /* centred in the cards' box */
    const left = Math.max(0, (r.width - w) / 2);
    /* on a phone the cards are a tall column: it opens over the card that
       was pressed, from that card's top, and the other cards stay in place
       (dimmed) around it, so the section never stands empty */
    const phone = r.width < 768;
    const top = phone
      ? Math.max(0, Math.min(pill.cardTop - r.top, r.height - h))
      : Math.max(0, (r.height - h) / 2);
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;

    /* the pill's rectangle, in the island's own coordinates */
    const pl = pill.left - r.left - left;
    const pt = pill.top - r.top - top;
    setPillBox({ left: pl, top: pt, width: pill.width, height: pill.height });
    const pr = pill.height / 2;
    const pillClip = `inset(${pt}px ${w - pl - pill.width}px ${h - pt - pill.height}px ${pl}px round ${pr}px)`;
    const openClip = 'inset(0px 0px 0px 0px round 28px)';

    /* on a phone, bring the whole island into view if it opens past an
       edge of the screen (never on the way back) */
    if (phone && !closing) {
      const st = el.getBoundingClientRect().top;
      const sb = st + h;
      let by = 0;
      if (st < 88) by = st - 88;
      else if (sb > window.innerHeight - 16) by = Math.min(st - 88, sb - window.innerHeight + 16);
      if (by) window.scrollBy({ top: by, behavior: still() ? 'auto' : 'smooth' });
    }

    if (still()) {
      el.classList.add('is-settled');
      return undefined;
    }
    const anims = [];
    let raf = 0;
    if (!closing) {
      el.classList.remove('is-settled');
      /* first frame at the pill, the spring from the next one */
      el.style.clipPath = pillClip;
      inner.current.style.opacity = '0';
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => {
          el.style.clipPath = '';
          inner.current.style.opacity = '';
          /* the dark pill turns white as it opens */
          const a = el.animate(
            [
              { clipPath: pillClip, backgroundColor: INK },
              { backgroundColor: '#ffffff', offset: 0.28 },
              { clipPath: openClip, backgroundColor: '#ffffff' }
            ],
            {
              duration: OPEN.ms,
              easing: OPEN.easing,
              fill: 'both'
            }
          );
          a.onfinish = () => el.classList.add('is-settled');
          anims.push(
            a,
            label.current.animate([{ opacity: 1 }, { opacity: 0, offset: 0.16 }, { opacity: 0 }], {
              duration: OPEN.ms,
              fill: 'both'
            }),
            inner.current.animate(
              [
                { opacity: 0, transform: 'scale(0.96)' },
                { opacity: 0, transform: 'scale(0.96)', offset: 0.14 },
                { opacity: 1, transform: 'scale(1)', offset: 0.6 },
                { opacity: 1, transform: 'scale(1)' }
              ],
              { duration: OPEN.ms, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'both' }
            )
          );
        });
      });
    } else {
      el.classList.remove('is-settled');
      anims.push(
        el.animate(
          [
            { clipPath: openClip, backgroundColor: '#ffffff' },
            { backgroundColor: '#ffffff', offset: 0.6 },
            { clipPath: pillClip, backgroundColor: INK }
          ],
          {
            duration: CLOSE.ms,
            easing: CLOSE.easing,
            fill: 'both'
          }
        ),
        inner.current.animate(
          [
            { opacity: 1, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0.97)', offset: 0.3 },
            { opacity: 0 }
          ],
          { duration: CLOSE.ms, fill: 'both' }
        ),
        label.current.animate([{ opacity: 0 }, { opacity: 0, offset: 0.55 }, { opacity: 1 }], {
          duration: CLOSE.ms,
          fill: 'both'
        })
      );
    }
    return () => {
      cancelAnimationFrame(raf);
      anims.forEach((x) => x.cancel());
    };
  }, [pill, closing]);

  useEffect(() => {
    if (closing) return undefined;
    shell.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && onClose(true);
    /* a press anywhere outside the island closes it, as a popover does */
    const onDown = (e) => {
      if (shell.current && !shell.current.contains(e.target)) onClose(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [closing, onClose]);

  return (
    <div
      ref={shell}
      className="di-shell"
      tabIndex={-1}
      role="region"
      aria-label={`${suite.name} accelerators`}
    >
      {/* the pill's own label, sitting exactly where the card's pill is */}
      <span
        ref={label}
        className="di-label"
        aria-hidden="true"
        style={
          pillBox
            ? { left: pillBox.left, top: pillBox.top, width: pillBox.width, height: pillBox.height }
            : undefined
        }
      >
        {CTA}
        <ArrowUpRight strokeWidth={2.4} />
      </span>

      <div ref={inner} className="di-inner">
        {/* THE BANNER, after the App Store's Today cards: the island keeps
            the card's own picture as its header, so the eye follows one
            object growing; the suite, its line and the close sit on it */}
        <div className="di-head di-banner">
          <img className="di-banner-img" src={suite.imageUrl} alt="" decoding="async" />
          <span className="di-app" aria-hidden="true">
            <Icon strokeWidth={1.9} />
          </span>
          <div className="di-titles">
            <h3 className="di-name">{suite.name}</h3>
            <p className="di-line">{suite.tagline}</p>
          </div>
          <button type="button" className="di-close" onClick={() => onClose(false)}>
            Close
            <X strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>

        <ul className="di-cards">
          {picks.map((a, i) => (
            <li key={a.name} className="di-card" style={{ '--i': i }}>
              <span className="di-tag">{a.type}</span>
              <span className="di-acc">{a.name}</span>
              <span className="di-rule" aria-hidden="true" />
              <span className="di-desc">{a.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Foundations() {
  const [open, setOpen] = useState(null);
  const [pill, setPill] = useState(null);
  const [closing, setClosing] = useState(false);
  const cardEls = useRef({});
  /* the pill's rectangle, and the top of its card (where the island opens
     on a phone) */
  const pillOf = (id) => {
    const card = cardEls.current[id];
    const p = card?.querySelector('[data-cta-pill]')?.getBoundingClientRect();
    if (!p) return null;
    return { left: p.left, top: p.top, width: p.width, height: p.height, cardTop: card.getBoundingClientRect().top };
  };

  const openFrom = (id) => {
    if (open) return;
    setPill(pillOf(id));
    setClosing(false);
    setOpen(id);
  };
  /* focus goes back to the card only when the island was closed from the
     keyboard; a pointer close leaves no ring behind */
  const close = useCallback(
    (fromKeys = false) => {
      if (!open || closing) return;
      setPill(pillOf(open));
      setClosing(true);
      window.setTimeout(
        () => {
          const back = cardEls.current[open]?.querySelector('button');
          setOpen(null);
          setClosing(false);
          if (fromKeys === true) back?.focus({ preventScroll: true });
        },
        still() ? 0 : CLOSE.ms
      );
    },
    [open, closing]
  );
  const openSuite = FOUNDATIONS.find((s) => s.id === open);

  return (
    <section id="accelerators" className="fr-section bg-b dots">
      <div className={SHELL}>
        <FadeIn className="uf-head plate">
          <h2 className="sec-title">
            <span>Built on three</span>
            <span className="sec-accent">universal foundations</span>
          </h2>
          <p className="uf-lede">
            Every application runs on the same three suites, and each ships with its own accelerators. Choose
            a foundation to open its accelerators
          </p>
        </FadeIn>

        <div className={`fr-suites ${open ? 'has-open' : ''} ${closing ? 'is-closing' : ''}`}>
          {FOUNDATIONS.map((s, i) => (
            <FadeIn key={s.id} delay={i * 90} className="fr-suite">
              <div
                ref={(el) => (cardEls.current[s.id] = el)}
                className={`fr-suite-in ${open === s.id ? 'is-active' : ''}`}
              >
                <SuiteCard suite={s} index={i} subtitle={SUBTITLE} cta={CTA} ctaPill onOpen={openFrom} />
              </div>
            </FadeIn>
          ))}
          {openSuite && <Island suite={openSuite} pill={pill} closing={closing} onClose={close} />}
        </div>
      </div>
    </section>
  );
}

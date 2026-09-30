/* How it works (section 3): the film on the left, one continuous take
   through the four scenes of AI Studio on a loop, shown whole in a tinted
   frame; the four steps on the right as a stack of cards. The card whose
   scene is on screen is raised and in full ink, with a line along its foot
   that fills for as long as the scene runs; the others sit back. Pressing a
   card jumps the film to its scene. Every card keeps its height, so the
   column never moves. Styles in method.css (.gc). Earlier versions are kept
   in design-research/backup. */

import { useCallback, useEffect, useRef, useState } from 'react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { MethodStage } from '../components/artwork/MethodScenes.jsx';
import { HOW_IT_WORKS } from '../data/howItWorks.js';
import { SHELL } from '../lib/layout.js';

/* how long each scene runs before the film moves on (its script, at the
   film's tempo, plus a beat on its finished frame) */
const SCENE_MS = [14500, 13000, 11500, 9500];

export function AutonomousWorkflow() {
  const band = useRef(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(false);
  const pan = useRef(null);

  /* A PHONE SEES THE FILM AT A READABLE SIZE, a window onto it that pans
     to wherever the cursor is about to act. The film is drawn wider than
     the window (see .gc-pan), and each point the film reports (a fraction
     of its width and height) is brought as near the window's centre as the
     edges allow. Pan only: the film is never scaled, so nothing blurs. A
     new scene starts from its top-left corner. On a wider screen the film
     is shown whole and this does nothing. */
  const follow = useCallback((pt) => {
    const film = pan.current;
    const view = film?.parentElement;
    if (!film || !view) return;
    if (!window.matchMedia('(max-width: 767px)').matches) {
      film.style.transform = '';
      return;
    }
    if (!pt) {
      film.style.transform = 'translate3d(0, 0, 0)';
      return;
    }
    if (pt.wide) return;
    const fw = film.offsetWidth;
    const fh = film.offsetHeight;
    const vw = view.clientWidth;
    const vh = view.clientHeight;
    const tx = Math.min(0, Math.max(vw - fw, vw / 2 - pt.x * fw));
    const ty = Math.min(0, Math.max(vh - fh, vh / 2 - pt.y * fh));
    film.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
  }, []);

  useEffect(() => {
    setStill(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true);
    const el = band.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* the film moves on when the scene has run; a press on a step restarts
     the clock from that scene */
  useEffect(() => {
    if (!inView || still) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % HOW_IT_WORKS.length), SCENE_MS[active]);
    return () => clearTimeout(t);
  }, [active, inView, still]);

  return (
    <section id="workflow" ref={band} className="gc bg-c dots">
      <div className={SHELL}>
        <FadeIn className="gc-head plate">
          <h2 className="gc-title">From Business Intent to Validated Production Code</h2>
          <p className="gc-lede">
            The method coordinates data, privacy, code generation, testing, governance and deployment as one
            continuous workflow
          </p>
        </FadeIn>

        <div className="gc-split">
          <FadeIn className="gc-stage">
            <div className="gc-frame" aria-hidden="true">
              <div className="gc-view">
                <div ref={pan} className="gc-pan">
                  <MethodStage active={active} running={inView} still={still} onFocus={follow} />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn as="ol" delay={80} className="gc-steps plate">
            {HOW_IT_WORKS.map((step, i) => {
              const on = i === active;
              return (
                <li
                  key={step.id}
                  className={`gc-step ${on ? 'is-on' : ''}`}
                  style={{ '--ms': `${SCENE_MS[i]}ms` }}
                >
                  <button
                    type="button"
                    className="gc-step-btn"
                    aria-current={on ? 'step' : undefined}
                    onClick={() => setActive(i)}
                  >
                    <span className="gc-rail" aria-hidden="true">
                      <i
                        key={on ? `on-${active}-${inView}` : 'off'}
                        className={inView && !still ? 'is-run' : ''}
                      />
                    </span>
                    <span className="gc-step-title">{step.title}</span>
                    <span className="gc-step-fold">
                      <span className="gc-step-body">{step.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

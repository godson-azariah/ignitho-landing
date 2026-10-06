/* The six industry applications, as one row of cards that can be dragged
   (or swiped, or stepped with the arrows) and simply stops at the first
   and the last card: no loop. It snaps to a card when let go. The card is
   the suite tile from ArcCarousel.jsx (the looping arc and the plain grid
   are kept in design-research/backup). The
   three foundations have their own place under the workflow, so they are
   not repeated here.

   The search box is tied to the one in the opening band, so clearing either
   one clears both. */

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SuiteTile } from '../components/ui/ArcCarousel.jsx';
import { Button } from '../components/ui/Button.jsx';
import { SUITES } from '../data/suites.js';
import { SHELL } from '../lib/layout.js';

const INDUSTRY = SUITES.filter((s) => s.type === 'industry');

/* ONE LOWERCASE HAYSTACK PER SUITE, including the accelerators: they are
   the named things on the page, and what anyone would actually type. Built
   once at module load rather than on every keystroke. */
const HAYSTACK = new Map(
  INDUSTRY.map((suite) => [
    suite.id,
    [
      suite.name,
      suite.tagline,
      suite.executiveSummary,
      suite.businessImpact,
      ...(suite.subDomains ?? []),
      ...suite.accelerators.flatMap((a) => [a.name, a.type, a.desc])
    ]
      .join(' ')
      .toLowerCase()
  ])
);

const matchesSearch = (suite, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (HAYSTACK.get(suite.id) ?? '').includes(q);
};

/* THE ROW. Native horizontal scrolling with snap, so touch and trackpads
   behave as they should; a mouse can also drag it (snap is off while
   dragging and settles the row on a card after), and a drag never counts
   as a click on the card under it. The arrows step one card and dim at the
   ends. */
function SuiteRail({ items, onOpen }) {
  const row = useRef(null);
  const drag = useRef(null);
  const dragged = useRef(false);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = row.current;
    if (!el) return undefined;
    const update = () =>
      setEdge({
        start: el.scrollLeft < 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  const step = (dir) => {
    const el = row.current;
    const slot = el?.querySelector('.st-slot');
    if (!el || !slot) return;
    el.scrollBy({ left: dir * (slot.offsetWidth + 20), behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = row.current;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    dragged.current = false;
    const move = (ev) => {
      const dx = ev.clientX - drag.current.x;
      if (Math.abs(dx) > 5 && !dragged.current) {
        dragged.current = true;
        el.classList.add('is-dragging');
      }
      if (dragged.current) el.scrollLeft = drag.current.left - dx;
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      el.classList.remove('is-dragging');
      drag.current = null;
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  const onClickCapture = (e) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
      dragged.current = false;
    }
  };

  return (
    <div className="st-rail">
      <ul ref={row} className="st-row" onPointerDown={onPointerDown} onClickCapture={onClickCapture}>
        {items.map((suite) => (
          <li key={suite.id} className="st-slot">
            <SuiteTile suite={suite} onOpen={onOpen} />
          </li>
        ))}
      </ul>
      <div className={`${SHELL} st-nav`}>
        <button type="button" aria-label="Previous" disabled={edge.start} onClick={() => step(-1)}>
          <ArrowLeft strokeWidth={2.2} />
        </button>
        <button type="button" aria-label="Next" disabled={edge.end} onClick={() => step(1)}>
          <ArrowRight strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

/* The search term arrives from the page container, because the field that
   sets it lives in the hero. */
export function Catalog({ openSuite, searchQuery, setSearchQuery }) {
  const filteredSuites = useMemo(
    () => INDUSTRY.filter((s) => matchesSearch(s, searchQuery)),
    [searchQuery]
  );

  /* `dots` brings the page's field to this band; every block that sits
     directly on it wears a `plate`, which clears the texture beneath it. */
  return (
    <section id="suites" className="bg-b dots relative py-16 md:py-24">
      <div className={SHELL}>
        <FadeIn className="reveal-soft plate mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-[11px] font-bold tracking-[0.055em] text-ig-purple shadow-[0_10px_30px_-18px_rgba(22,6,58,0.6)]">
            Enterprise Automation Solutions
          </span>
          <h2 className="sec-title mt-6">
            <span>A repeatable method, applied to</span>
            <span className="sec-accent">enterprise automation</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px]">
            Foundation and industry applications turn complex requirements into governed,
            repeatable data and AI workflows
          </p>
        </FadeIn>

        {/* The evidence that a search is on, and the way off it. Not wrapped
            in `FadeIn`: it mounts mid-page in response to a press. */}
        {searchQuery && (
          <div className="mt-6 flex justify-center">
            <span className="inline-flex max-w-full items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_18px_50px_-32px_rgba(22,6,58,0.8)]">
              <Search className="h-3.5 w-3.5 shrink-0 text-ig-purple" strokeWidth={2.4} />
              <span className="truncate text-[13.5px] font-semibold tracking-[-0.01em] text-ig-ink">
                {searchQuery}
              </span>
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ig-muted transition-colors hover:bg-ig-ink/[0.07] hover:text-ig-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          </div>
        )}
      </div>

      {filteredSuites.length === 0 ? (
        <div className={`${SHELL} mt-14`}>
          <div className="plate flex flex-col items-center gap-4 rounded-[20px] border border-dashed border-ig-ink/25 py-24 text-center">
            <Search className="h-5 w-5 text-ig-divider" />
            <p className="font-mono text-[11px] tracking-[0.055em] text-ig-muted">
              0 results for “{searchQuery}”
            </p>
            <Button
              onClick={() => setSearchQuery('')}
              variant="ink"
              className="px-6 py-3 text-[12.5px] font-semibold"
            >
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <FadeIn delay={120}>
          <SuiteRail items={filteredSuites} onOpen={openSuite} />
        </FadeIn>
      )}
    </section>
  );
}

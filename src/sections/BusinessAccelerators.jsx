/* The named agents, in a band of their own between the four cards and the
   catalogue. It is where the savings calculator used to sit, which is why the
   page's alternation of backgrounds still runs dark, lavender, near-white,
   lavender, near-white, dark without anything else moving.

   Pressing one searches the catalogue for it, because that is the only sensible
   thing a named workflow can do here: it belongs to a suite, and the suite is
   what you can actually open.

   ── A RAIL, NOT A GRID ──────────────────────────────────────────────────

   Nine cards in a 3x3 grid is nine equal claims stacked into a block, and a
   block that size has to be read rather than scanned. It also fixed the card
   at a third of the page and then asked four short lines to fill it, which is
   where the empty space in the middle of every one came from.

   One row that runs off the edge inverts both. The card is sized to its
   content instead of to a column, the row is three-and-a-bit cards long
   instead of three rows deep, and the one that is cut off at the right edge
   says there is more without a caption saying so. */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { CornerMark } from '../components/ui/CornerMark.jsx';
import { NAMED_AGENTS, TOTAL_ACCELERATORS } from '../data/agents.js';
import { SHELL } from '../lib/layout.js';
import { scrollEase } from '../lib/scrollEase.js';

/* THE CARD IS #16063A, the token this site calls `ink` and uses for every dark
   moment on the page.

   White was a white shape on a #FBF9FF band with only a shadow between them,
   and a pale lavender tint was the same problem one shade further on: both are
   versions of the ground. A rail reads as a shelf of objects, and an object has
   to be a different thing from what it is standing on, so the card goes to the
   other end of the range instead of one step along it.

   It also keeps the band's two card styles apart. The pair above is #5212BA,
   full-strength violet, at the size of a paragraph you read; these are
   near-black at the size of a tile you scan. */
const CARD = '#16063A';

export function BusinessAccelerators({ onSearch }) {
  const rail = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Two booleans and nothing else. Setting a piece of state to the value it
     already holds does not re-render, so a handler this cheap can run on every
     scroll event and still only cost something twice per rail — once when the
     row leaves the start, once when it reaches the end. Anything more than two
     booleans in here and nine cards would be re-rendering mid-gesture. */
  const readEnds = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    readEnds();
    window.addEventListener('resize', readEnds);
    return () => window.removeEventListener('resize', readEnds);
  }, [readEnds]);

  /* ── DRAG THE ROW WITH THE POINTER ────────────────────────────────────
     `overflow-x` gives a wheel and a trackpad and nothing else: on a mouse the
     row could only be moved by the two buttons, and a row of cards that
     visibly runs off the edge invites a drag whether or not one is offered.

     Refs and not state, because this runs on pointermove. A single `setState`
     in here would re-render nine cards on every frame of the gesture.

     Snapping is switched off for the duration and put back on release.
     Assigning `scrollLeft` against a live snap container makes the browser
     re-snap on every assignment, which fights the hand moving the row; on
     release it snaps once, which is the part worth having.

     Touch is left alone deliberately. The browser's own touch scrolling has
     momentum and rubber-banding that this cannot reproduce, and replacing it
     with a worse copy is the usual cost of a carousel. */
  const drag = useRef(null);
  const moved = useRef(false);

  const onPointerDown = (e) => {
    const el = rail.current;
    if (!el || e.pointerType === 'touch' || e.button !== 0) return;
    moved.current = false;
    drag.current = { x: e.clientX, left: el.scrollLeft, id: e.pointerId };
    el.style.scrollSnapType = 'none';
  };

  const onPointerMove = (e) => {
    const el = rail.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = e.clientX - d.x;
    /* Under five pixels this is a click with a shaky hand, not a drag. Above
       it, the pointer is captured so the row keeps following even when the
       cursor leaves the rail. */
    if (!moved.current) {
      if (Math.abs(dx) < 5) return;
      moved.current = true;
      el.setPointerCapture?.(d.id);
    }
    el.scrollLeft = d.left - dx;
  };

  const endDrag = () => {
    const el = rail.current;
    const d = drag.current;
    if (!el || !d) return;
    drag.current = null;
    el.style.scrollSnapType = '';
    if (el.hasPointerCapture?.(d.id)) el.releasePointerCapture(d.id);
  };

  /* A drag that ends on a card is followed by a click on that card, and
     without this every drag would also open a suite. Caught on the way down so
     it never reaches the button, and cleared here rather than on release, so a
     drag that ends on the gap between two cards cannot leave the flag set and
     swallow the next real press. */
  const onClickCapture = (e) => {
    if (!moved.current) return;
    moved.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  /* One card per press, measured rather than assumed: the distance between the
     left edges of the first two children is the card plus the gap, whatever
     either of them currently is. Nothing here has to be told the width, so
     changing the card size or the gap cannot put the button out of step. */
  const nudge = (dir) => {
    const el = rail.current;
    if (!el) return;
    const kids = el.children;
    const step =
      kids.length > 1
        ? kids[1].getBoundingClientRect().left - kids[0].getBoundingClientRect().left
        : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: scrollEase() });
  };

  return (
    <section id="accelerators" className="bg-c dots relative py-16 md:py-24">
      <div className={SHELL}>
        <CornerMark className="-top-7 left-1 md:left-3" />
        <CornerMark className="-top-7 right-1 md:right-3" />

        <FadeIn className="reveal-soft plate mx-auto max-w-4xl text-center">
          <SectionLabel index="03" centered>
            Specialized Capabilities
          </SectionLabel>
          {/* Shares no important word with any other heading on the page */}
          <h2 className="balance mt-5 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(30px,4.8vw,64px)] text-ig-ink">
            Business Accelerators
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px]">
            Focused capabilities that extend the core method: data validation,
            security, cost control and output verification
          </p>
        </FadeIn>

        {/* The count and the controls on one line, over the rail they belong
            to. The count moved out of the centred header and down here because
            it is the rail's own caption: nine of thirty-one, and the two
            buttons are how you reach the rest. */}
        <div className="mt-10 flex items-center justify-between gap-4 md:mt-12">
          <span className="font-mono text-[10.5px] font-bold tracking-[0.055em] text-ig-muted">
            {TOTAL_ACCELERATORS} capabilities available
          </span>
          {/* Disabled at the ends rather than left live and inert. An arrow
              that can be pressed and does nothing is worse than no arrow. */}
          <span className="flex shrink-0 gap-2">
            {[
              { dir: -1, Icon: ChevronLeft, label: 'Scroll left', off: atStart },
              { dir: 1, Icon: ChevronRight, label: 'Scroll right', off: atEnd }
            ].map(({ dir, Icon, label, off }) => (
              <button
                key={label}
                type="button"
                onClick={() => nudge(dir)}
                disabled={off}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-ig-ink shadow-[0_1px_2px_rgba(22,6,58,0.06),0_10px_24px_-18px_rgba(22,6,58,0.6)] ring-1 ring-inset ring-ig-ink/[0.08] transition-opacity duration-300 hover:ring-ig-purple/30 disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </button>
            ))}
          </span>
        </div>

        {/* THE ROW RUNS THE FULL WIDTH OF THE SHELL AND PADS ITSELF BACK.

            `-mx` cancels the shell's own padding so the scroller's edges are
            the page's edges, and the matching `px` puts the first card back on
            the same left margin as the heading above it. Without the pair, a
            card scrolled halfway out would stop dead at a margin the eye reads
            as the end of the row.

            Proximity snapping, not mandatory: with the buttons doing the
            precise moves, a mandatory snap only fights a trackpad. */}
        <div
          ref={rail}
          onScroll={readEnds}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          /* `pt-2 pb-6` is not spacing, it is clearance. `overflow-x-auto`
             forces `overflow-y` to auto as well — the pair cannot be split — so
             anything the cards draw outside themselves is cut off at the
             scroller's edges. That is what the straight dark line under the row
             was: a 54px shadow sliced flat at 20px of padding.

             `select-none` because dragging a row of text selects it, and a
             half-highlighted card mid-drag looks like something has gone
             wrong. */
          className="no-bar -mx-5 mt-4 flex cursor-grab snap-x snap-proximity scroll-pl-5 select-none gap-4 overflow-x-auto px-5 pb-6 pt-2 active:cursor-grabbing md:-mx-8 md:scroll-pl-8 md:px-8 lg:gap-5"
        >
          {NAMED_AGENTS.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <FadeIn
                key={agent.name}
                delay={Math.min(i * 70, 280)}
                className="w-[280px] shrink-0 snap-start sm:w-[304px] lg:w-[330px]"
              >
                <button
                  type="button"
                  onClick={() => onSearch(agent.search)}
                  style={{ backgroundColor: CARD }}
                  /* `lift` is the page's smallest hover: 3px and a shadow, on
                     pointer devices only. `group` is what lets the arrow move
                     with it. */
                  className="lift group relative flex h-full w-full flex-col overflow-hidden rounded-[20px] p-6 text-left shadow-[0_1px_2px_rgba(22,6,58,0.1),0_14px_30px_-22px_rgba(22,6,58,0.55)]"
                >
                  {/* The hover is the hairline going from a barely-there white
                      to sky, plus the lift and the arrow. Drawn as a layer
                      rather than a `ring-` utility on the button, because
                      `.lift` sets the `transition` shorthand from a stylesheet
                      that loads after the CDN's — written on the button itself
                      the colour would snap instead of fading. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/[0.09] transition-[box-shadow] duration-300 group-hover:ring-ig-sky/40"
                  />

                  {/* What it is on the left, which one it is on the right — the
                      same split the four method cards use, so the numbering
                      reads the same way in both places. The icon is bare: in a
                      tinted rounded square it was the one shape on this page
                      that belonged to every other AI landing page as well. */}
                  <span className="relative flex items-center justify-between gap-3">
                    <span className="inline-flex min-w-0 items-center gap-2.5">
                      <Icon className="h-[18px] w-[18px] shrink-0 text-ig-sky" strokeWidth={2} />
                      <span className="truncate font-mono text-[10px] font-bold tracking-[0.055em] text-ig-lavender/70">
                        {agent.badge}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[13px] font-bold tracking-[0.06em] text-ig-sky">
                      {agent.n}
                    </span>
                  </span>

                  <span className="relative mt-6 block text-[18px] font-extrabold leading-[1.25] tracking-[-0.022em] text-white">
                    {agent.name}
                  </span>
                  {/* `balance` because these run to two or three lines at this
                      measure and most of them ended on one word sitting alone
                      under a full line. */}
                  <span className="balance relative mt-2.5 block flex-1 text-[13.5px] leading-[1.55] text-ig-lavender/80">
                    {agent.desc}
                  </span>

                  {/* The way out, over a rule. Every other card on the page
                      that leads somewhere ends this way, so a reader who has
                      met one already knows what this is. */}
                  <span className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-[10px] font-bold tracking-[0.055em] text-ig-lavender/70">
                      Find the suite
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-ig-sky transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2.4}
                    />
                  </span>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

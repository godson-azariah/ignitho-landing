/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE NINE SUITES — "Three foundations, six verticals"

   WHERE YOU SEE THIS
     The fourth section of the home page, on the pale lavender band.

   WHAT IS IN HERE
     · The three filter buttons: All 9 Suites, 3 Universal Foundations,
       6 Industry Verticals. On a phone these become a strip you swipe
       sideways.
     · The search box, tied to the one in the hero — searching or
       clearing in either place affects both.
     · The grid-or-list switch to the right of the search box.
     · The nine suite cards, or the same nine as a list of rows with a
       preview card that follows your pointer.
     · Clicking any suite opens that suite own page.

   WORTH KNOWING
     The suite names and descriptions are not here — they live in
     data/suites.js.
   ========================================================================== */

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SuiteCard } from '../components/ui/SuiteCard.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ViewToggle } from '../components/ui/ViewToggle.jsx';
import { SUITES } from '../data/suites.js';
import { TABS } from '../data/navigation.js';
import { ROW_FILL, SHELL } from '../lib/layout.js';
import { scrollEase } from '../lib/scrollEase.js';
import { PEEK_H, useSuitePreview } from '../hooks/useSuitePreview.js';

const matchesTab = (suite, tab) =>
  tab === 'ALL' ||
  (tab === 'FOUNDATION' && suite.type === 'foundation') ||
  (tab === 'INDUSTRY' && suite.type === 'industry');

const matchesSearch = (suite, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    suite.name.toLowerCase().includes(q) ||
    suite.tagline.toLowerCase().includes(q) ||
    suite.executiveSummary.toLowerCase().includes(q)
  );
};

/* The search term now arrives from the page container, because the field that sets it
   lives in the hero. The tab and the view stay here: nothing outside this
   section has any use for them. */
export function Catalog({ openSuite, searchQuery, setSearchQuery }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [view, setView] = useState('grid');

  // the segmented control's pill measures the active tab and glides to it
  const tabRefs = useRef([]);
  const stripRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const filteredSuites = useMemo(
    () => SUITES.filter((s) => matchesTab(s, activeTab) && matchesSearch(s, searchQuery)),
    [activeTab, searchQuery]
  );

  const { listRef, previewRef, previewSuite, previewOn, hoverId, setPreviewOn } =
    useSuitePreview(filteredSuites);

  useEffect(() => {
    const measure = () => {
      const el = tabRefs.current[TABS.findIndex((t) => t.id === activeTab)];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    // fonts land after first paint and change the tab widths
    const t = setTimeout(measure, 250);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [activeTab]);

  /* Bring the chosen chip fully into view on the phone-width strip.

     Separate from the measurement above even though both key off `activeTab`,
     because that one also runs on every resize and after a 250ms font timeout
     — and yanking the strip sideways because the window was dragged is not
     something anyone asked for. This runs once per change of tab.

     Measured with `getBoundingClientRect` rather than `offsetLeft`: the
     button's offset parent is the inner group, which itself sits inside the
     scroller behind 20px of padding, so `offsetLeft` would be short by
     however much that chain contributes. Visible-screen rectangles have no such
     chain — the delta between the two is the exact distance to travel.

     The guard is what makes this desktop-safe: from `sm` the container is
     `overflow-visible`, so there is nothing to scroll, `scrollWidth` equals
     `clientWidth`, and the whole effect is a no-op. */
  useEffect(() => {
    const strip = stripRef.current;
    const el = tabRefs.current[TABS.findIndex((t) => t.id === activeTab)];
    if (!strip || !el || strip.scrollWidth <= strip.clientWidth + 1) return;
    const chip = el.getBoundingClientRect();
    const box = strip.getBoundingClientRect();
    strip.scrollTo({
      left: strip.scrollLeft + (chip.left - box.left) - (box.width - chip.width) / 2,
      behavior: scrollEase()
    });
  }, [activeTab]);

  /* Which panel of the reel is showing. Must stay below `filteredSuites` —
     reading it any earlier is a temporal dead zone, and because the ternary
     short-circuits while nothing is hovered, the crash only surfaces on the
     first hover rather than on mount. */
  const peekIndex = previewSuite
    ? Math.max(
        0,
        filteredSuites.findIndex((s) => s.id === previewSuite.id)
      )
    : 0;

  /* The reel's nine panels only change when the filter does. Every suite is
     rendered into one tall strip, so changing rows moves a single transform and
     nothing re-mounts — no image reloads, no opacity churn. */
  const peekPanels = useMemo(
    () =>
      filteredSuites.map((s) => (
        <div key={s.id} style={{ height: PEEK_H }}>
          <div className="h-[150px] overflow-hidden">
            <img
              src={s.imageUrl}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[142px] px-5 py-4">
            <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-teal">
              {s.number}
            </span>
            <p className="mt-1.5 truncate text-[14px] font-extrabold leading-[1.2] tracking-[-0.02em] text-ig-ink">
              {s.name}
            </p>
            <p className="mt-2.5 clamp-3 border-t border-ig-ink/10 pt-2.5 text-[11.5px] leading-[1.45] text-ig-muted">
              {s.businessImpact}
            </p>
          </div>
        </div>
      )),
    [filteredSuites]
  );

  /* `dots` brings the page's two-layer field — 28px dots under 56px rules —
     to the one band that was still bare. Nothing is masked away by guessing
     where the copy might land: every block that sits DIRECTLY on this ground
     wears a `plate`, which clears the texture beneath it with a blurred wash
     of the band's own colour. The suite cards and the white controls need
     none of that, because an opaque surface already covers what is behind
     it. */
  return (
    <section id="suites-catalog" className="bg-b dots relative pb-24 pt-12 md:pb-32 md:pt-16">
      <div className={SHELL}>
        <FadeIn className="reveal-soft plate mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-[11px] font-bold tracking-[0.055em] text-ig-purple shadow-[0_10px_30px_-18px_rgba(22,6,58,0.6)]">
            Enterprise Catalog
          </span>
          {/* Names how the catalogue is actually split, which is the one
              thing a reader needs before touching the control directly
              underneath — the tabs offer exactly these two filters, "3
              Universal Foundations" and "6 Industry Verticals".

              It also drops "built". The hero now reads "built to run", and a
              heading two sections later repeating the same word spends it
              twice for no gain. */}
          <h2 className="mt-5 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(32px,4.8vw,64px)] text-ig-ink">
            Three foundations,{' '}
            <span className="serif-accent font-normal text-ig-purple">
              six verticals
            </span>
          </h2>
        </FadeIn>

        {/* Segmented control — the indicator measures each tab and glides */}
        {/* ON A PHONE THIS IS A SCROLLING CHIP STRIP, NOT A SEGMENTED CONTROL.

            One row of segments cannot be made to fit at any padding: the three
            labels are 78, 150 and 130px of type before a single pixel of it —
            358px inside the 323px a 375px screen leaves. Wrapping it was the
            first attempt and it read as an accident, because `justify-center`
            centres the orphaned second line under the GAP in the first.
            Stacking it was the second, and it read as a menu: three
            full-width rows one under another is the shape of a list of
            destinations, not of a filter with one of three states.

            So: the shape every mobile UI actually uses for a filter row that
            does not fit — a horizontally scrolling strip of pills. It is worth
            naming the three things that make that pattern work, because
            leaving any of them out is what makes a scroll strip feel broken:

              · IT BLEEDS TO THE SCREEN EDGE. `-mx-5 px-5` cancels the page container's
                gutter and puts it back inside the scroll box, so the last
                chip is cut off by the VISIBLE PART OF THE SCREEN rather than stopping short of
                it. A strip that ends inside a margin looks finished, and a
                strip that looks finished never gets scrolled.
              · NO SCROLLBAR. `.no-bar` — a 10px violet lane under a 42px row
                of chips is thicker than the thing it measures.
              · THE ACTIVE CHIP SCROLLS ITSELF INTO VIEW, below. Tapping the
                half-visible third chip must not leave you looking at a
                selection you cannot see.

            The chips also stop being segments and become chips: each one
            carries its own white fill and thin line on the lavender ground,
            which is the same pill the hero uses for its starting points. The
            white card and the gliding indicator return at `sm`, where there
            is width for the real control. */}
        <FadeIn delay={80} className="mt-7">
          <div
            ref={stripRef}
            /* `py-1.5` is for the focus ring, not for looks. Setting
                `overflow-x` to anything but `visible` forces `overflow-y` to
                compute to `auto` as well, so this box clips vertically
                whether it was asked to or not — and the focus outline is 2px
                at a 3px offset, which puts it 5px outside the chip and into
                exactly that clip. Six pixels of padding holds it. Gone at
                `sm`, where the box does not scroll and does not clip. */
            className="no-bar -mx-5 flex gap-2 overflow-x-auto px-5 py-1.5 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0 sm:py-0"
          >
            <div className="relative inline-flex shrink-0 gap-2 sm:gap-1 sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-[0_18px_50px_-30px_rgba(22,6,58,0.7)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1.5 top-1.5 hidden rounded-full bg-ig-violet transition-all duration-500 ease-out sm:block"
                style={{ left: `${indicator.left}px`, width: `${indicator.width}px` }}
              />
              {TABS.map((tab, i) => {
                const on = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={on}
                    /* `sm:border-0` and `sm:bg-transparent` are what turn a
                       chip back into a segment: from `sm` the card behind
                       supplies the surface and the indicator supplies the
                       fill, so the chip must own neither. Both live in the
                       base list rather than in the two state strings, because
                       an `sm:` utility outranks a base one whichever state
                       is active. */
                    className={`relative z-10 shrink-0 whitespace-nowrap rounded-full border px-4 py-3 text-[13px] font-semibold transition-colors duration-300 sm:border-0 sm:bg-transparent sm:px-7 sm:py-3.5 ${
                      on
                        ? 'border-ig-violet bg-ig-violet text-white'
                        : 'border-ig-ink/12 bg-white text-ig-muted hover:text-ig-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* The field itself is in the hero now, so what is left here is the
            evidence that a filter is on — and the way off it. Without this,
            arriving at a short catalogue looks like a catalogue that is
            short, and the only way back to all nine is to scroll up hunting
            for a control you may not remember using.

            Not wrapped in `FadeIn`: it mounts mid-page in response to a
            press, and an element that starts hidden and waits to be observed
            is the wrong behaviour for something that must appear at once. */}
        {searchQuery && (
          <div className="mt-5 flex justify-center">
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

        {/* One fixed home for the view switch, so it never jumps or
            disappears when you change views */}
        <FadeIn delay={160} className="mt-8 flex justify-end">
          <ViewToggle view={view} setView={setView} />
        </FadeIn>
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
      ) : view === 'grid' ? (
        /* ---------- GRID: a plain responsive grid on the page's own
             vertical scroll. No horizontal track, so no snapping, no
             progress bar and no arrows to discover — you just scroll.

             The card is cut down to what earns a place at this size: the
             image, what the suite is, and the number it aims at. The
             executive summary and the three outcomes belong on the suite
             page, which is one click away, and at nine cards abreast they
             were the whole reason the old card ran past 700px tall. ---- */
        <div className={`${SHELL} mt-10`}>
          {/* Held in from the page container's full 1360px. Three columns of nine
              is the right count, so narrowing the track is what narrows
              the card — 360px rather than 440px, which lets the type come
              up a size without the heading needing a third line. */}
          {/* Capped at one card's width while there is only one column.
              Three across 1120px makes a 360px card, and every measurement
              inside it — the 92px image band, the two-line heading, the
              clamped tagline — is set for a card about that wide. At one
              column the same card stretched to the full 600px a small tablet
              gives it, which left the 92px band reading as a stripe and the
              headings as single short lines adrift in a wide box. The cap
              lifts at `sm`, where the second column takes over. */}
          <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-x-5 gap-y-8 sm:max-w-[1120px] sm:grid-cols-2 lg:grid-cols-3">
            {filteredSuites.map((suite, i) => (
              <FadeIn key={suite.id} delay={Math.min(i * 45, 260)}>
                <SuiteCard suite={suite} index={i} onOpen={openSuite} />
              </FadeIn>
            ))}
          </div>
        </div>
      ) : (
        /* ---------- INDEX: ruled rows that fill with the brand gradient ---------- */
        <div className={`${SHELL} mt-10`}>

          {/* The list carries a preview card that trails the pointer */}
          {/* no move/leave handlers — the window-level pointer drives it,
              so the list behaves the same whether you move or scroll */}
          {/* The rows are the one place in this section where text sits on
              the bare ground — the grid's cards are opaque white, so they
              need nothing. `plate` clears the field behind the whole list at
              once rather than per row, which also keeps the dividing rules
              reading as one continuous set.

              It is safe for the hover preview: `plate` sets `z-index: 0` and
              so opens a stacking context, but the peek card is a child of
              this element and carries `z-30`, so it still sits above every
              row inside it. */}
          <div ref={listRef} className="plate relative">
            {filteredSuites.map((suite, i) => (
              <FadeIn key={suite.id} delay={Math.min(i * 45, 260)}>
                {/* `data-suite-id` is the handle syncPeek hit-tests for.
                    `row-on` is the lit state — a class rather than
                    :hover, so scrolling a row under the cursor lights it
                    exactly as moving onto it does. The semantic classes
                    below let one CSS rule per part carry that state. */}
                <button
                  onClick={() => openSuite(suite.id)}
                  data-suite-id={suite.id}
                  onFocus={() => setPreviewOn(false)}
                  className={`row relative block w-full overflow-hidden border-b border-ig-ink/15 text-left ${
                    hoverId === suite.id ? 'row-on' : ''
                  }`}
                >
                  <span
                    className={`row-fill pointer-events-none absolute inset-0 ${ROW_FILL}`}
                  />

                  {/* `gap-3.5` on a phone, and only on a phone. Once the name
                      wraps instead of truncating, the gutters stop being
                      spacing and start being the thing deciding how many
                      lines it takes: 20px of gutter either side of the name
                      is 40px off a column that only has ~200px, which is the
                      difference between two lines and three across nine
                      rows. Restored to the original 20px at `sm`, where
                      there is width to spend again. */}
                  <span className="row-ink relative flex items-center gap-3.5 px-5 py-7 transition-colors duration-300 sm:gap-5 md:gap-9 md:px-8 md:py-8">
                    <span className="row-num font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider transition-colors duration-300">
                      {suite.number}
                    </span>

                    <span className="min-w-0 flex-1">
                      {/* THE NAME WRAPS ON A PHONE; ONLY THE TAGLINE STILL
                          TRUNCATES.

                          A row leaves the name about 180px on a 375px screen
                          once the home page, the gap and the 44px arrow are
                          taken out — room for roughly twenty characters,
                          where the names run to forty-six. So every row read
                          "Banking, Financial S…", which is not a list of
                          nine destinations, it is a list of nine ellipses.

                          The tagline keeps its clip: it is the second line,
                          it is there to colour the name rather than to
                          identify the row, and two wrapping lines per row
                          would make the list twice as tall for no gain. */}
                      <span className="row-name block text-[17px] font-extrabold leading-[1.15] tracking-[-0.025em] text-ig-ink transition-colors duration-300 sm:truncate sm:text-[19px] sm:leading-normal md:text-[28px]">
                        {suite.name}
                      </span>
                      <span className="row-tag serif-accent mt-1 block truncate text-[15px] text-ig-purple transition-colors duration-300 md:text-[18px]">
                        {suite.tagline}
                      </span>
                    </span>

                    <span className="row-cta grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ig-ink/20 text-ig-ink transition-colors duration-300">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </span>
                </button>
              </FadeIn>
            ))}

            {previewSuite && (
              <div
                ref={previewRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-30 hidden will-change-transform lg:block"
              >
                <div className={`peek ${previewOn ? 'is-on' : ''}`}>
                  {/* Fixed shell clipping one tall reel. Every suite is
                      already rendered inside it, so changing rows moves
                      a single transform and nothing re-mounts. */}
                  <div
                    className="w-[300px] overflow-hidden rounded-[18px] bg-white shadow-[0_34px_80px_-34px_rgba(22,6,58,0.75)]"
                    style={{ height: PEEK_H }}
                  >
                    <div
                      className="peek-reel"
                      style={{ transform: `translate3d(0, ${-peekIndex * PEEK_H}px, 0)` }}
                    >
                      {peekPanels}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { Reveal } from '../components/Reveal.jsx';
import { SuiteCard } from '../components/SuiteCard.jsx';
import { SwapButton } from '../components/SwapButton.jsx';
import { ViewToggle } from '../components/ViewToggle.jsx';
import { SUITES } from '../data/suites.js';
import { TABS } from '../data/navigation.js';
import { ROW_FILL, SHELL } from '../lib/layout.js';
import { PEEK_H, useSuitePeek } from '../lib/useSuitePeek.js';

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

export function Catalog({ openSuite }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');

  // the segmented control's pill measures the active tab and glides to it
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const filteredSuites = useMemo(
    () => SUITES.filter((s) => matchesTab(s, activeTab) && matchesSearch(s, searchQuery)),
    [activeTab, searchQuery]
  );

  const { listRef, previewRef, previewSuite, previewOn, hoverId, setPreviewOn } =
    useSuitePeek(filteredSuites);

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

  return (
    <section id="suites-catalog" className="bg-b relative py-24 md:py-32">
      <div className={SHELL}>
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-[11px] font-bold tracking-[0.055em] text-ig-purple shadow-[0_10px_30px_-18px_rgba(22,6,58,0.6)]">
            Enterprise Catalog
          </span>
          <h2 className="mt-8 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(32px,4.8vw,64px)] text-ig-ink">
            Our 9 Core{' '}
            <span className="serif-accent font-normal text-ig-purple">
              Enterprise AI Suites
            </span>
          </h2>
        </Reveal>

        {/* Segmented control — the indicator measures each tab and glides */}
        <Reveal delay={80} className="mt-11 flex justify-center">
          <div className="relative inline-flex w-full max-w-full flex-wrap justify-center gap-1 rounded-[28px] bg-white p-1.5 shadow-[0_18px_50px_-30px_rgba(22,6,58,0.7)] sm:w-auto sm:flex-nowrap sm:rounded-full">
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
                  className={`relative z-10 whitespace-nowrap rounded-full px-5 py-3 text-[13px] font-semibold transition-colors duration-300 sm:px-7 sm:py-3.5 ${
                    on
                      ? 'bg-ig-violet text-white sm:bg-transparent'
                      : 'text-ig-muted hover:text-ig-ink'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Search sits with the thing it filters, not up in the hero */}
        <Reveal delay={120} className="mx-auto mt-5 flex max-w-2xl items-stretch rounded-full bg-white shadow-[0_18px_50px_-32px_rgba(22,6,58,0.8)] ring-1 ring-inset ring-ig-ink/8 transition-shadow duration-300 focus-within:ring-2 focus-within:ring-ig-teal">
          <span className="grid w-[54px] shrink-0 place-items-center text-ig-purple">
            <Search className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <input
            type="text"
            placeholder="Search capabilities (e.g. Data Cleaning, Proposals, Invoices, Clinical Trials)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent py-4 pr-4 text-[13.5px] tracking-[-0.01em] text-ig-text outline-none placeholder:text-ig-muted/65 md:text-[14.5px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear"
              className="mr-2 grid w-10 shrink-0 place-items-center text-ig-muted transition-colors hover:text-ig-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </Reveal>

        {/* One fixed home for the view switch, so it never jumps or
            disappears when you change views */}
        <Reveal delay={160} className="mt-8 flex justify-end">
          <ViewToggle view={view} setView={setView} />
        </Reveal>
      </div>

      {filteredSuites.length === 0 ? (
        <div className={`${SHELL} mt-14`}>
          <div className="flex flex-col items-center gap-4 border border-dashed border-ig-ink/25 py-24 text-center">
            <Search className="h-5 w-5 text-ig-divider" />
            <p className="font-mono text-[11px] tracking-[0.055em] text-ig-muted">
              0 results for “{searchQuery}”
            </p>
            <SwapButton
              onClick={() => setSearchQuery('')}
              variant="ink"
              className="px-6 py-3 text-[12.5px] font-semibold"
            >
              Clear
            </SwapButton>
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
          {/* Held in from the shell's full 1360px. Three columns of nine
              is the right count, so narrowing the track is what narrows
              the card — 360px rather than 440px, which lets the type come
              up a size without the heading needing a third line. */}
          <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSuites.map((suite, i) => (
              <Reveal key={suite.id} delay={Math.min(i * 45, 260)}>
                <SuiteCard suite={suite} index={i} onOpen={openSuite} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        /* ---------- INDEX: ruled rows that fill with the brand gradient ---------- */
        <div className={`${SHELL} mt-10`}>

          {/* The list carries a preview card that trails the pointer */}
          {/* no move/leave handlers — the window-level pointer drives it,
              so the list behaves the same whether you move or scroll */}
          <div ref={listRef} className="relative">
            {filteredSuites.map((suite, i) => (
              <Reveal key={suite.id} delay={Math.min(i * 45, 260)}>
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

                  <span className="row-ink relative flex items-center gap-5 px-5 py-7 transition-colors duration-300 md:gap-9 md:px-8 md:py-8">
                    <span className="row-num font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider transition-colors duration-300">
                      {suite.number}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="row-name block truncate text-[19px] font-extrabold tracking-[-0.025em] text-ig-ink transition-colors duration-300 md:text-[28px]">
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
              </Reveal>
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

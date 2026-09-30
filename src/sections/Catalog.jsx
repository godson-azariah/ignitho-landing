/* The six industry applications, as a looping, draggable arc of cards
   (ArcCarousel.jsx), after the Google Labs experiments rail. The three
   foundations have their own place under the workflow, so they are not
   repeated here.

   The search box is tied to the one in the opening band, so clearing either
   one clears both. */

import { useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { ArcCarousel } from '../components/ui/ArcCarousel.jsx';
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
          <h2 className="mt-6 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(30px,4.8vw,64px)] text-ig-ink">
            A repeatable method, applied to{' '}
            <span className="serif-accent font-normal text-ig-purple">
              enterprise automation
            </span>
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
        /* The arc runs the full width of the page, edge to edge, so the
           outer cards are cut by the screen rather than by a margin */
        <FadeIn delay={120}>
          <ArcCarousel items={filteredSuites} onOpen={openSuite} />
        </FadeIn>
      )}
    </section>
  );
}

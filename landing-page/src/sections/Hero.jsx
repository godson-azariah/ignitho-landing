import { useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { HeroStage } from '../components/HeroStage.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { SEARCH_SUGGESTIONS } from '../data/navigation.js';
import { SHELL } from '../lib/layout.js';

/* `onSearch(query)` is the hero's only outward action: it puts the query on
   the catalogue and scrolls there.

   THE FIELD KEEPS ITS OWN VALUE WHILE YOU TYPE, and only hands it up when you
   submit. Lifting the value to the shell instead would have meant every
   keystroke re-rendering the pillars, the calculator and nine suite cards —
   the exact whole-page churn the shell was restructured to stop. Typing is
   local; committing is shared. */
export function Hero({ onSearch }) {
  const [query, setQuery] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };
  return (
    <section
      id="overview"
      /* CENTRED IN THE VIEW, NOT PADDED INTO IT.

         Now that the section is a full viewport tall, its contents have to be
         centred in what is left of it or the leftover height all collects at
         the bottom — which is the gap you could see.

         `justify-center` on the section does that, and the top padding is
         exactly the height of the fixed masthead (72px, 84px from md) and
         nothing more. That is the part that makes it look right rather than
         merely be right: the bar covers the top of the section, so centring
         against the section's own edges would leave visibly less air above
         the eyebrow than below the chips. Clearing the bar first means the
         content is centred in the space you can actually see.

         The small bottom padding biases it a few pixels upward, which is what
         the eye reads as level. And because the section only has a MINIMUM
         height, content taller than the viewport grows it instead of
         overflowing — so nothing can ever slide up under the bar.

         The stage is unaffected: both of `HeroStage`'s layers are absolutely
         positioned, so they take no part in this and keep filling the
         section edge to edge. */
      className="aurora hero-viewport relative flex flex-col justify-center overflow-hidden pb-8 pt-[72px] md:pb-10 md:pt-[84px]"
    >
      <HeroStage />

      <div className={SHELL}>
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/15 py-4">
            {/* the eyebrow — sky, per the brand's rule for dark surfaces */}
            <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-sky md:text-[11px]">
              Transforming Ignitho into an AI-First Enterprise Partner
            </span>
            <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-lavender/45 md:text-[11px]">
              Enterprise AI Platform
            </span>
          </div>

          {/* CENTRE-STACKED, after the reference.

              One column down the middle — headline, then the line under it,
              then the field, then the starting points. The old hero put the
              copy and the buttons in two columns side by side, which works
              when the pair are of equal weight. A search field is not of
              equal weight with anything: it is the one thing on the page you
              are meant to use, and the moment it shares a row it reads as an
              option rather than as the point. */}
          <Reveal className="pt-7 text-center md:pt-9">
            <h1 className="mx-auto max-w-[19ch] font-extrabold leading-[0.9] tracking-[-0.045em] text-[clamp(38px,7.3vw,106px)] text-white">
              <span className="line-mask">
                <span>Workflow-Driven</span>
              </span>
              <span className="line-mask">
                <span style={{ transitionDelay: '90ms' }}>
                  AI Solutions{' '}
                  {/* headline stays white on dark; the serif italic and
                      the outlined word carry the accent, not colour */}
                  <span className="serif-accent font-normal text-white">Delivering</span>
                </span>
              </span>
              <span className="line-mask">
                <span style={{ transitionDelay: '180ms' }}>
                  <span className="stroke-lilac">Measurable</span> Enterprise ROI
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal className="mx-auto mt-5 max-w-[62ch] text-center md:mt-6">
            {/* Full-strength lavender rather than the spec's ~75%, plus
                medium weight. At 400 and 75% this sat too close to the
                gradient behind it; #D6CDEE at full opacity is nearly
                white but keeps the tint, which is what stops it going
                grey and lifeless the way low-alpha white does here. */}
            <p className="text-[17px] font-medium leading-[1.5] tracking-[-0.01em] text-ig-lavender md:text-[20px]">
              Move away from unguided prompt chats.{' '}
              <span className="serif-accent text-white">Ignitho AI</span> delivers
              pre-built, domain-specific AI accelerators that automate complex business
              operations safely and repeatably
            </p>
          </Reveal>

          {/* Widened from 680px so the six starting points sit on one row.
              They measure a shade over 770px laid out end to end, so the
              track is set past that rather than exactly at it — the chips are
              set in Urbanist, and a webfont that lands a frame late reflows
              at slightly different widths than the fallback it replaces. A
              track sized to the measurement would drop the last chip for that
              one frame. */}
          <Reveal delay={120} className="mx-auto mt-7 w-full max-w-[880px] md:mt-8">
            {/* A white field on the dark ground, so it reads as the one
                place to act rather than as another dark panel. The submit
                control lives inside the pill: on a rounded field an
                adjacent button always looks like it came loose. */}
            <form onSubmit={submit} role="search">
              <div className="flex items-stretch rounded-full bg-white p-2 shadow-[0_26px_70px_-28px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/20 transition-shadow duration-300 focus-within:ring-2 focus-within:ring-ig-teal">
                <span className="grid w-[46px] shrink-0 place-items-center text-ig-purple">
                  <Search className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search the suite catalogue"
                  placeholder="Describe what you need to solve"
                  className="min-w-0 flex-1 bg-transparent py-3 pr-3 text-[14.5px] tracking-[-0.01em] text-ig-text outline-none placeholder:text-ig-muted/65 md:text-[15.5px]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear"
                    className="mr-1 grid w-9 shrink-0 place-items-center rounded-full text-ig-muted transition-colors hover:bg-ig-ink/[0.07] hover:text-ig-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Search"
                  className="group grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ig-teal text-white transition-colors duration-300 hover:bg-ig-teal-hover"
                >
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={2.4}
                  />
                </button>
              </div>
            </form>

            {/* The quiet line the reference runs directly under its field —
                it tells you the field is finished being explained, which is
                what lets the chips below read as a separate offer. */}
            <p className="mt-3.5 text-center font-mono text-[11px] tracking-[0.05em] text-ig-lavender/45">
              Press enter, or start from one of these
            </p>

            {/* Starting points. These are buttons, not decoration — one
                press runs the search and takes you to the results. */}
            {/* `flex-wrap` stays: it is what carries the narrow screens,
                where six chips on one line is neither possible nor wanted.
                `whitespace-nowrap` is the real guard — it stops a single chip
                breaking across two lines inside its own pill, which looks
                broken in a way that a wrapped ROW of chips does not. */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SEARCH_SUGGESTIONS.map(({ label, term, icon: Icon }) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    onSearch(term);
                  }}
                  className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2.5 text-[12.5px] font-semibold text-ig-lavender transition-colors duration-300 hover:border-ig-teal-ring/50 hover:bg-ig-teal/20 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

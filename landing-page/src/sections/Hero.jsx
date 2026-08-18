/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE TOP OF THE HOME PAGE — the big dark purple opening

   WHERE YOU SEE THIS
     The very first thing you see: the dark violet band at the top of
     the home page.

   WHAT IS IN HERE
     · The small line "Transforming Ignitho into an AI-First Enterprise
       Partner" and "Enterprise AI Platform" on either end, above a thin
       rule.
     · The huge headline "Enterprise AI built to run not to prompt".
     · The sentence under it about moving away from prompt chats.
     · The white search box, and the six suggestion buttons under it —
       Governance, Compliance, Supply chain, Healthcare, Automation,
       Logistics.
     · Typing and pressing enter jumps you down to the nine suites and
       filters them.

   WORTH KNOWING
     The moving purple glow behind all of this is a separate file,
     components/stage/HeroStage.jsx.
   ========================================================================== */

import { useEffect, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { HeroStage } from '../components/stage/HeroStage.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { SEARCH_SUGGESTIONS } from '../data/navigation.js';
import { SHELL } from '../lib/layout.js';

/* `onSearch(query)` is the hero's only outward action: it puts the query on
   the catalogue and scrolls there.

   THE FIELD KEEPS ITS OWN VALUE WHILE YOU TYPE, and only hands it up when you
   submit. Lifting the value to the shell instead would have meant every
   keystroke re-rendering the pillars, the calculator and nine suite cards —
   the exact whole-page churn the shell was restructured to stop. Typing is
   local; committing is shared.

   `committed` IS THE OTHER HALF OF THAT, and without it the two ends of the
   search disagreed. The catalogue's chip clears the shared query, so the cards
   all came back — but this field still held the text, so scrolling back up
   showed a search that was no longer in effect, and clearing it again was the
   only way to make the page agree with itself. One search, two controls, and
   either one has to be able to end it. */
export function Hero({ onSearch, committed = '' }) {
  const [query, setQuery] = useState('');

  /* THE ONE DIRECTION THAT HAS TO BE SYNCED, and only when the committed value
     actually changes. It does not run per keystroke — `committed` only moves
     when something is submitted or cleared — so the local-typing property above
     is untouched. Typing still diverges from the committed search on purpose;
     what it can no longer do is survive that search being cancelled. */
  useEffect(() => {
    setQuery(committed);
  }, [committed]);

  const submit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  /* Clearing the field clears the SEARCH, not just the text in the box. That is
     the whole point of the fix: the button reads as "cancel this search"
     wherever it is pressed, and pressing it here no longer leaves the catalogue
     filtered by something the reader has just visibly deleted. `searchFor`
     skips its scroll for an empty query, so this stays put. */
  const clear = () => {
    setQuery('');
    if (committed) onSearch('');
  };
  return (
    <section
      id="overview"
      /* AS TALL AS ITS CONTENTS, NOT AS TALL AS THE VIEWPORT.

         The full-viewport lock is gone, and with it every problem that came
         out of it. A hero pinned to 100svh while holding ~570px of content
         has ~180px of slack it has to put SOMEWHERE — above the block, and
         the field sits too low; below it, and there is a hole over the next
         band. Centring only split the difference. None of those were
         spacing bugs; they were the same surplus height showing up in
         different places.

         Sizing to content deletes the surplus outright. The field lands
         where the copy above it leaves it, the last thing on the page is a
         row of chips rather than empty ground, and the next section shows
         its top edge — which is what tells you to keep scrolling.

         Padding does the work now: the masthead height plus 20px of air at
         the top, so the eyebrow clears the bar rather than sitting under it;
         a real measure at the bottom, since nothing is stretching to fill
         any more.

         The stage is unaffected — both of `HeroStage`'s layers are
         absolutely positioned, so they still fill the section edge to
         edge, whatever height it turns out to be. */
      className="aurora relative overflow-hidden pb-16 pt-[88px] md:pb-24 md:pt-[104px]"
    >
      <HeroStage />

      <div className={SHELL}>
        <div className="relative">
          {/* Back at the top, with `border-b` under it again.

              It is its own flex child rather than part of the group below,
              which is the whole reason it can sit here without the old
              problem: when the eyebrow was inside the centred group,
              centring put half the leftover height ABOVE it and opened a
              160px hole under the masthead. Separated out, it stays put and
              only the display block centres. */}
          {/* A COLUMN ON A PHONE, THE SAME SPLIT ROW FROM `sm` UP.

              `justify-between` needs two ends to push apart. On a 375px
              screen the left-hand label alone is wider than the row, so the
              two never sat on one line — they wrapped, and a wrapped
              `justify-between` row sets its last line hard left while the
              line above it is still stretched, which reads as a mistake
              rather than as a wrap.

              Stacked, both labels start from the same left edge, which is
              the only alignment a narrow column can hold. The type also
              drops a point: at 11px mono with 0.06em tracking the long
              label measures about 400px, so it takes three lines on a phone
              and two at 10px. */}
          {/* THE FIRST THING TO RESOLVE, and it used to be the one block here
              that did not animate at all — it was simply present. In a hero
              where everything below it arrives, that read as the page having
              started without it. It leads the sequence now. */}
          <Reveal className="reveal-soft flex flex-col items-start gap-1 border-b border-white/15 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2 sm:py-4">
            {/* the eyebrow — sky, per the brand's rule for dark surfaces */}
            <span className="font-mono text-[10px] font-bold leading-[1.5] tracking-[0.06em] text-ig-sky sm:text-[11px]">
              Transforming Ignitho into an AI-First Enterprise Partner
            </span>
            <span className="font-mono text-[10px] font-bold leading-[1.5] tracking-[0.06em] text-ig-lavender/60 sm:text-[11px]">
              Enterprise AI Platform
            </span>
          </Reveal>

          {/* CENTRE-STACKED, after the reference.

              One column down the middle — headline, then the line under it,
              then the field, then the starting points. The old hero put the
              copy and the buttons in two columns side by side, which works
              when the pair are of equal weight. A search field is not of
              equal weight with anything: it is the one thing on the page you
              are meant to use, and the moment it shares a row it reads as an
              option rather than as the point.

              No flex, no centring, no `flex-1`. All three existed to place
              this group inside a section taller than it needed to be, and
              the section is not taller than it needs to be any more. What is
              left is a block that starts under the eyebrow and ends at the
              chips, with one padding value above it. */}
          <div className="pt-8 md:pt-12">
          {/* THE INTRO IS ONE SEQUENCE OF FOUR: eyebrow, headline, the line
              under it, then the field. 170ms between each, widened from 90 to
              go with the slower curve — a stagger has to be read against the
              length of the thing it is staggering, and at 90ms against a 1.05s
              entrance all four were effectively arriving together. The
              published recipes for this effect put the spacing at 200–300ms;
              170 is the low end of that, which walks the eye down the block
              without making anyone wait for the field. Last element starts at
              510ms and the sequence is finished inside 1.6s.

              The headline's second line keeps its own extra 90ms, so the two
              halves of the display type still resolve one after the other
              inside the block's own arrival.

              `soft-lg` is here and nowhere else: this is the only display type
              on the site, and it is the one place the blur has to be large
              enough to be felt against 94px glyphs. */}
          <Reveal delay={170} className="reveal-soft soft-lg text-center">
            {/* The foil is the real win here: the paragraph directly under
                this has always opened "Move away from unguided prompt
                chats", so prompting was already the thing this page argues
                against — the headline just never said so, and the paragraph
                was left rebutting something nothing above it had raised.

                Read strictly, the two infinitives do not share a subject:
                "built to run" is the AI running, while the prompting is
                something the reader does. In practice "not to prompt" is
                read as a category — a thing you prompt at, versus a thing
                that runs — and the line break between the halves keeps them
                from being parsed as one tight parallel anyway.

                No comma before "not": the line break does that work, and the
                house rule is no trailing punctuation. */}
            {/* TWO LINES, AND THE MEASURE HAS TO WIDEN TO HOLD THEM.

                Merging "Enterprise AI" and "built to run" makes a 26-
                character line where the longest was 13. That doubles the
                width the same type size needs, so on the 880px measure the
                size would have had to fall to about 68px to fit — smaller
                than asked for, not "a bit" smaller.

                Widening the headline instead keeps the size up at 94px,
                where line one draws about 1160px in a 1296px shell. The
                headline is now the widest thing in the section rather than
                matching the column below it, which is the ordinary way
                display type behaves: it breaks the text measure on purpose.
                The flanks stay structured because it is nearly full-bleed —
                the same edges the eyebrow rule already marks.

                The break falls where the phrase already pauses, so the
                contrast still lands on a line of its own. */}
            {/* THREE LINES ON A PHONE, TWO FROM `md` UP — AND THE FLOOR OF THE
                CLAMP IS RAISED, NOT LOWERED, TO PAY FOR IT.

                Left to itself the two-line setting wraps on any phone: line
                one is 26 characters, which needs about 420px at the old 34px
                floor and has 335px on a 375px screen. So it broke anyway —
                just wherever the box ran out, which was after "built" and
                left the serif phrase split across two lines with "to run"
                stranded under it.

                Breaking it deliberately at the phrase instead gives three
                lines of at most 13 characters, and 13 characters is a third
                of the width the same type needed before. That is what lets
                the floor go UP from 34px to 40px: the longest mobile line now
                measures about 240px inside 280px on the narrowest phone
                there is, so the headline reads bigger on a small screen than
                it did while it was wrapping.

                Nothing above 571px is touched — that is where 7vw passes
                40px, so every viewport from a small tablet up resolves to the
                same 7vw it always did, and the two-line setting returns at
                `md` exactly as it was. */}
            <h1 className="mx-auto max-w-[1200px] font-extrabold leading-[0.88] tracking-[-0.045em] text-[clamp(40px,7vw,94px)] text-white">
              <span className="line-mask">
                <span>
                  {/* `block` below `md` is the forced break; `md:inline` puts
                      the two halves back on one line for the desktop
                      setting. The space between them is a leading space at
                      the start of a line while this is a block, and CSS
                      discards those, so it costs nothing on mobile and is
                      still the word space on desktop. */}
                  <span className="block md:inline">Enterprise AI</span>{' '}
                  {/* headline stays white on dark; the serif italic and
                      the outlined word carry the accent, not colour */}
                  <span className="serif-accent font-normal text-white">built to run</span>
                </span>
              </span>
              <span className="line-mask">
                <span style={{ transitionDelay: '90ms' }}>
                  not to <span className="stroke-lilac">prompt</span>
                </span>
              </span>
            </h1>
          </Reveal>

          {/* Also on the 880px measure, in place of the 62ch it used to
              carry. `ch` was pinning it to roughly 775px, which was close
              enough to the field to look like a mistake rather than a
              choice. On the wider measure it also falls to two lines instead
              of three, which pays for part of the taller headline. */}
          <Reveal delay={340} className="reveal-soft mx-auto mt-6 max-w-[880px] text-center md:mt-8">
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
          {/* The one wide gap in the stack, at the place the reference puts
              it: between the last line of copy and the field. Grouping on a
              centred layout is done with distance and nothing else — no
              columns, no rules — so this is what separates what we say from
              what you do. Everything else stays tight. */}
          {/* THE FIELD GROUP IS THE ONE BLOCK HERE THAT DOES NOT GET THE BLUR,
              and it is the exception that keeps the rest cheap. Inside it are a
              white pill with a 70px-spread shadow, an input, three buttons and
              six chips carrying `backdrop-blur-sm` — a filter on the wrapper
              would blur that whole composited subtree, including a backdrop
              filter nested inside a blur, which is the single most expensive
              thing this page could ask for on a weak GPU. It keeps the lift and
              the fade, which is all it needs: it arrives last either way. */}
          <Reveal delay={510} className="mx-auto mt-8 w-full max-w-[880px] md:mt-10">
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
                    onClick={clear}
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
            {/* Lifted from 45% to 60%. At 11px mono on this ground, 45% is
                below the point where the eye bothers to resolve it — the
                line was there without being readable, which is the worst of
                both. It is still the quietest thing in the group. */}
            <p className="mt-3.5 text-center font-mono text-[11px] tracking-[0.05em] text-ig-lavender/60">
              Press enter, or start from one of these
            </p>

            {/* Starting points. These are buttons, not decoration — one
                press runs the search and takes you to the results. */}
            {/* `flex-wrap` stays: it is what carries the narrow screens,
                where six chips on one line is neither possible nor wanted.
                `whitespace-nowrap` is the real guard — it stops a single chip
                breaking across two lines inside its own pill, which looks
                broken in a way that a wrapped ROW of chips does not. */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SEARCH_SUGGESTIONS.map(({ label, term, icon: Icon }) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    onSearch(term);
                  }}
                  className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/[0.11] px-4 py-2.5 text-[12.5px] font-semibold text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-ig-teal-ring/60 hover:bg-ig-teal/25 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

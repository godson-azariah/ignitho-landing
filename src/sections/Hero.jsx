/* The dark band at the very top, and the only part of the page that has to
   work in one screen.

   Five rows and nothing else: the eyebrow pair over a rule, the headline, one
   sentence, the search field, and three figures. Beside them from `xl`, the
   harness diagram.

   It used to hold nine groups. Nine things cannot have a hierarchy, only an
   order, which is why no arrangement of it looked deliberate. The line telling
   you how to use a search box went, and so did the six suggestion chips — a
   second way to run the search the field already runs, with the catalogue own
   filters two screens below doing it a third time.

   The purple light behind all of this is HeroGlow.jsx. */

import { useEffect, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { HarnessDiagram } from '../components/artwork/HarnessDiagram.jsx';
import { HeroGlow } from '../components/artwork/HeroGlow.jsx';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { HERO_FIGURES } from '../data/navigation.js';
import { SHELL } from '../lib/layout.js';

/* `onSearch(query)` is the hero's only outward action: it puts the query on
   the catalogue and scrolls there.

   THE field keeps its own value while you type, and only hands it up when you
   submit. Lifting the value to the page container instead would have meant every
   keystroke re-rendering the pillars, the calculator and nine suite cards —
   the exact whole-page churn the page container was restructured to stop. Typing is
   local; committing is shared.

   `committed` IS THE other half of that, and without it the two ends of the
   search disagreed. The catalogue's chip clears the shared query, so the cards
   all came back — but this field still held the text, so scrolling back up
   showed a search that was no longer in effect, and clearing it again was the
   only way to make the page agree with itself. One search, two controls, and
   either one has to be able to end it. */
export function Hero({ onSearch, committed = '' }) {
  const [query, setQuery] = useState('');

  /* THE one direction that has to be synced, and only when the committed value
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
      /* A FULL SCREEN TALL, WITH A FLOOR RATHER THAN A FIXED HEIGHT.

         `min-h` and not `h`, and the difference matters here: this band holds
         an eyebrow, a headline, a standfirst, a field and three figures. On a
         short laptop that still comes to more than one screen,
         and a fixed height would simply cut the figures off.
         As a floor it fills the screen when there is room, and grows when
         there is not.

         `svh` rather than `vh` on phones. `vh` is measured against the screen
         with the address bar hidden, so a 100vh band is around 60px taller
         than what anyone can actually see, and the bottom row sits just under
         the fold. `svh` is the small viewport: what is visible while the bar
         is showing.

         The padding stays as it was. The menu bar is fixed above this, so the
         top padding is what keeps the eyebrow clear of it, and `justify-center`
         then centres the block inside whatever is left. */
      className="aurora relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-[88px] md:pb-24 md:pt-[104px]"
    >
      <HeroGlow />

      <div className={SHELL}>
        <div className="relative">
          {/* Back at the top, with `border-b` under it again.

              It is its own flex child rather than part of the group below,
              which is the whole reason it can sit here without the old
              problem: when the eyebrow was inside the centred group,
              centring put half the leftover height ABOVE it and opened a
              160px hole under the top bar. Separated out, it stays put and
              only the display block centres. */}
          {/* A COLUMN ON A Phone, THE same split row from `sm` UP.

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
          {/* THE first thing to resolve, and it used to be the one block here
              that did not animate at all — it was simply present. In a hero
              where everything below it arrives, that read as the page having
              started without it. It leads the sequence now. */}
          <FadeIn className="reveal-soft flex flex-col items-start gap-1 border-b border-white/15 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2 sm:py-4">
            {/* the eyebrow — sky, per the brand's rule for dark surfaces */}
            <span className="font-mono text-[10px] font-bold leading-[1.5] tracking-[0.06em] text-ig-sky sm:text-[11px]">
              Enterprise AI Automation
            </span>
            <span className="font-mono text-[10px] font-bold leading-[1.5] tracking-[0.06em] text-ig-lavender/60 sm:text-[11px]">
              Auditable by design
            </span>
          </FadeIn>

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
          {/* COPY ON ONE SIDE, THE PRODUCT ON THE OTHER, from `xl`.

              The opening band used to be a centred column with nothing in it
              but words, and the first thing anyone saw was a description of the
              product rather than its shape. The diagram beside it fixes that:
              intent in one end, a checked pull request out the other, before a
              single sentence has been read.

              Stacked below `xl`, and the diagram is dropped there rather than
              squeezed. This band is a full screen tall, and on a phone the copy
              and the field already fill it — a picture underneath would either
              push the field off the bottom or shrink to the point of saying
              nothing. */}
          {/* THE 2XL COLUMN IS SIZED SO THE COPY LANDS EXACTLY ON ITS OWN 740.

              Above 1560 the shell is 1496 of content. The picture was a fixed
              598, which left the copy column 842 — and the copy is capped at
              740, so 102 of that column was dead: a hole between the search
              field and the first notification that nothing was in and nothing
              could line up against.

              Growing the picture 13 per cent closes it. 598 × 1.13 is 676, and
              740 + 80 + 676 is 1496 to within half a pixel, so the copy column
              comes out at the width the copy was already using and the gap
              between the two is the grid's own gap and nothing else.

              The height follows from the same move: the drawing is 428 tall, so
              at 1.13 it is 484 against a copy block of about 516, and the two
              now start and finish within 16 pixels of each other instead of 43
              and 65. Below 1536 the shell is too narrow for any of this and the
              picture stays at 598, where the copy column is already under 740
              and there is no hole to close. */}
          <div className="grid grid-cols-1 items-center gap-10 pt-8 md:pt-12 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-14 2xl:gap-20">
            <div className="min-w-0">
          {/* THE intro IS one sequence of four: eyebrow, headline, the line
              under it, then the field. 170ms between each, widened from 90 to
              go with the slower curve — a stagger has to be read against the
              length of the thing it is staggering, and at 90ms against a 1.05s
              entrance all four were effectively arriving together. The
              published recipes for this effect put the spacing at 200–300ms;
              170 is the low end of that, which walks the eye down the block
              without making anyone wait for the field. Last element starts at
              510ms and the sequence is finished inside 1.6s.

              The headline's second line keeps its own extra 90ms, so the two
              halves of the the biggest headline type still resolve one after the other
              inside the block's own arrival.

              `soft-lg` is here and nowhere else: this is the only the biggest headline type
              on the site, and it is the one place the blur has to be large
              enough to be felt against 94px letter shapes. */}
          <FadeIn delay={170} className="reveal-soft soft-lg text-center xl:text-left">
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
            {/* Two lines, AND THE measure has to widen to hold them.

                Merging "Enterprise AI" and "built to run" makes a 26-
                character line where the longest was 13. That doubles the
                width the same type size needs, so on the 880px measure the
                size would have had to fall to about 68px to fit — smaller
                than asked for, not "a bit" smaller.

                Widening the headline instead keeps the size up at 94px,
                where line one draws about 1160px in a 1296px shell. The
                headline is now the widest thing in the section rather than
                matching the column below it, which is the ordinary way
                the biggest headline type behaves: it breaks the text measure on purpose.
                The sides stay structured because it is nearly full-bleed —
                the same edges the eyebrow rule already marks.

                The break falls where the phrase already pauses, so the
                contrast still lands on a line of its own. */}
            {/* Three lines on A Phone, two from `md` UP — AND THE floor of THE
                clamp IS raised, NOT lowered, to pay for IT.

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
                40px, so every visible part of the screen from a small tablet up resolves to the
                same 7vw it always did, and the two-line setting returns at
                `md` exactly as it was. */}
            <h1 className="mx-auto max-w-[1200px] font-extrabold leading-[1] tracking-[-0.045em] text-[clamp(40px,7vw,72px)] xl:text-[clamp(42px,3.7vw,56px)] 2xl:text-[clamp(56px,4.2vw,72px)] text-white">
              <span className="line-mask">
                <span>
                  {/* A THIRD SIZE ABOVE 1536, because the column grows there.

                      The page opens from 1360 to 1560 on a large monitor, and
                      the artwork beside this keeps its own fixed width, so all
                      200 of those pixels land in this column — 844 instead of
                      620. A headline held at 56 in a column that wide stops a
                      third of the way short of the field below it, which is the
                      same mismatch of right edges this block was just
                      straightened out of. At 72 it fills its measure again. */}
                  {/* THREE LINES OF SIXTEEN, TWENTY AND TWENTY CHARACTERS, and
                      the break is forced at every size rather than left to the
                      box.

                      Left to itself this set as "Build and deploy governed
                      data" / "and AI" / "workflows in minutes" — a second line
                      six characters long under a first line of thirty, which is
                      the worst rag a three-line headline can have. Breaking
                      after "deploy" gives the serif phrase a line of its own and
                      leaves the three lines within four characters of each
                      other.

                      The word space between the halves is now a leading space at
                      the start of a line, and CSS discards those, so it costs
                      nothing. */}
                  <span className="block">Build &amp; Deploy</span>
                  {/* The middle line was set in the serif italic. It is the
                      same face, weight and size as the two lines around it
                      now — the only thing separating it is colour.

                      Sky, because that is this site's one accent on a dark
                      ground and the eyebrow directly above is already set in
                      it, so the line lands as part of the band rather than as
                      a colour introduced for one phrase. 4.3:1 against the
                      lightest part of the gradient behind it, against the 3:1
                      that type this size has to clear. */}
                  <span className="block text-ig-sky">Governed Data &amp; AI</span>
                </span>
              </span>
              <span className="line-mask">
                <span style={{ transitionDelay: '90ms' }}>
                  Workflows in Minutes.
                </span>
              </span>
            </h1>
          </FadeIn>

          {/* Also on the 880px measure, in place of the 62ch it used to
              carry. `ch` was pinning it to roughly 775px, which was close
              enough to the field to look like a mistake rather than a
              choice. On the wider measure it also falls to two lines instead
              of three, which pays for part of the taller headline. */}
          {/* THE measure comes back at `xl`. It was `max-w-none`, which was
              fine while the artwork beside it was 620 wide — the column came out
              at 820 and this fell into two even lines. Narrowing the artwork to
              572 to bring it flush with the page margin handed those 48 pixels
              to this column, and two even lines became one nearly full one and a
              short one. 740 puts the break back where it was, and does it in a
              way that does not move again the next time the picture does. */}
          <FadeIn delay={340} className="reveal-soft mx-auto mt-5 max-w-[880px] text-center xl:mx-0 xl:max-w-[740px] xl:text-left">
            {/* Full-strength lavender rather than the spec's ~75%, plus
                medium weight. At 400 and 75% this sat too close to the
                gradient behind it; #D6CDEE at full opacity is nearly
                white but keeps the tint, which is what stops it going
                grey and lifeless the way low-alpha white does here. */}
            <p className="text-[17px] font-medium leading-[1.5] tracking-[-0.01em] text-ig-lavender md:text-[20px]">
              No manual coding required. A repeatable method for automating code
              generation, data workflows, and production deployment, with a full audit
              trail at every step.
            </p>
          </FadeIn>

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
          {/* THE field group IS THE one block here that does NOT get THE blur,
              and it is the exception that keeps the rest cheap. Inside it are a
              white pill with a 70px-spread shadow, an input, three buttons and
              six chips carrying `backdrop-blur-sm` — a filter on the wrapper
              would blur that whole composited subtree, including a backdrop
              filter nested inside a blur, which is the single most expensive
              thing this page could ask for on a weak GPU. It keeps the lift and
              the fade, which is all it needs: it arrives last either way. */}
          {/* THE same 740 as the paragraph above it from `xl`, where it used to
              be `max-w-none`.

              Below `xl` the two already shared the 880 measure. Only in the
              two-column layout did the field run to the full width of the
              column — about 820 against the copy's 740 — and 80 pixels is not
              enough to read as a deliberately wider element, only as an edge
              that failed to line up. The figures under it are inside this same
              box, so all three now stop at one right edge.

              The headline stays wider on purpose: it is the one thing in the
              band allowed to break the measure. */}
          <FadeIn delay={510} className="mx-auto mt-8 w-full max-w-[880px] xl:mx-0 xl:max-w-[740px]">
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
                  placeholder="Search applications, capabilities, workflows..."
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

            {/* The two ways past the search field used to be here — a light
                "Explore AI suites" button and a "See how it works" link. They
                were never new controls, only the two destinations the menu
                already offers repeated where the reader is looking, and a
                second and third thing to press directly under the one that
                matters is what stops the field reading as the way in. The
                field is the whole of the action in this band now. */}

            {/* Three figures, from the same claims the rest of the page makes.

                Divided rather than boxed: two thin lines, the same weight as
                the rule under the eyebrow at the top of this band, so the row
                reads as part of the opening rather than as a widget dropped
                into it. On a phone the dividers go and the three stack, because
                three columns of 110px is narrower than any of the labels.

                `items-baseline` on each pair: the figure and its label sit on
                one baseline, which is what stops "10x" and "Reports in
                seconds" looking like they belong to different rows. */}
            <div className="mt-10 grid grid-cols-1 gap-y-5 border-t border-white/15 pt-7 sm:grid-cols-3 sm:gap-y-0">
              {HERO_FIGURES.map(({ figure, label }, i) => (
                <div
                  key={label}
                  className={`text-center xl:text-left ${
                    i ? 'sm:border-l sm:border-white/15 xl:pl-6' : ''
                  }`}
                >
                  <span className="block font-mono text-[26px] font-bold leading-none tracking-[-0.02em] text-white md:text-[30px]">
                    {figure}
                  </span>
                  <span className="mt-2 block text-[12.5px] font-medium leading-[1.4] tracking-[-0.01em] text-ig-lavender/85">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
            </div>

            {/* The picture: intent in one end, four coloured agents inside a
                governed middle, a checked pull request out the other. It is
                drawn for this column and no other, so it has no size options —
                five of twelve is the only place it is ever shown. */}
            <FadeIn delay={420} className="hidden xl:block">
              {/* `zoom` rather than `scale`, because this has to change the
                  size of the grid column and a transform does not — scaled with
                  one, the picture would draw 78px past the page margin while
                  the column it sits in stayed 598 wide. `zoom` also redraws the
                  type on the screen and the cards at its new size instead of
                  resampling it, which at 113 per cent is the difference between
                  crisp labels and soft ones. */}
              <div className="art-fill">
                <HarnessDiagram />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}

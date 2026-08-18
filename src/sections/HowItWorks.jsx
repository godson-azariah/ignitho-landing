/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE WALKTHROUGH — "Four steps, days not months"

   WHERE YOU SEE THIS
     The fifth section of the home page, on the near-white band.

   WHAT IS IN HERE
     · The four steps down the left: Choose the suite, Test the agent,
       Deploy in days, Measure the return.
     · The current step is a lavender card; the other three are a pale
       green wash.
     · A green circle beside each step. The current one has a dark ring
       winding around it like a countdown — 5.6 seconds, then it moves
       on by itself.
     · You can click any step to jump to it, and hovering the CURRENT
       step pauses the countdown so you can read it.
     · The illustrated product windows on the right, which change with
       the step.

   WORTH KNOWING
     The step wording lives in data/howItWorks.js. The windows are
     components/StepWindows.jsx.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { CornerMark } from '../components/ui/CornerMark.jsx';
import { StepWindows } from '../components/artwork/StepWindows.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { DWELL_MS, HOW_IT_WORKS } from '../data/howItWorks.js';
import { SHELL } from '../lib/layout.js';

/* Four steps on the left, the matching piece of interface on the right.

   Background C (near-white), which is what the alternation asks for here: the calculator above
   is C, the catalogue between them is B, so this band is C again and the dark
   closing band at the very top or very bottom follows. The heading block wears a `plate`, like every other
   run of copy that sits directly on the dotted ground. */
export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  /* Bumped on every commit, including one that lands on the step already
     showing. It is what the dwell meter is keyed on, so re-selecting the
     current step restarts its countdown rather than doing nothing. */
  const [turn, setTurn] = useState(0);
  const [live, setLive] = useState(false);
  /* THREE SEPARATE REASONS THE CLOCK MIGHT BE STOPPED, kept apart because they
     behave differently. `paused` is a decision and persists until reversed;
     `hovering` and `focusWithin` are conditions and end by themselves. Rolling
     them into one boolean would mean a mouse leaving the section could cancel a
     deliberate pause. */
  const [paused, setPaused] = useState(false);
  /* WHICH step is under the pointer, not merely whether one is.

     The hold is meant to be "the reader is looking at the step that is about to
     change", and that is only true of the ACTIVE step. Storing the home page and
     comparing it to `activeIndex` gets that right in both directions: hovering
     an inactive step does not hold, and if a step becomes active while the
     pointer is already resting on it, the hold starts without needing another
     pointer event to notice. A boolean could do neither. */
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [focusWithin, setFocusWithin] = useState(false);
  /* Read once on mount rather than at every tick: under `prefers-reduced-motion`
     there is no autoplay at all, so there is also nothing for a pause control to
     control, and it is hidden rather than left there doing nothing. */
  const [calm, setCalm] = useState(false);
  const sectionRef = useRef(null);

  const held = paused || hoverIndex === activeIndex || focusWithin;
  const active = HOW_IT_WORKS[activeIndex];

  /* THE RING RUNS EXACTLY WHEN THE TIMER RUNS, AND THAT IS THE WHOLE POINT OF
     DERIVING IT ONCE.

     The ring used to be held on `held` alone, which left out `live` — and `live`
     is false until the section is scrolled to. But the section is in the page structure from
     first paint, so the CSS animation started at page load and finished 5.6
     seconds later whether anyone was looking or not. Arrive at the section a
     minute in and the ring had been sitting at full for fifty-odd seconds, while
     the JS timer started its first honest 5.6s at the moment you got there. A
     completed countdown followed by several seconds of nothing is exactly what
     that produces.

     `running` is the same condition the timer effect below bails on, written
     once. One expression driving both means the drawn countdown cannot get ahead
     of the real one again. */
  const running = live && !held && !calm;

  const go = (i) => {
    setActiveIndex(i);
    setTurn((t) => t + 1);
  };

  useEffect(() => {
    setCalm(Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches));
  }, []);

  /* THE CAROUSEL ONLY RUNS WHILE IT IS ON SCREEN.

     Two reasons, and the second is the important one. A timer firing every
     5.6s for the life of the page is waste, but worse than that: without this,
     the section would have advanced two or three times before the reader ever
     reached it, so the first panel they saw would be whichever one the clock
     happened to be on. Starting the sequence when the section arrives means
     everybody sees step one first. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setLive(true);
      return undefined;
    }
    /* THE HOLDS ARE CLEARED ON THE WAY OUT, and this is the backstop for the
       other way a hold gets stranded.

       `pointerleave` fires when the pointer moves off an element. It does NOT
       reliably fire when the ELEMENT moves off the pointer — scroll a hovered
       card out of view with the wheel or the keyboard and Chrome and Firefox
       both wait for the next pointer move before admitting the pointer has
       left. So the hold survived the section leaving the screen, and scrolling
       back turned `live` on again with a hold still set and no event coming to
       release it. Resetting both here means the section always resumes clean. */
    const io = new IntersectionObserver(
      ([entry]) => {
        setLive(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setHoverIndex(-1);
          setFocusWithin(false);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* AUTO-ADVANCE — AND IT RESUMES WHERE IT STOPPED RATHER THAN STARTING OVER.

     That distinction is the whole reason this is not a two-line effect. The
     dwell ring around the active icon is a CSS animation, and pausing a CSS
     animation with `animation-play-state` holds it at the exact frame it was
     on. So if the JS timer restarted from 5.6s every time a pointer crossed the
     list, the ring would sit at four-fifths full while the clock underneath it
     had gone back to zero, and the countdown would be visibly lying. Banking
     the remainder is what keeps the two telling the same story.

     `remaining` starts at a full dwell and is written down in the cleanup: on
     the way out, whatever had not yet elapsed is kept for next time. React runs
     cleanup(previous) before effect(next), which is what makes the reset at the
     top of the effect safe — a new `turn` means a new step, so the banked
     remainder from the old one is discarded before it can be used.

     `performance.now()` rather than `Date.now()`: it is monotonic, so a clock
     adjustment mid-dwell cannot produce a negative remainder.

     OFF ENTIRELY UNDER `prefers-reduced-motion`. For a reader who has asked the
     whole system for less motion, the honest answer is not a pause button — it
     is not to start. */
  const remaining = useRef(DWELL_MS);
  const startedAt = useRef(0);
  const seenTurn = useRef(turn);

  useEffect(() => {
    if (seenTurn.current !== turn) {
      seenTurn.current = turn;
      remaining.current = DWELL_MS;
    }
    if (!live || held || calm) return undefined;

    startedAt.current = performance.now();
    const t = setTimeout(() => {
      remaining.current = DWELL_MS;
      setActiveIndex((i) => (i + 1) % HOW_IT_WORKS.length);
      setTurn((n) => n + 1);
    }, remaining.current);

    return () => {
      clearTimeout(t);
      remaining.current = Math.max(
        0,
        remaining.current - (performance.now() - startedAt.current)
      );
    };
  }, [live, held, calm, turn]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-c dots relative py-16 md:py-24"
    >
      <div className={SHELL}>
        <CornerMark className="-top-7 left-1 md:left-3" />
        <CornerMark className="-top-7 right-1 md:right-3" />

        {/* THE HEADING IS ITS OWN ROW NOW, AND THAT IS THE WHOLE FIX.

            Inside the left column, the heading meant the two columns could
            never start at the same height: the steps began 130px below the
            top of their column and the illustration was vertically centred against
            all of it, so nothing on either side lined up with anything on the
            other. Two columns of unequal content and one shared centre line
            is not a structure, it is an average.

            Lifted out, there is a header band and then a content row, and the
            row has exactly two things in it that both begin at its top edge.
            It also puts this heading where the other three section headings on
            the page already are — centred over its section, not beside it. */}
        {/* `max-w-4xl`, up from 3xl, so the one line has somewhere to be. At
            the 64px ceiling the full sentence measures about 821px; a 768px
            measure would have wrapped it and undone the whole point. */}
        <FadeIn className="reveal-soft plate mx-auto max-w-4xl text-center">
          <SectionLabel index="04" centered>
            How It Works
          </SectionLabel>
          {/* Shares no content word with any other heading on the page, and
              the second half is the one claim this section exists to make.
              "days not months" is `pillars.js` verbatim in substance —
              "deploy in days rather than custom multi-month projects" — so the
              heading is not writing a new promise. */}
          {/* SIZED TO THE CATALOGUE'S HEADING, NOT THE CALCULATOR'S.

              This was already byte-identical to OutcomeCards and the calculator —
              clamp(27px, 3.9vw, 48px), same leading, same tracking. The page
              has TWO heading scales, and the one directly above this section
              is the larger: "Three foundations, six verticals" runs at
              clamp(32px, 4.8vw, 64px). Scrolling out of a 64px heading into a
              48px one is the step change that reads as a mismatch, so this
              takes the 64px scale — leading and tracking copied across too, or
              the size would match while the line spacing did not. */}
          {/* ONE LINE, ONE COLOUR, ONE FACE — no forced break, no serif italic,
              no purple. Every other heading on the page splits into a bold half
              and an italic violet half; this one is set plain, and it is the
              only section whose heading is a single clause rather than two
              beats, so it has nothing to split ON.

              `balance` is still here, and it earns its place at the narrow end:
              27 characters cannot fit one line on a phone at any size a section
              heading can be set in — 335px of measure would need 26px type — so
              below about 700px it does wrap, and `balance` is what makes that
              wrap fall evenly instead of stranding "months". */}
          <h2 className="balance mt-5 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(30px,4.8vw,64px)] text-ig-ink">
            Four steps, days not months
          </h2>
        </FadeIn>

        {/* `items-stretch` — the grid default, restored by dropping
            `items-center`. It is what makes the two columns the same height:
            the row takes the height of the taller one and hands it to both, so
            the illustration can fill it with `lg:h-full` rather than floating in the
            middle of it.

            `gap-x-0` until the columns split — a fixed column gap is a hard
            floor on a 12-track grid, and 11 × 40px is wider than any phone's
            shell. Same lesson as the other five grids on the page. */}
        <div className="relative mt-10 grid grid-cols-12 gap-x-0 gap-y-8 md:mt-12 lg:gap-x-10">
          {/* THE HOLDS ARE SCOPED TO THE STEP LIST, NOT THE WHOLE ROW, and the
              reason is the pause control sitting over the illustration opposite. If
              hovering anywhere in the row held the clock, pressing "Resume"
              would clear `paused` and still leave the countdown frozen, because
              the pointer would be over the row to press it. A button whose label
              says resume and which visibly resumes nothing is worse than no
              button. So: the steps are the hover region, the illustration is where the
              control lives, and the two never fight.

              POINTER TYPE IS CHECKED, and it has to be. `pointerenter` fires for
              touch as well as mouse, and a touch has no matching leave — tapping
              a step would set the hold and never clear it, which is the same
              sticky-hover bug the swap buttons had. Mouse only.

              THE FOCUS HOLD IS NOT OPTIONAL. React's `onFocus` maps to
              `focusin` and so bubbles, which is what lets one handler cover all
              four buttons. Without it, tabbing to step two and starting to read
              it would get you yanked to step three mid-sentence.
              `relatedTarget` stops focus MOVING between two steps from counting
              as leaving: the blur only registers if focus has actually left. */}
          {/* THE FOCUS HOLD ONLY COUNTS WHEN THE FOCUS IS VISIBLE, AND THAT WAS
              THE BUG THAT STOPPED THE CLOCK "SOMETIMES".

              Clicking a button focuses it in Chrome and Firefox, and focus stays
              put until something else takes it. So `onFocus` set the hold on
              every press and nothing ever cleared it — the timer stopped for
              good the first time anyone chose a step by hand, which is exactly
              the "not running even when I am not hovering" symptom, and why it
              only happened after an interaction.

              `:focus-visible` is the distinction the platform already draws:
              browsers do not apply it to a button focused by a pointer, only to
              one reached by keyboard. So a mouse click no longer holds anything,
              while tabbing to a step still does — which is the case the hold
              exists for. `matches` throws on a selector the engine does not
              know, hence the guard.

              `relatedTarget` stops focus MOVING between two steps from counting
              as leaving: the blur only registers if focus has actually left. */}
          <div
            className="col-span-12 lg:col-span-5"
            onFocus={(e) => {
              let visible = true;
              try {
                visible = e.target.matches(':focus-visible');
              } catch {
                /* engine without :focus-visible — hold on any focus rather than
                   never, since a keyboard user there has no other protection */
              }
              if (visible) setFocusWithin(true);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false);
            }}
          >
            {/* Buttons rather than a tab list, on purpose. A `tablist` promises
                a panel worth reading, and the illustration beside this is decoration
                — every word of it is already in the step copy below. So the
                steps are pressable text with `aria-pressed`, the illustration is
                `aria-hidden`, and nothing claims to be what it is not. */}
            {/* `h-full` plus `justify-between`: the four cards divide whatever
                height the row settles on, so the first one's top edge and the
                last one's bottom edge land on the illustration's, instead of the
                column ending wherever the copy happened to. */}
            {/* BACK TO FOUR CARDS, AND THE RAIL HAS GONE WITH THEM.

                The stepper drew the sequence as one violet line threaded
                through the marks, which meant no step could carry a background
                — a fill would have covered the line it sat on. Restoring the
                fills therefore means removing the rail; the two cannot both be
                there, and this is the pair being chosen.

                What comes back is the treatment exactly as it stood before:
                lavender at full strength on the current step with a thin line
                and a lift, and the same lavender at 40% on the other three.
                The card is what says "this one", so nothing else has to.

                The marks are the one thing that does NOT revert — solid teal
                with a white letter shape on all four, as they are now. */}
            <div className="flex h-full flex-col justify-between">
              {HOW_IT_WORKS.map((step, i) => {
                const on = i === activeIndex;
                const Icon = step.icon;
                return (
                  <FadeIn key={step.id} delay={Math.min(i * 70, 240)}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-pressed={on}
                      /* Per-step, so only the ACTIVE one holds the clock. The
                          leave handler does NOT check whether this step is
                          active — it clears the home page whenever the pointer
                          leaves this card, whatever state the card is in. Gating
                          the leave the way the enter is gated is how a hold gets
                          stranded: the step stops being active, the guard stops
                          matching, and nothing is left that can clear it. */
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setHoverIndex(i)}
                      onPointerLeave={(e) =>
                        e.pointerType === 'mouse' && setHoverIndex((h) => (h === i ? -1 : h))
                      }
                      /* THE TWO STATES ARE DIFFERENT HUES, NOT TWO STRENGTHS OF
                         ONE.

                         The current step keeps the violet lavender with its
                         thin line and shadow; the other three take the teal at
                         6%, which blends to #ECF4F7 over this band. That is
                         a wash, not a fill — and the distinction matters, both
                         to the eye and to the house rule that teal is an accent
                         and never fills a card.

                         Distinguishing by hue rather than by opacity is what
                         lets the three inactive cards be fully PRESENT rather
                         than faded. All four titles have to be readable for the
                         list to be worth choosing between, and lavender at 40%
                         bought its recession by taking the card most of the way
                         back to the page ground.

                         THE HIERARCHY STILL RUNS THE RIGHT WAY, and that had to
                         be checked, because teal is the more saturated of the
                         two and could easily have out-shouted the selection. It
                         does not, because the current card is carrying three
                         things no wash can answer: an inset thin line, a shadow
                         that lifts it off the band, and 2.5% of scale.

                         SCALE IS RELATIVE, NOT ADDITIVE: the current step stays
                         at 1 and the others shrink to 0.975, so the step you are
                         reading is rendered at its natural size and its type is
                         never resampled. Hover lands between the two at 0.99 and
                         takes the wash to 11% — enough to answer the pointer,
                         not enough to out-rank the card that is current. */
                      className={`group relative flex w-full items-start gap-4 rounded-[16px] px-4 py-4 text-left transition-all duration-500 ease-out sm:px-5 sm:py-6 ${
                        on
                          ? 'scale-100 bg-ig-paper-2 shadow-[0_1px_2px_rgba(22,6,58,0.1),0_14px_32px_-18px_rgba(22,6,58,0.38)] ring-1 ring-inset ring-ig-purple/25'
                          : 'scale-[0.975] bg-ig-teal/[0.06] hover:scale-[0.99] hover:bg-ig-teal/[0.11]'
                      }`}
                    >
                      {/* SOLID TEAL WITH A WHITE LETTER SHAPE — the green filled rather
                          than outlined.

                          THE FILL IS THE CIRCLE, NOT THE LETTER SHAPE, and that is
                          forced by the icon set. Lucide draws in strokes, so
                          `fill="currentColor"` turns each one into its own
                          silhouette: a solid rocket and a solid flask survive
                          that, and `LineChart` becomes a filled block with no
                          chart left in it. Putting the fill behind the letter shape
                          gives every one of the four the same treatment and
                          keeps all four readable.

                          It is also the version that passes: white on #00A274 is
                          3.29:1, over the 3:1 WCAG asks of a meaningful graphic.
                          A teal letter shape on a teal tint — the other way to "fill
                          with green" — measures 2.75:1 and fails.

                          IDENTICAL ON ALL FOUR, and that is the point of it
                          being here at all. The card behind now says which step
                          is current; if the mark said it as well, the two would
                          be making the same statement twice and the green would
                          stop being a constant. Four marks in one colour read as
                          a set — which is what four steps of one process are.

                          ON THE TEAL WASH IT IS A SOLID CIRCLE ON A TINT OF
                          ITSELF, which is deliberate: 6% and 100% of one hue
                          are unmistakably the same colour family, so the three
                          inactive cards read as a set the current one has been
                          lifted out of. The circle's own edge measures 2.94:1
                          against that wash — below the 3:1 a graphic carrying
                          MEANING would need, and it does not need it, because
                          the thing being read is the white letter shape inside it and
                          that clears the bar against the teal.

                          NO `ring-4` ANY MORE. That ring was the section's own
                          background painted as a gap, so the rail appeared to
                          stop at each mark. With no rail to interrupt there is
                          nothing for it to do, and a paper-white halo on a
                          coloured card would read as a mistake. */}
                      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ig-teal text-white">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                        {/* THE DWELL METER. `key={turn}` is what restarts it:
                            `turn` changes on every commit, including one that
                            lands on the step already showing, so pressing the
                            active step remounts this node and the ring winds
                            from zero again — which a class toggle alone cannot
                            do. `-rotate-90` starts the sweep at twelve. */}
                        {on && (
                          <svg
                            key={turn}
                            aria-hidden="true"
                            viewBox="0 0 40 40"
                            className="pointer-events-none absolute inset-0 -rotate-90"
                          >
                            {/* A TRACK UNDER THE METER, and it is what marks the
                                step rather than merely measuring it.

                                Without it the current mark is identical to the
                                other three at the instant a step begins, because
                                the meter starts at zero and there is nothing
                                drawn. A faint full circle means the active mark
                                always wears a ring — the dark one simply fills
                                it in. */}
                            <circle
                              cx="20"
                              cy="20"
                              r="18.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-ig-ink/[0.12]"
                            />
                            {/* DARK, NOT TEAL. The mark it circles is solid
                                teal, and a countdown drawn in that same green
                                would read as one blob rather than as a measure.
                                `--ink` is the darkest value in the palette: 5.7:1
                                against the teal it crosses and darker still
                                against the lavender card outside it, so the
                                sweep is legible along its whole length.

                                `dwell-hold` stops it at the frame it is on via
                                `animation-play-state`, so before the section is
                                reached it sits paused at zero rather than
                                running down unwatched. */}
                            <circle
                              cx="20"
                              cy="20"
                              r="18.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              className={`dwell-ring text-ig-ink ${running ? '' : 'dwell-hold'}`}
                              style={{ '--dwell': `${DWELL_MS}ms` }}
                            />
                          </svg>
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        {/* The 01–04 numerals are gone. The four steps are
                            already in a fixed vertical order, each with its own
                            icon, so the numeral was labelling a sequence the
                            layout states on its own — and it pushed every
                            title 30px off the left edge the body copy below it
                            starts from. Dropping it puts the title and the body
                            on one axis. */}
                        {/* 75%, BACK UP FROM 55%. A slight recession rather than
                            a heavy one — #030303 at 75% over this band is
                            #414142 and 9.8:1, so the inactive titles stay fully
                            comfortable to read and the difference is a nudge
                            rather than a fade.

                            The dimming does not have to carry the focus on its
                            own: the card behind it is a different hue from its
                            three neighbours, wears a thin line and a shadow, and
                            stands 2.5% larger than they do. Against all of that
                            a nudge in tone is the right size of signal — and it
                            is the only one of the four that costs contrast, so
                            it is the one to keep small.

                            Checked on the new ground, since the inactive titles
                            no longer sit on lavender: #414142 on the #ECF4F7
                            wash is 9.4:1. */}
                        <span
                          className={`block pt-2 text-[16px] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-500 sm:text-[18px] ${
                            on ? 'text-ig-ink' : 'text-ig-ink/75 group-hover:text-ig-ink'
                          }`}
                        >
                          {step.title}
                        </span>
                        {/* THE BODY IS A DESKTOP-ONLY CHILD OF THE CARD NOW.

                            It used to show here on the ACTIVE step below `lg`,
                            which is what made one card roughly twice the height
                            of the other three on a phone — a row of steps where
                            one is double-height reads as a layout accident
                            rather than as a selection.

                            Below `lg` the copy has not been dropped, it has
                            moved: one line of it sits under the whole list,
                            showing whichever step is current. Four uniform
                            cards, and the copy still there for the step you are
                            on.

                            At `lg` and up nothing changes at all — every card
                            showed every body before, and every card shows every
                            body now. The condition that varied by state is
                            simply gone. */}
                        {/* NOT DIMMED ON THE INACTIVE CARDS, EITHER, AND THAT IS
                            A CONTRAST FLOOR RATHER THAN A PREFERENCE.

                            Fading the body copy is the obvious way to make three
                            steps recede, and it is the one move available here
                            that would break something real. `--muted` (#54595F)
                            on this band clears AA at about 7:1; at 60% opacity
                            it lands near #A8ABB0, which is roughly 2.4:1 and
                            fails outright. There is no opacity that both reads
                            as faded and stays legible, so the recession is done
                            entirely with the fill and the scale — neither of
                            which touches a contrast ratio. */}
                        <span className="mt-2 hidden text-[13.5px] leading-[1.5] text-ig-muted sm:text-[14.5px] lg:block">
                          {step.body}
                        </span>
                      </span>
                    </button>
                  </FadeIn>
                );
              })}

              {/* THE CURRENT STEP'S COPY, BELOW THE WHOLE LIST — phones only.

                  This is where the body text that used to swell one card went.
                  Under the list it costs the same one block of copy the active
                  card was already spending, but it is spent OUTSIDE the four
                  cards, so they stay identical to each other and the section
                  does not get any longer than it already was. It reads as a
                  caption for the selection, which is what it is.

                  `min-h` sized to the longest of the four at the narrowest
                  width — three lines at 13.5px/1.5 — so changing step cannot
                  shift the illustration below it up and down. The house rule
                  for variable-length text: reserve the worst case, not the
                  current one.

                  `lg:hidden`, and above `lg` the four bodies are back inside
                  their own cards exactly as they always were. Nothing on the
                  desktop layout is aware this element exists. */}
              <p className="mt-5 min-h-[62px] text-[13.5px] leading-[1.5] text-ig-muted lg:hidden">
                {active.body}
              </p>
            </div>
          </div>

          {/* `lg:h-full` on the reveal AS WELL as on the illustration inside it. The
              reveal is the grid item, so it is the thing `items-stretch` hands
              the row height to; without it the illustration's own `h-full` would be
              100% of a wrapper that had already shrunk to its content. */}
          <FadeIn delay={120} className="relative col-span-12 lg:col-span-7 lg:h-full">
            {/* `live` is the same IntersectionObserver flag the autoplay uses,
                so the panel's entrance and its clock start together — and
                neither does any work while the section is off screen. */}
            <StepWindows activeId={active.id} live={live} />

            {/* THE PAUSE CONTROL IS STILL HERE — IT IS JUST NOT DRAWN.

                The pill in the panel's bottom-right corner has gone. What
                replaced it is the same button, `sr-only`: present in the
                document, announced by a screen reader, reachable by Tab, and
                invisible to everyone who is not using one of those. Nothing on
                the illustration moves or reflows — `sr-only` is a 1px clip, so it
                occupies no space at any width.

                WHY NOT DELETE IT OUTRIGHT. Hover is a mouse gesture and focus is
                a keyboard one, so on a touchscreen neither of the two remaining
                holds can be reached — and this section moves on its own every
                5.6 seconds. WCAG 2.2.2 asks for a mechanism to pause moving
                content regardless of input device, and a control that exists
                only in the assistive tree still satisfies it for the readers
                most affected by movement they cannot stop. Removing the button
                from the design is a look; removing the mechanism would be a
                regression.

                It becomes visible on FOCUS, which is not optional either: a
                keyboard user landing on a control they cannot see is its own
                failure (2.4.7). `focus:not-sr-only` puts the old pill back,
                exactly where it used to sit, for exactly as long as it holds
                focus.

                Still a SIBLING of the illustration rather than a child — the illustration
                carries `aria-hidden`, and a control inside it would be
                unreachable by everything that needs this one. And still absent
                under `prefers-reduced-motion`, where the autoplay never starts
                and there is nothing to pause. */}
            {!calm && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="sr-only focus:not-sr-only focus:absolute focus:bottom-3 focus:right-3 focus:z-20 focus:flex focus:items-center focus:rounded-full focus:bg-white focus:px-2.5 focus:py-1.5 focus:font-mono focus:text-[9.5px] focus:font-bold focus:tracking-[0.05em] focus:text-ig-ink focus:ring-1 focus:ring-inset focus:ring-ig-purple/20 sm:focus:bottom-4 sm:focus:right-4"
              >
                {paused ? 'Resume the walkthrough' : 'Pause the walkthrough'}
              </button>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

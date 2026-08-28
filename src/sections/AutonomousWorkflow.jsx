/* "From business intent to validated production code": the heading on one
   side, a turning globe on the other, and the four stages of a run underneath.

   The globe is not decoration for its own sake. This section is about work
   crossing systems and regions, and a slowly turning sphere says that in a way
   a static icon cannot — which is why the reference site puts one here too.

   The four stage cards sit below both, across the full width, because they are
   a sequence: four things in a row read as an order, where the same four in a
   column beside a picture read as a list of features. */

import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { CornerMark } from '../components/ui/CornerMark.jsx';
import { HarnessGlobe } from '../components/artwork/HarnessGlobe.jsx';
import { HOW_IT_WORKS } from '../data/howItWorks.js';
import { WORKFLOW_CORE } from '../data/workflow.js';

/* The title's size and leading, kept here because the stage cards reserve two
   lines of it whether a title fills them or not — and a reserved height written
   as a number drifts the moment the type changes. */
const TITLE_PX = 22;
const TITLE_LEADING = 1.24;
import { SHELL } from '../lib/layout.js';

/* THE STARFIELD behind the globe.

   THE FIRST ATTEMPT MARCHED. It stepped two linear congruential generators by
   `i`, and stepping an LCG by a constant does not scatter — it walks a lattice.
   The stars came out in short diagonal runs, evenly spaced, which is exactly
   what a sky never looks like.

   This uses the R2 sequence instead: two irrational steps taken from the plastic
   number, wrapped back into 0–1. It is the standard answer to "cover a square
   evenly without repeating", it has no lattice for the eye to find, and unlike a
   grid it never lines anything up.

   The catch is that R2 is TOO even on its own — every point sits at a polite
   distance from its neighbours, and real stars clump. So each one is nudged by a
   hash of its own index, which puts a little clustering back without letting any
   of them collide.

   None of it is random. `Math.random` would place them somewhere new on every
   render and somewhere else again on the server, so the sky would jump the
   moment the page came alive.

   Fifty-two of them, and the sizes are weighted: most are a single pixel, a few
   are one and a half, two are two. An even spread of sizes reads as dots; a few
   bright ones among many faint ones reads as depth. */
const R2_X = 0.7548776662466927;
const R2_Y = 0.5698402909980532;
const frac = (n) => n - Math.floor(n);
const hash = (n) => frac(Math.sin(n * 127.1 + 311.7) * 43758.5453);

const STARS = Array.from({ length: 52 }, (_, i) => {
  const weight = hash(i + 41);
  return {
    x: frac(0.5 + R2_X * (i + 1) + (hash(i) - 0.5) * 0.06) * 100,
    y: frac(0.5 + R2_Y * (i + 1) + (hash(i + 17) - 0.5) * 0.06) * 100,
    size: weight > 0.96 ? 2 : weight > 0.8 ? 1.5 : 1,
    dim: 0.14 + hash(i + 5) * 0.42,
    twinkle: hash(i + 23) > 0.86
  };
});

export function AutonomousWorkflow() {
  return (
    <section id="workflow" className="bg-b dots relative py-16 md:py-24">
      <div className={SHELL}>
        <CornerMark className="-top-7 left-1 md:left-3" />
        <CornerMark className="-top-7 right-1 md:right-3" />

        {/* Copy and picture side by side from `lg`, stacked below it.

            A TRACK THE PICTURE FILLS, rather than half a twelve-column grid it
            was then centred inside. Six of twelve came to 620, the card was
            capped at 440, and the 90 pixels left over on each side of it were
            simply gap — so the distance from the heading to the picture read as
            150 rather than the 56 the grid was set to. The second track is the
            card's own width now, so the two columns sit exactly one gutter
            apart. 560, because the card is a wide shallow rectangle rather than
            a square and does not need to be the widest thing in the row.

            IT STAYS 560 ABOVE 1536, AND THE HEADING TAKES THE EXTRA WIDTH. The
            page opens to 1560 there, and with the card holding its 560 all 200 of
            those pixels landed in the copy column — which a heading capped at 56
            could not fill, leaving 380 of nothing between the last word and the
            card.

            Widening the card to 700 was tried and moved the problem rather than
            solving it: the globe is a fixed size, so the space simply reappeared
            inside the frame, where it is worse. Empty room beside a column of
            type reads as air; empty room inside a bordered card reads as a hole.

            So the picture keeps the width its contents actually need and the
            heading goes to 74, which fills the column it was given. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-stretch lg:gap-14">
          <FadeIn className="reveal-soft plate min-w-0 text-center lg:text-left">
            <SectionLabel index="01">The Six-Stage Method</SectionLabel>
            <h2 className="balance mt-5 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(30px,4.2vw,56px)] text-ig-ink 2xl:text-[clamp(56px,4.9vw,74px)]">
              From Business Intent to{' '}
              <span className="serif-accent font-normal text-ig-purple">
                Validated Production Code
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px] lg:mx-0 2xl:max-w-[64ch] 2xl:text-[18px]">
              The method coordinates data, privacy, code generation, testing, governance and
              deployment as one continuous workflow
            </p>
          </FadeIn>

          {/* The picture: a wide, shallow card rather than a square one.

              A SQUARE HERE WAS COSTING THE SECTION ABOUT TWO HUNDRED PIXELS. The
              copy beside it comes to roughly 330, so a 520 square set the height
              of the whole row and left 190 of empty band under the heading. A
              560 wide card that takes ITS HEIGHT FROM THE COPY is shorter than
              the copy can ever make the row, so the picture costs the section
              nothing at all — and the two sit on the same top and bottom lines,
              which a fixed height could only manage at one screen width.

              `lg:items-stretch` on the row is what does it, with `h-full` on the
              card. The card holds nothing in normal flow — the globe and the
              caption are both positioned — so its own height is zero, the row is
              sized by the copy alone, and then the card fills exactly what the
              copy decided. Match a fixed number to the copy instead and it is
              right at one screen width and wrong at every other.

              It is also the shape the contents want: a sphere with rings leaning
              away from it is wide and shallow, and a square frame around that is
              mostly corners.

              AND ONE LINE OF TYPE, WHICH IS ALL IT NEEDS. A turning globe on
              its own says "global", which is not what this section is about, and
              a picture with no words in it reads as decoration however well it is
              drawn. Naming what the sphere stands for settles that. A list of
              sources underneath was tried and taken out again: three more labels
              on a picture that already has a heading and a paragraph beside it is
              a caption competing with a caption. */}
          <FadeIn delay={120} className="min-w-0">
            <div className="relative mx-auto h-[240px] w-full max-w-[560px] overflow-hidden rounded-[24px] bg-ig-console shadow-[0_1px_2px_rgba(22,6,58,0.3),0_40px_90px_-50px_rgba(22,6,58,0.9)] ring-1 ring-inset ring-white/[0.07] lg:h-full">
              {/* THE GRID, down from 4.5 per cent to 1.6.

                  It was drawn when the card held a wireframe, where a ruled
                  ground agreed with a ruled subject. The subject is a world in
                  points now, and a grid at that weight competes with it — two
                  fields of small marks, one of which means something. It is
                  still there because a dead-flat panel behind a lit sphere reads
                  as a hole, but only just. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
                  backgroundSize: '28px 28px'
                }}
              />

              {/* THE STARS. Barely there on purpose — a fifth to a half opacity
                  on one and a half pixels — so the card reads as lit rather than
                  as printed. Six of the forty-four breathe and the rest are
                  still: a whole sky twinkling is a screensaver.

                  Placed by arithmetic rather than by hand or by chance. Two
                  small integer sequences give a scatter that has no pattern the
                  eye can find, and unlike `Math.random` it is the same scatter
                  on every render and on the server, so nothing moves when the
                  page hydrates. */}
              {STARS.map(({ x, y, size, dim, twinkle }) => (
                <span
                  key={`${x}-${y}`}
                  aria-hidden="true"
                  className={`pointer-events-none absolute block rounded-full bg-white ${
                    twinkle ? 'globe-star' : ''
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    height: size,
                    width: size,
                    opacity: dim,
                    animationDelay: `${-(x % 9)}s`
                  }}
                />
              ))}

              {/* THE PLANE the orbits lie in, carried out to both edges.

                  It fades from both ends towards the middle, which is where the
                  globe sits — a gradient has to agree with what it is under, and
                  this one was weighted to the right while the sphere still was.
                  It is the only mark in the card that reaches both edges. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-1/2 block h-px -translate-y-1/2"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(190,182,250,0.26) 30%, rgba(190,182,250,0.26) 70%, transparent 100%)'
                }}
              />

              <span className="absolute left-6 top-6 z-10 block font-mono text-[9.5px] font-bold tracking-[0.055em] text-white/45">
                Connected enterprise architecture
              </span>

              {/* THE OPPOSITE CORNER, and the reason it is that one.

                  A sphere in a rectangle leaves its four corners empty and can
                  never fill them — the card is 560 across and the globe with its
                  rings is 268, so the width is not the problem and making the
                  globe bigger is not the fix: it already stands within a few
                  pixels of the card's full height.

                  What was wrong is that only one of those four corners was doing
                  anything. Two marks on a diagonal frame a round subject without
                  crowding it, which is why this is bottom right and not top
                  right: top right is where the rings pass closest to the edge.

                  It names what the middle of the method does, so the card says
                  something about the section it sits in rather than only
                  labelling itself. */}
              <span className="absolute bottom-6 right-6 z-10 block font-mono text-[9.5px] font-bold tracking-[0.055em] text-white/35">
                {WORKFLOW_CORE.role}
              </span>

              {/* CENTRED IN THE FRAME.

                  It was held hard right and run off the edge for a while, to
                  break the symmetry of a sphere with rings around it. Centred it
                  is, and the rings carry the asymmetry instead — they lean at
                  three different angles rather than lying flat, so the picture is
                  not a mirror of itself even though its subject is in the middle.

                  The scale below `sm` turns about the middle now rather than the
                  right edge, because the middle is what it is aligned to. A
                  sphere has to be laid out in real pixels and cannot shrink on
                  its own, but the finished thing can be scaled. */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.82] sm:scale-100">
                <HarnessGlobe size={200} />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* THE FOUR STAGES, in a row.

            There used to be a short rule between the cards at `lg`, on the
            argument that it turned four cards into one sequence. It did not:
            twenty pixels of hairline in the gutter reads as a stray mark, and it
            cost the row its gutters — the cards were set to `gap-0` with
            padding inside each cell to make room for it. The numbers already say
            it is a sequence. The gutters are back. */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => {
            return (
              <FadeIn key={step.id} delay={Math.min(i * 70, 240)} className="h-full">
                <div className="relative h-full">
                  {/* PADDING AND TYPE BOTH UP, because neither on its own was
                      the problem. A 350 by 125 card under a 72px headline and a
                      275px globe reads as a footnote whatever is written in it:
                      it was letterbox-shaped, and letterbox is what a card looks
                      like when its content is small and its padding is smaller.
                      32 of padding and a body at 16 takes it past 180, which is
                      a card rather than a strip — and at 16 the longer bodies
                      run to three lines in a 286-wide text column instead of
                      two, which is where most of the height comes from. */}
                  <div className="flex h-full flex-col rounded-[20px] bg-white p-7 shadow-[0_1px_2px_rgba(22,6,58,0.05),0_18px_44px_-32px_rgba(22,6,58,0.5)] ring-1 ring-inset ring-ig-purple/[0.1] md:p-8">
                    {/* NO ICON, AND THE SPACE AFTER IT GOES WITH IT.

                        The number and the icon side by side came to eighty
                        pixels in a card two hundred and ninety wide, which left
                        two hundred and ten of empty row above the title. There
                        are only three ways out of that: fill the gap with a
                        rule, put the two marks back at opposite ends, or stop
                        having a row that only furniture sits on.

                        Flow's own pages take the third. Across its capability
                        blocks, its tool cards, its session cards and its pricing
                        cards there is not one icon, one number or one step
                        indicator — every block is a heading and its body, and
                        the typography carries the whole hierarchy. So the number
                        is metadata here, set small above the title in mono, and
                        the title is the loud thing rather than the third thing
                        down. Nothing is left standing on a line of its own, so
                        there is no space after anything. */}
                    {/* THE NUMBER SHARES THE TITLE'S ROW, at the right end of
                        it, and that is the version with no hole in it anywhere.

                        On its own line above the title it had the same problem
                        the icon did — a short mark on a wide row, with the rest
                        of the row empty. Beside the title on the left it would
                        indent every line under it. At the right end the title
                        takes all the width it needs and the number closes the
                        row, so both edges of the card are used.

                        `items-baseline`, so the number sits on the first line of
                        the title rather than in the middle of a two-line one, and
                        `shrink-0` on it with `min-w-0` on the title, so a long
                        title wraps instead of pushing the number off. */}
                    {/* TWO LINES' WORTH OF ROOM, WHETHER THE TITLE USES IT OR
                        NOT, and the break balanced rather than left to the box.

                        Left alone, three of the four titles wrapped with their
                        last word alone on the second line — "rules", "privacy",
                        "testing" — and the fourth fitted on one. So the bodies
                        started at three different heights across the row, which
                        is the thing you see before you read any of it.

                        `balance` fixes the orphans: it evens the lines instead
                        of filling the first one and dropping what is left, so
                        "Connect data and specify rules" sets as "Connect data
                        and / specify rules" and no line is one word.

                        The reserved height fixes the alignment, and it has to be
                        reserved rather than balanced into existence, because
                        "One-click deployment" is two words — it is one line, or
                        it is two lines of one word each, and there is no third
                        option. Holding the block at two lines' height lets that
                        title stay on one line while its body still starts level
                        with the other three. */}
                    <span
                      className="flex items-baseline justify-between gap-4"
                      style={{ minHeight: TITLE_PX * TITLE_LEADING * 2 }}
                    >
                      <span className="balance min-w-0 flex-1 text-[22px] font-extrabold leading-[1.24] tracking-[-0.025em] text-ig-ink">
                        {step.title}
                      </span>
                      <span className="shrink-0 font-mono text-[15px] font-bold tracking-[0.06em] text-ig-purple">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </span>
                    <span className="mt-4 block flex-1 text-[16px] leading-[1.6] text-ig-muted">
                      {step.body}
                    </span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* The dark band at the bottom: last heading, Contact Us, and the dotted
   world map.

   The map is a picture, not a real map. Every office marker is positioned by
   hand in this file, so moving an office means moving a dot here. */

import { ArrowRight } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { PrimaryButton } from '../components/ui/Button.jsx';
import { SHELL } from '../lib/layout.js';

/* The bottom band at the very top or very bottom, on the same ground as the hero.

   Two columns now: everything you read on the left, the office map on the
   right. The button used to sit in the right-hand column opposite the
   heading, which put the one action in the section as far from the sentence
   asking for it as the grid allowed. Underneath the words is where a call to
   action belongs — you reach it by finishing the sentence. */
export function ClosingSection({ openContact }) {
  return (
    <section className="aurora dots-inv relative py-12 md:py-16">
      <div className={SHELL}>
        {/* `gap-x-0` Until THE columns actually split. This IS THE bug.

            `grid-cols-12` is `repeat(12, minmax(0, 1fr))`. Those tracks can
            be squeezed to zero — but a Column gap IS A FIXED LENGTH and never
            shrinks at all. So this grid has a hard minimum width of 11 × 40px
            = 440px, whatever the container says, and on a 412px screen the
            shell only offers it 372px. The grid laid out to 440 anyway and
            overflowed by 68px.

            Which means every `col-span-12` child was 440px wide instead of
            372px, and its centre sat 34px right of the container's. Centred
            text inside it was therefore centred — on the wrong axis. And
            because `body` carries `overflow-x: clip`, there was no scrollbar
            to give it away; the section just looked shifted.

            Zeroing it below `lg` costs nothing: a horizontal gap is the space
            BETWEEN columns, and below `lg` both children are `col-span-12`,
            so there is no between. The 40px returns with the second column. */}
        <FadeIn className="relative grid grid-cols-12 items-center gap-x-0 gap-y-8 lg:gap-x-10">
          {/* Centred while there IS one column, left once there are two.

              Left alignment here was never a choice about this heading — it
              is what a heading does when something sits beside it. Stacked,
              nothing sits beside it, and the column ended up holding three
              different alignments at once: a left-aligned heading, a
              full-width button, and a map centred by `mx-auto`. That is the
              whole of what read as "not responsive" about this section.

              Centred, it also agrees with every other heading on the page —
              the hero, the pillars, the calculator and the catalogue are all
              centred, and this was the only left-aligned one, purely because
              of a second column that does not exist below `lg`. */}
          <div className="col-span-12 text-center lg:col-span-6 lg:text-left">
            {/* Two spans, each `block`, so the break is the sentence break
                and not wherever the column happens to run out. Left to wrap
                on its own it split mid-clause at some widths and after the
                full stop at others — the two halves are a call and an
                answer, and they only read that way when they are always on
                separate lines.

                "Pick one workflow", not "Bring us the workflow". You do not
                bring anyone a workflow; you have one. Naming a single one
                also makes the ask small, which is what a closing section wants —
                the reader is being asked to start, not to hand over
                everything. And "take it to production" is movement where
                "put it in production" was placement.

                No trailing stop: the interior one carries the two-beat
                rhythm, and the heading still ends clean. */}
            {/* `balance` matters only on a phone. At the 28px floor the
                second line measures within a few pixels of a 375px screen's
                text column, so it wraps on some phones and not others — and
                when it does wrap unaided it drops "production" onto a line
                by itself. Balanced, it breaks after "take it" instead, which
                is a phrase. Above the wrap point the property has nothing to
                balance and the desktop setting is untouched. */}
            <span className="mb-4 block font-mono text-[10px] font-bold tracking-[0.06em] text-ig-sky sm:text-[11px]">
              Let&rsquo;s Build What&rsquo;s Possible
            </span>
            <h2 className="balance font-extrabold leading-[1.05] tracking-[-0.04em] text-[clamp(28px,3.6vw,44px)] text-white">
              <span className="block">Fewer people.</span>
              <span className="serif-accent block font-normal text-ig-sky">
                Greater possibilities
              </span>
            </h2>
            <p className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.6] text-ig-lavender md:text-[17px]">
              Turn enterprise data and AI ambitions into governed, production-ready workflows
            </p>

            {/* NO `w-full`. THE button sizes to its own label at every width.

                `w-full sm:w-auto` was left over from when this button lived
                alone in the right-hand column and had to fill it. Under the
                heading it never needed to, and stretching it does three
                things, none of them wanted:

                  · At 639px it is 599px wide and at 640px it is 246px — a
                    353px jump at one pixel of resize, right in the middle of
                    the range a tablet sits in.
                  · A 599px pill is a banner. The label is 246px of it; the
                    rest is teal.
                  · A pill that wide has nothing in the middle of it. The
                    label is centred, so both ends are 175px of flat colour
                    with a fully-round radius on them, which reads as a
                    banner someone forgot to fill.

                `justify-center` under a centred heading, `lg:justify-start`
                once there is a second column to align against. */}
            <div className="mt-7 flex justify-center lg:justify-start">
              <PrimaryButton onClick={openContact}>
                Contact Us
                <ArrowRight className="h-3.5 w-3.5" />
              </PrimaryButton>
            </div>
          </div>

          {/* The map is decoration, not information — every office it marks is
              already named in the footer — so it is `aria-hidden` and carries
              an empty `alt`. A screen reader that announced two dozen city
              labels here would be reading a picture aloud for no gain.

              `width`/`height` match the file's own 527×259 viewBox so the
              browser reserves the right box before the SVG arrives and the
              button above it never gets shoved down mid-load.

              Capped at 440px rather than 560. The map is the tallest thing
              in the section, so it — not the copy — was setting the height
              of the whole band; 527 wide is its native size, and every pixel
              it is drawn above ~440 is height the text column has no use
              for.

              `ml-auto` is what pinned it to the right-hand edge of its own
              column, which is right while there IS a left-hand column. On one
              column the two stack, and that rule left a centred heading with
              a hard-right map under it. Centred until the grid splits at
              `lg`, then back to the right edge.

              A Gutter on both sides — Which IS what THE 440px CAP ALWAYS
              MEANT. IT just NEVER got THE chance.

              The full-bleed version that briefly lived here was solving the
              wrong problem. The map looked like it ran off the right edge
              because the GRID was 68px too wide and the map went with it: it
              was drawn 440px inside a 372px column and cropped on the right
              by `overflow-x: clip`, which is exactly what a bled map looks
              like. Bleeding it deliberately just made the crop official.

              With the grid fixed, `w-full` in a `col-span-12` column is 372px
              on a 412px screen, so the cap never binds and the map fills its
              column with the page container's own 20px gutter either side — the same
              inset every other section on the page uses, and now the same
              centre line as the heading and the button above it.

              The cap still earns its place from `sm` up, where the column
              keeps growing and 527px is the artwork's native size. */}
          <div className="col-span-12 lg:col-span-6">
            <img
              src="/Ignitho-Updated-Map.svg"
              alt=""
              aria-hidden="true"
              width="527"
              height="259"
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-[440px] select-none lg:ml-auto lg:mr-0"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

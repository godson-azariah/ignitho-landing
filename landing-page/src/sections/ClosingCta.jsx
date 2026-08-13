import { ArrowRight } from 'lucide-react';
import { Reveal } from '../components/Reveal.jsx';
import { TealButton } from '../components/SwapButton.jsx';
import { SHELL } from '../lib/layout.js';

/* The bottom bookend, on the same ground as the hero.

   Two columns now: everything you read on the left, the office map on the
   right. The button used to sit in the right-hand column opposite the
   heading, which put the one action in the section as far from the sentence
   asking for it as the grid allowed. Underneath the words is where a call to
   action belongs — you reach it by finishing the sentence. */
export function ClosingCta() {
  return (
    <section className="aurora dots-inv relative py-12 md:py-16">
      <div className={SHELL}>
        <Reveal className="relative grid grid-cols-12 items-center gap-x-10 gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            {/* Two spans, each `block`, so the break is the sentence break
                and not wherever the column happens to run out. Left to wrap
                on its own it split mid-clause at some widths and after the
                full stop at others — the two halves are a call and an
                answer, and they only read that way when they are always on
                separate lines.

                "Pick one workflow", not "Bring us the workflow". You do not
                bring anyone a workflow; you have one. Naming a single one
                also makes the ask small, which is what a closing CTA wants —
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
            <h2 className="balance font-extrabold leading-[1.05] tracking-[-0.04em] text-[clamp(28px,3.6vw,44px)] text-white">
              <span className="block">Pick one workflow.</span>
              <span className="serif-accent block font-normal text-ig-sky">
                We&rsquo;ll take it to production
              </span>
            </h2>

            {/* `inline-flex` on the wrapper, not `w-full`: the button used to
                stretch on small screens because it was the only thing in its
                column. Under the heading it can size to its own label. */}
            <div className="mt-7 flex">
              <TealButton className="w-full sm:w-auto">
                Schedule Executive Briefing
                <ArrowRight className="h-3.5 w-3.5" />
              </TealButton>
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
              `lg`, then back to the right edge. */}
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
        </Reveal>
      </div>
    </section>
  );
}

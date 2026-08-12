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
            {/* The 17ch cap is gone. At this size it broke a 48-character
                sentence over three lines inside a column wide enough for
                two, which is what made the block look ragged next to a
                rectangular map. Left to the column, it sets as two even
                lines. */}
            <h2 className="font-extrabold leading-[1.05] tracking-[-0.04em] text-[clamp(28px,3.6vw,44px)] text-white">
              Bring us the workflow.{' '}
              <span className="serif-accent font-normal text-ig-sky">
                We&rsquo;ll put it in production
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
              for. */}
          <div className="col-span-12 lg:col-span-6">
            <img
              src="/Ignitho-Updated-Map.svg"
              alt=""
              aria-hidden="true"
              width="527"
              height="259"
              loading="lazy"
              decoding="async"
              className="ml-auto h-auto w-full max-w-[440px] select-none"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

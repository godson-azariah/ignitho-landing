/* One suite, as its own page. Dark heading band, the summary and figures, the
   list of agents with a Test Agent button on each, a Contact Us card, and
   related suites at the foot.

   One file draws all nine of these. The layout never changes; only the suite
   handed to it does. */

import { useCallback, useState } from 'react';
import { ArrowRight, Check, Play } from 'lucide-react';
import { AgentDemo } from '../components/popups/AgentDemo.jsx';
import { HeroGlow } from '../components/artwork/HeroGlow.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { Button, PrimaryButton } from '../components/ui/Button.jsx';
import { SHELL } from '../lib/layout.js';
import { noOrphan } from '../lib/noOrphan.js';

/* One suite, in full. Holds which accelerator is being simulated — the
   simulator itself owns the run. */
export function SuitePage({ suite, openContact }) {
  const [demoAccelerator, setDemoAccelerator] = useState(null);
  const closeDemo = useCallback(() => setDemoAccelerator(null), []);

  return (
    <main>
      {/* top bar · BACKGROUND A (DARK PURPLE)

          NO "Back to all suites", for the same reason the FAQ page lost its back
          button: every suite has its own URL now, so the browser's back is the
          way out — and it is the better one, because a drawn button always
          returns to the catalogue while back returns to wherever the reader
          actually came from, which might be the footer directory or a search
          result or another suite.

          Losing it also loses the divider row it sat in, and that row plus its
          clearance was around 100px of top bar spent on one control. Padding
          comes down with it, and the display size from 78px to 60px.

          Centred, because nothing is left to align to a left edge. */}
      <section className="aurora relative overflow-hidden pb-10 pt-[112px] text-center md:pb-12 md:pt-[132px]">
        <HeroGlow />

        <div className={SHELL}>
          <div className="relative mx-auto max-w-3xl">
            {/* `noOrphan` on both. Suite names run long — "Enterprise Data Trust &
                Governance Suite", "Digital Growth & Brand Protection Suite" — so they wrap whatever
                the size, and without this the last line is regularly the single
                word "Suite" sitting under everything else. */}
            <h1 className="font-extrabold leading-[0.98] tracking-[-0.042em] text-[clamp(30px,4.6vw,60px)] text-white">
              {noOrphan(suite.name)}
            </h1>
            <p className="serif-accent mx-auto mt-5 max-w-2xl text-[20px] leading-[1.25] text-ig-lavender/85 md:text-[26px]">
              {noOrphan(suite.tagline)}
            </p>
          </div>
        </div>
      </section>
      {/* spread · BACKGROUND B (PALE LAVENDER) */}
      <section className="bg-b dots relative py-20 md:py-28">
        <div className={SHELL}>
          {/* `gap-x-0` below `lg`, where both children are `col-span-12`.

              A column gap is a fixed length and cannot shrink, so eleven of
              them at 40px give this grid a hard 440px minimum — 68px more
              than a 412px phone's shell has to offer. The grid overflowed and
              carried every child out with it, 34px off centre. There is no
              space BETWEEN columns to hold while there is one column. */}
          <div className="relative grid grid-cols-12 gap-x-0 gap-y-16 lg:gap-x-10">
            <FadeIn className="col-span-12 lg:col-span-7">
              <p className="plate whitespace-pre-line text-[20px] leading-[1.4] tracking-[-0.018em] text-ig-text md:text-[27px]">
                {suite.executiveSummary}
              </p>

              <div className="mt-12 rounded-[20px] bg-ig-ink px-7 py-7 text-white md:px-9 md:py-8">
                <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-teal-ring">
                  Target Business Impact
                </span>
                <p className="mt-4 text-[17px] font-bold leading-[1.3] tracking-[-0.02em] md:text-[21px]">
                  {suite.businessImpact}
                </p>
              </div>

              <ul className="plate mt-14">
                {suite.outcomes.map((b, idx) => (
                  <li
                    key={b}
                    className="flex items-start gap-5 border-t border-ig-ink/15 py-6 last:border-b"
                  >
                    <span className="mt-1 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <Check className="mt-1 h-4 w-4 shrink-0 text-ig-teal" strokeWidth={3} />
                    <span className="text-[15px] leading-[1.6] text-ig-text md:text-[17px]">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={120} className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                {/* `overflow-hidden` is what makes the rounding real here:
                    the three-segment rule and the image both run to the card's
                    own edge, so without it they would square off the corners
                    the border had just rounded. */}
                <div className="overflow-hidden rounded-[20px] border border-ig-ink/12 bg-white">
                  {/* three flat segments, not a blended bar */}
                  <span className="flex h-[4px] w-full">
                    <span className="flex-1 bg-ig-violet" />
                    <span className="flex-1 bg-ig-purple" />
                    <span className="flex-1 bg-ig-teal" />
                  </span>
                  <div className="h-40 overflow-hidden">
                    <img
                      src={suite.imageUrl}
                      alt={suite.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>

                  {/* `p-5` on a phone. This card is the narrowest column on
                      the site — 280px at its worst — and 28px of padding
                      either side takes a fifth of it before anything is set
                      in it. That was enough to wrap the longest sub-domain
                      onto a second line and to clip the button below, both
                      of which come back inside the box at 20px. Back to the
                      original 28px at `sm`. */}
                  <div className="p-5 sm:p-7">
                    <span className="font-mono text-[11.5px] font-bold tracking-[0.06em] text-ig-divider">
                      Sub-Domains:
                    </span>
                    <div className="mt-5">
                      {suite.subDomains.map((sub, idx) => (
                        <div
                          key={sub}
                          className="flex items-center gap-3.5 border-t border-ig-ink/10 py-3.5 first:border-t-0 first:pt-0"
                        >
                          <span className="font-mono text-[11px] font-bold text-ig-teal">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[14px] font-bold tracking-[-0.01em] text-ig-ink">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* THE button's label cannot wrap, so its padding has to
                        GIVE INSTEAD.

                        `.btn` is `white-space: nowrap`, so a label wider than
                        its pill does not fold onto a second line — it runs
                        past the pill's own edges. This is the tightest button
                        on the site: it is `w-full` inside the narrowest column
                        the page has, and it once held a 27-character label.

                        Trimming the padding is what buys the room back. `!`
                        because `PrimaryButton` sets `px-6` itself, and two
                        same-which style rule wins utilities resolve by source order
                        rather than by intent. */}
                    <PrimaryButton onClick={openContact} className="mt-7 w-full !px-4 sm:!px-6">
                      Contact Us
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* accelerators · BACKGROUND C (NEAR-WHITE) */}
      <section className="bg-c dots relative py-20 md:py-28">
        <div className={SHELL}>
          <FadeIn className="plate relative flex flex-col gap-6 border-b border-ig-ink/15 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="05">Embedded AI Accelerators</SectionLabel>
              <h2 className="mt-7 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(30px,4.6vw,58px)] text-ig-ink">
                {/* Not "Agents you can run today" — the page says deployment
                    takes days, so "today" contradicted it two sections
                    later, and the button below runs a simulation rather than
                    the agent itself. */}
                <span className="block">Agents in this suite</span>
              </h2>
            </div>
            {/* Original wording, with one factual correction kept: it said
                "Test Live Agent", and no control on the page carries that
                label — the button below says "Test Agent". */}
            <p className="font-mono text-[11px] tracking-[0.05em] text-ig-muted md:pb-2">
              Click "Test Agent" to simulate execution
            </p>
          </FadeIn>

          <div className="plate relative">
            {suite.accelerators.map((acc, idx) => (
              <FadeIn key={acc.name} delay={Math.min(idx * 55, 260)}>
                {/* A Plain tint, NOT THE wipe THE suite list uses.

                    The catalog's rows are the page's main navigation — nine
                    destinations, so a violet wipe that inverts the whole row
                    is doing real work there. These are not destinations; you
                    read down them and press one button. The same treatment
                    made every passing cursor repaint a block of text from
                    dark to white, which read as an event when nothing had
                    happened.

                    So: the section's own lavender, a straight cross-fade, and
                    every piece of text left exactly the colour it already
                    was. The only thing that follows the pointer now is the
                    title going purple — the same small acknowledgement the
                    suite cards make. */}
                <div className="group border-b border-ig-ink/15 transition-colors duration-300 hover:bg-ig-paper-2">
                  {/* Same fixed-gap floor, one size down: 11 × 32px = 352px,
                      which is more than the 335px a 375px phone's shell has.
                      These three children are all `col-span-12` until `md`,
                      so the gap goes with the split. */}
                  <div className="grid grid-cols-12 items-center gap-x-0 gap-y-5 py-8 md:gap-x-8">
                    <div className="col-span-12 flex items-start gap-5 md:col-span-4">
                      <span className="mt-1.5 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.025em] text-ig-ink transition-colors duration-300 group-hover:text-ig-purple md:text-[24px]">
                          {acc.name}
                        </h3>
                        <span className="serif-accent mt-1 block text-[16px] text-ig-purple">
                          {acc.type}
                        </span>
                      </div>
                    </div>

                    <p className="col-span-12 text-[13.5px] leading-[1.6] text-ig-muted md:col-span-5 md:text-[14.5px]">
                      {acc.desc}
                    </p>

                    {/* The badge is `whitespace-nowrap` and the button's
                        label cannot wrap either, so on a 320px screen the
                        pair is about 5px wider than the row and the button
                        loses its right edge off the side of the page.
                        `flex-wrap` lets the button drop under the badge
                        there, and does nothing at any width where the two
                        already fit. Explicitly back to `nowrap` at `md`, so
                        the desktop row cannot break even if a longer badge
                        ever lands in it. */}
                    <div className="col-span-12 flex flex-wrap items-center justify-between gap-4 md:col-span-3 md:flex-nowrap md:justify-end">
                      <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-bold tracking-[0.035em] text-ig-teal">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        Governed DAG Ready
                      </span>
                      <Button
                        onClick={() => setDemoAccelerator(acc)}
                        variant="ink"
                        className="shrink-0 px-5 py-3 text-[12.5px] font-semibold"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        Test Agent
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <AgentDemo accelerator={demoAccelerator} onClose={closeDemo} />
    </main>
  );
}

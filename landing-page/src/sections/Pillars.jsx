import { Cross } from '../components/Cross.jsx';
import { Kicker } from '../components/Kicker.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { PILLARS } from '../data/pillars.js';
import { SHELL } from '../lib/layout.js';
import { splitHeading } from '../lib/splitHeading.js';

/* All four at once, in a single row on desktop, rather than a sticky deck you
   had to scroll ~1500px to reach the end of. Nothing about the stack showed
   more than one card at a time, which is the opposite of a comparison. */
export function Pillars() {
  return (
    <section id="pillars" className="bg-b dots relative py-12 md:py-16">
      <div className={SHELL}>
        <Cross className="-top-7 left-1 md:left-3" />
        <Cross className="-top-7 right-1 md:right-3" />

        {/* centred: no bottom rule, which would read as a left-aligned
            device under a centred heading */}
        {/* `max-w-4xl`, up from 3xl. At the 48px ceiling the sentence measures
            828px, so a 768px column was the only reason it broke in two. */}
        <Reveal className="reveal-soft plate relative mx-auto max-w-4xl text-center">
          {/* Not another money line. Two of these four cards are about money
              and two are about risk and speed, so a heading promising the
              money mis-sells half its own contents — and "pays" already
              belongs to the hero. */}
          <Kicker index="02" centered>
            Strategic Pillars
          </Kicker>
          {/* ONE LINE: the two halves are inline now rather than forced blocks.
              `balance` still earns its place at the narrow end — 37 characters
              cannot fit one line on a phone at any size a section heading can be
              set in, so below about 600px it wraps, and balance is what makes
              that break fall evenly instead of stranding the last word.

              The "04 / 04" that sat under this has gone. It counted the pillars
              below, which the reader can see are four of four without being
              told, and it was the only counter of its kind on the page. */}
          <h2 className="balance mt-5 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(27px,3.9vw,48px)] text-ig-ink">
            What actually changes{' '}
            <span className="serif-accent font-normal text-ig-purple">once it is live</span>
          </h2>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            const heading = splitHeading(pillar.title);
            return (
              <Reveal key={pillar.title} delay={Math.min(i * 70, 240)} className="h-full">
                {/* h-full + flex-1 on the body: every card matches the
                    tallest in the row and every target line sits on the
                    same baseline, with no min-height guess */}
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[20px] p-6 text-white md:p-7 ${pillar.bg}`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 -right-1 select-none font-mono text-[110px] font-bold leading-none text-white/[0.07]"
                  >
                    {pillar.n}
                  </span>

                  {/* The mark is taken OUT of the flow and dropped back in
                      opacity.

                      In the flow it displaced the heading; beside it at full
                      strength it pulled the eye off-axis even when the heading
                      was centred to the pixel. Absolute positioning means it
                      occupies no width at all, so the heading centres across
                      the whole card, and at 30% it reads as a mark on the card
                      rather than as one half of a pair the eye then wants to
                      centre. */}
                  <Icon
                    aria-hidden="true"
                    className="pointer-events-none absolute left-6 top-6 h-8 w-8 text-white/30 md:left-7 md:top-7"
                    strokeWidth={1.5}
                  />

                  {/* One word per line, always.

                      All four titles are exactly two words, but by character
                      count "Revenue Acceleration" wrapped and "Cost Reduction"
                      did not — so reserving the height aligned the first lines
                      while leaving the short ones with a blank line under
                      them. Setting the pair makes every heading the same two
                      lines, so they match line for line across the row. */}
                  <h3 className="relative min-h-[2.04em] text-center font-extrabold leading-[1.02] tracking-[-0.028em] text-[clamp(20px,1.9vw,26px)]">
                    <span className="block">{heading[0]}</span>
                    <span className="block">{heading[1]}</span>
                  </h3>

                  <p className="relative mt-3 flex-1 text-center text-[14.5px] leading-[1.5] text-white">
                    {pillar.body}
                  </p>

                  <span className="relative mt-6 block border-t border-white/20 pt-4 text-center font-mono text-[11px] font-bold leading-[1.45] tracking-[0.05em] text-ig-teal-ring">
                    {pillar.target}
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

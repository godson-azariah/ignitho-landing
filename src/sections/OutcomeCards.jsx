/* "Enterprise-grade governance" — four violet cards on the pale
   lavender band.

   The words are in data/outcomes.js, along with the colour. All four cards
   share one colour on purpose; when they each had their own they read as four
   different categories rather than four results of the same thing. */

import { CornerMark } from '../components/ui/CornerMark.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { Check } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { COMPLIANCE_MARKS, OUTCOMES, OUTCOME_CARD_COLOUR } from '../data/outcomes.js';
import { SHELL } from '../lib/layout.js';

/* All four at once, in a single row on desktop, rather than a sticky deck you
   had to scroll ~1500px to reach the end of. Nothing about the stack showed
   more than one card at a time, which is the opposite of a comparison. */
export function OutcomeCards() {
  return (
    <section id="governance" className="bg-c dots relative py-16 md:py-24">
      <div className={SHELL}>
        <CornerMark className="-top-7 left-1 md:left-3" />
        <CornerMark className="-top-7 right-1 md:right-3" />

        {/* centred: no bottom rule, which would read as a left-aligned
            device under a centred heading */}
        {/* `max-w-4xl`, up from 3xl. At the 48px ceiling the sentence measures
            828px, so a 768px column was the only reason it broke in two. */}
        <FadeIn className="reveal-soft plate relative mx-auto max-w-4xl text-center">
          {/* Not another money line. Two of these four cards are about money
              and two are about risk and speed, so a heading promising the
              money mis-sells half its own contents — and "pays" already
              belongs to the hero. */}
          <SectionLabel index="05" centered>
            Built-In Trust, By Design
          </SectionLabel>
          {/* ONE LINE: the two halves are inline now rather than forced blocks.
              `balance` still earns its place at the narrow end — 37 characters
              cannot fit one line on a phone at any size a section heading can be
              set in, so below about 600px it wraps, and balance is what makes
              that break fall evenly instead of stranding the last word.

              The "04 / 04" that sat under this has gone. It counted the pillars
              below, which the reader can see are four of four without being
              told, and it was the only counter of its kind on the page. */}
          <h2 className="balance mt-5 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(30px,4.8vw,64px)] text-ig-ink">
            Governance is part of the method, not an{' '}
            <span className="serif-accent font-normal text-ig-purple">add-on</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px]">
            Security, privacy and compliance are checked at every stage, so teams can
            automate with confidence
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-5">
          {OUTCOMES.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <FadeIn key={pillar.title} delay={Math.min(i * 70, 240)} className="h-full">
                {/* h-full + flex-1 on the body: every card matches the
                    tallest in the row and every target line sits on the
                    same baseline, with no min-height guess */}
                {/* One fill for the row, from `pillars.js`, rather than a
                    per-card colour. Four different depths made these read as
                    four categories; they are four outcomes of one thing.

                    `lift` is the hover, and it is deliberately the smallest one
                    the page has: 3px and a shadow, pointer devices only. These
                    cards do nothing when clicked, so the hover is not promising
                    an action — it is only acknowledging that the pointer is on
                    this one rather than its neighbour. Anything larger would be
                    an invitation the card cannot honour. */}
                <article
                  className={`lift relative flex h-full flex-col overflow-hidden rounded-[20px] p-6 text-white md:p-7 ${OUTCOME_CARD_COLOUR}`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 -right-1 select-none font-mono text-[110px] font-bold leading-none text-white/[0.07]"
                  >
                    {pillar.n}
                  </span>

                  {/* THE SAME OPENING ROW EVERY OTHER CARD ON THIS PAGE HAS:
                      the mark in a chip, the label beside it.

                      This card used to centre its title and body while its own
                      list of points ran left underneath them — two alignments
                      inside one box, which is most of what made the row look
                      unplanned next to the solutions and accelerator cards.
                      Everything reads from one left edge now, and the row of
                      four matches the rows above and below it. */}
                  <span className="relative flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-white/[0.12] text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <span className="font-mono text-[10px] font-bold leading-[1.4] tracking-[0.055em] text-white/60">
                      {pillar.kicker}
                    </span>
                  </span>

                  {/* One word per line, always.

                      All four titles are exactly two words, but by character
                      count "Revenue Acceleration" wrapped and "Cost Reduction"
                      did not — so reserving the height aligned the first lines
                      while leaving the short ones with a blank line under
                      them. Setting the pair makes every heading the same two
                      lines, so they match line for line across the row. */}
                  <h3 className="relative mt-5 min-h-[2.1em] font-extrabold leading-[1.05] tracking-[-0.028em] text-[clamp(19px,1.7vw,23px)]">
                    {pillar.title}
                  </h3>

                  <p className="relative mt-3 text-[13.5px] leading-[1.55] text-white/90">
                    {pillar.body}
                  </p>

                  {/* The supporting lines, ticked. The tick is the same teal
                      mark the suite pages use for a confirmed thing, at the
                      smallest size that stays legible on a violet ground. */}
                  <ul className="relative mt-5 flex-1 space-y-2 border-t border-white/20 pt-4">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check
                          aria-hidden="true"
                          className="mt-[3px] h-3 w-3 shrink-0 text-ig-teal-ring"
                          strokeWidth={3}
                        />
                        <span className="text-[12.5px] leading-[1.45] text-white/85">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="relative mt-5 block border-t border-white/20 pt-4 font-mono text-[10.5px] font-bold leading-[1.45] tracking-[0.05em] text-ig-teal-ring">
                    {pillar.target}
                  </span>
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* The six marks the platform is held to. A row of small facts under
            four large claims: the claims say what it does, these say what it is
            bound by, and the second is what a compliance reader came for.

            Chips rather than another card row — they are labels, not
            arguments, and a card would give each one more weight than a
            two-word phrase can carry. */}
        <FadeIn delay={200} className="plate mt-10 md:mt-12">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {COMPLIANCE_MARKS.map((mark) => (
              <li
                key={mark}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_10px_28px_-24px_rgba(22,6,58,0.8)] ring-1 ring-inset ring-ig-purple/[0.14]"
              >
                <Check className="h-3 w-3 shrink-0 text-ig-teal" strokeWidth={3.2} />
                <span className="font-mono text-[10.5px] font-bold tracking-[0.055em] text-ig-ink">
                  {mark}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

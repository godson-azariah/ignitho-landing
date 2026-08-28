/* The bridge between the workflow and the catalogue: what the two families of
   suite are for, before you meet the nine of them.

   Two cards, because there are two families. Each one carries the group's own
   heading and description, and a way into the catalogue already filtered to it,
   so reading about foundations and then seeing only foundations is one press
   rather than a scroll and a guess. */

import { ArrowRight } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { CornerMark } from '../components/ui/CornerMark.jsx';
import { SUITES } from '../data/suites.js';
import { SHELL } from '../lib/layout.js';

const GROUPS = [
  {
    id: 'FOUNDATION',
    type: 'foundation',
    label: 'Foundation',
    noun: 'capabilities',
    cta: 'Explore capabilities',
    title: 'Build faster.',
    accent: 'Automate smarter',
    body: 'Core capabilities that solve reusable enterprise problems across data engineering, analysis, quality, analytics and AI workflows'
  },
  {
    id: 'INDUSTRY',
    type: 'industry',
    label: 'Industry Applications',
    noun: 'applications',
    cta: 'Explore applications',
    title: 'Apply the method to',
    accent: 'real industries',
    body: 'Industry-focused applications built on the same governed method, covering healthcare, financial services, retail and more'
  }
];

/* #5212BA, opened out. All three stops are the same hue and the same
   saturation — only the lightness moves, 46 → 40 → 26 — so it is one colour
   getting deeper rather than two colours meeting, which is what keeps it from
   reading as harsh. It runs down and slightly right, the same direction as
   every shadow on this page, so the lit end is the end nearest the light.

   The sweep is weighted downwards on purpose. The top of the card is where the
   small type sits, and the sky `[01]` at 11px needs 4.5:1 — at 46% lightness
   it has 4.51, and any lighter than that it fails. Below the middle stop there
   is nothing to protect, so that is where the travel goes. */
const CARD_BG = 'linear-gradient(160deg, #6016D8 0%, #5212BA 42%, #360C79 100%)';

export function Solutions({ onPickGroup }) {
  return (
    <section id="solutions" className="bg-c dots relative py-16 md:py-24">
      <div className={SHELL}>
        <CornerMark className="-top-7 left-1 md:left-3" />
        <CornerMark className="-top-7 right-1 md:right-3" />

        <FadeIn className="reveal-soft plate mx-auto max-w-4xl text-center">
          <SectionLabel index="02" centered>
            One Method. Many Possibilities.
          </SectionLabel>
          <h2 className="balance mt-5 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(30px,4.8vw,64px)] text-ig-ink">
            Solutions that scale with your ambition
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px]">
            From core method to industry application: foundational capabilities power
            reusable, industry-specific automation through one governed framework
          </p>
        </FadeIn>

        {/* Two across from `md`, stacked below it. Never three: there are two
            families, and a grid that could hold a third invites one. */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2">
          {GROUPS.map((group, i) => {
            return (
              <FadeIn key={group.id} delay={i * 90} className="h-full">
                <button
                  type="button"
                  onClick={() => onPickGroup(group.id)}
                  style={{ backgroundColor: '#5212BA', backgroundImage: CARD_BG }}
                  className="lift group relative flex h-full w-full flex-col overflow-hidden rounded-[22px] p-7 text-left shadow-[0_2px_4px_rgba(22,6,58,0.12),0_30px_70px_-40px_rgba(41,8,96,0.85)] ring-1 ring-inset ring-white/[0.12] md:p-9"
                >
                  {/* THE CARD IS #5212BA, so everything on it inverts. Ink,
                      muted and purple were all chosen against white and none of
                      them survive a saturated violet — muted grey on this reads
                      as dirt. Sky for the accents, which is what this site puts
                      on violet everywhere else, and lavender for the quiet type,
                      which is the token that exists because low-alpha white goes
                      grey on this exact colour. */}
                  <span className="relative flex items-center justify-between gap-4 font-mono text-[11px] font-bold tracking-[0.03em] text-ig-lavender/60">
                    <span>
                      <span className="text-ig-sky">[{String(i + 1).padStart(2, '0')}]</span>{' '}
                      {group.label}
                    </span>
                    {/* counted from the list below rather than typed, so the
                        number cannot disagree with the names it is counting */}
                    <span className="shrink-0">
                      {String(SUITES.filter((suite) => suite.type === group.type).length).padStart(2, '0')}{' '}
                      {group.noun}
                    </span>
                  </span>

                  {/* the serif italic, which every other heading on this page
                      uses for its second phrase */}
                  <span className="relative mt-7 block text-[24px] font-extrabold leading-[1.18] tracking-[-0.03em] text-white md:text-[30px]">
                    {group.title}{' '}
                    <span className="serif-accent font-normal text-ig-sky">{group.accent}</span>
                  </span>

                  <span className="relative mt-4 block max-w-[46ch] text-[15px] leading-[1.6] text-ig-lavender/80 md:text-[16px]">
                    {group.body}
                  </span>

                  {/* THE LIST IS WHAT THE CARD IS FOR. Stacked, each name owns a
                      line and needs no separator; the six go in two columns
                      against the three in one, so both cards are three rows deep
                      and finish level. */}
                  <span
                    className={`relative mt-7 grid flex-1 content-start gap-x-8 gap-y-2.5 text-[15px] font-medium leading-[1.4] tracking-[-0.01em] text-white md:text-[16px] ${
                      SUITES.filter((suite) => suite.type === group.type).length > 3
                        ? 'sm:grid-cols-2'
                        : 'grid-cols-1'
                    }`}
                  >
                    {SUITES.filter((suite) => suite.type === group.type).map((suite) => (
                      <span key={suite.id}>{suite.name}</span>
                    ))}
                  </span>

                  <span className="relative mt-8 flex items-center justify-between font-mono text-[11px] font-bold tracking-[0.03em] text-ig-lavender/60">
                    {group.cta}
                    <ArrowRight
                      className="h-4 w-4 text-ig-sky transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.4}
                    />
                  </span>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

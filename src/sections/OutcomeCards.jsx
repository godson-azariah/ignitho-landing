/* "Governance is part of the method" (section 5), as four cards (earlier: a compliance ledger,
   the way security pages lay out controls for a reviewer to scan: one white
   panel, one row per control, hairlines between. Each row reads left to
   right: the control (its area and name), what it means, how it is enforced
   (the ticked points), and the result. The standards the platform is held
   to run along the foot of the panel. No icons, no numbers. The words are in
   data/outcomes.js. Styles in governance.css (.lg-). Earlier versions are
   kept in design-research/backup. */

import { CornerMark } from '../components/ui/CornerMark.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { Check } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { COMPLIANCE_MARKS, OUTCOMES } from '../data/outcomes.js';
import { SHELL } from '../lib/layout.js';

export function OutcomeCards() {
  return (
    <section id="governance" className="gv bg-b dots relative py-16 md:py-24">
      <div className={SHELL}>
        <CornerMark className="-top-7 left-1 md:left-3" />
        <CornerMark className="-top-7 right-1 md:right-3" />

        <FadeIn className="reveal-soft plate relative mx-auto max-w-4xl text-center">
          <SectionLabel index="05" centered>
            Built-In Trust, By Design
          </SectionLabel>
          <h2 className="balance mt-5 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(30px,4.8vw,64px)] text-ig-ink">
            Governance is part of the method, not an{' '}
            <span className="serif-accent font-normal text-ig-purple">add-on</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px]">
            Security, privacy and compliance are checked at every stage, so teams can automate with confidence
          </p>
        </FadeIn>

        {/* the original layout, four cards in one row: the mark and the
            area, the title, what it means, its points, and the result at
            the foot; drawn as clean white tiles */}
        <ul className="gd-grid">
          {OUTCOMES.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <FadeIn as="li" key={pillar.title} delay={Math.min(i * 80, 240)} className="gd-cell">
                <article className="gd-card">
                  <span className="gd-top">
                    <span className="gd-mark">
                      <Icon aria-hidden="true" strokeWidth={1.9} />
                    </span>
                    <span className="gd-kicker">{pillar.kicker}</span>
                  </span>
                  <h3 className="gd-title">{pillar.title}</h3>
                  <p className="gd-body">{pillar.body}</p>
                  <ul className="gd-points">
                    {pillar.points.map((point) => (
                      <li key={point}>
                        <Check aria-hidden="true" strokeWidth={2.6} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="gd-result">{pillar.target}</p>
                </article>
              </FadeIn>
            );
          })}
        </ul>

        <FadeIn delay={200} className="plate">
          <ul className="gd-marks">
            {COMPLIANCE_MARKS.map((mark) => (
              <li key={mark}>
                <Check aria-hidden="true" strokeWidth={3} />
                {mark}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

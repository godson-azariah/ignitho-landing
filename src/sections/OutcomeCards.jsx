/* "Governance is part of the method" (section 5), as four cards in a row:
   the area with its mark at the top right, the title, what it means, how it
   is enforced (the ticked points), and the result as the card's footer.
   Each is a plain white card of words only, no pictures, icons or dark
   grounds: the area in purple, the title, what it means, the ticked points
   gathered in a soft lavender panel, and the result as a footer. The
   standards the platform is held to sit below as pills. The words are in
   data/outcomes.js. Styles in governance.css (.gd-). Earlier versions are
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
          <h2 className="sec-title mt-5">
            <span>Governance is part of the method,</span>
            <span className="sec-accent">not an add-on</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-ig-muted md:text-[17px]">
            Security, privacy and compliance are checked at every stage, so teams can automate with confidence
          </p>
        </FadeIn>

        {/* the original layout, four cards in one row: the area and its
            mark, the title, what it means, its points, and the result at
            the foot */}
        <ul className="gd-grid">
          {OUTCOMES.map((pillar, i) => {
            return (
              <FadeIn as="li" key={pillar.title} delay={Math.min(i * 80, 240)} className="gd-cell">
                <article className="gd-card">
                  <div className="gd-main">
                    <span className="gd-kicker">{pillar.kicker}</span>
                    <h3 className="gd-title">{pillar.title}</h3>
                    <p className="gd-body">{pillar.body}</p>
                    <ul className="gd-points">
                      {pillar.points.map((point) => (
                        <li key={point}>
                          <span className="gd-tick">
                            <Check aria-hidden="true" strokeWidth={3} />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* the result, as the card's footer */}
                  <p className="gd-result">
                    {pillar.target}
                  </p>
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

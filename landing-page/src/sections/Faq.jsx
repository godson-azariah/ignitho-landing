import { useState } from 'react';
import { Plus } from 'lucide-react';
import { HeroStage } from '../components/HeroStage.jsx';
import { Kicker } from '../components/Kicker.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { TealButton } from '../components/SwapButton.jsx';
import { FAQ_GROUPS } from '../data/faq.js';
import { SHELL } from '../lib/layout.js';
import { noOrphan } from '../lib/noOrphan.js';

/* The FAQ, as a page rather than a section — same two-part shape a suite page
   uses, so arriving here from the masthead feels like the same site: the dark
   aurora masthead with a way back, then a light band with the content.

   ONE OPEN AT A TIME, tracked by a single id rather than a set. An accordion
   that lets everything open at once is a list of paragraphs with extra clicks in
   front of it; the point of the control is that the page stays scannable, and it
   only does that if opening the ninth question closes whichever was open before.

   The disclosure uses `.disclose` from `controls.css`, which animates
   `grid-template-rows` from `0fr` to `1fr`. That is the one technique that opens
   to the content's OWN height without anyone measuring it — no `max-height`
   guess that clips a long answer or leaves a short one hanging. */
export function Faq({ openContact }) {
  const [open, setOpen] = useState(null);

  return (
    <main>
      {/* masthead · FLAVOUR A

          NO BACK BUTTON, AND NOTHING REPLACES IT. This page has its own URL now,
          so the browser's back is the way out — and a second one drawn on the
          page is both redundant and worse, because it always goes to the index
          where back goes wherever you actually came from.

          Removing it took the divider row with it, which is most of why this is
          shorter: the row, its rule and the 48px of clearance under it were 100px
          of masthead in service of one control. The rest comes off the padding —
          136/80 down to 116/56 — and off the display size, 78px down to 60px,
          which is where the heading fits one line rather than two.

          Centred, because there is nothing left to align to a left edge. */}
      <section className="aurora relative overflow-hidden pb-10 pt-[112px] text-center md:pb-12 md:pt-[132px]">
        <HeroStage />

        <div className={SHELL}>
          <div className="relative mx-auto max-w-3xl">
            {/* `noOrphan` on both: it swaps the last space for a non-breaking one,
                so whatever else happens the final line can never be one word on
                its own. On the heading that is the difference between "Questions
                people ask" over "first" and a clean two-line break. */}
            <h1 className="font-extrabold leading-[0.98] tracking-[-0.042em] text-[clamp(30px,4.6vw,60px)] text-white">
              {noOrphan('Questions people ask first')}
            </h1>
            <p className="mx-auto mt-6 max-w-[54ch] text-[16.5px] leading-[1.5] text-ig-lavender md:text-[19px]">
              {noOrphan(
                'What the suites are, how long they take to stand up, and who is accountable for what they do'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* content · FLAVOUR B */}
      <section className="bg-b dots relative py-20 md:py-28">
        <div className={SHELL}>
          <div className="mx-auto max-w-3xl">
            {FAQ_GROUPS.map((group, gi) => (
              <div key={group.id} className={gi ? 'mt-14 md:mt-16' : ''}>
                <Reveal className="plate">
                  <Kicker index={String(gi + 1).padStart(2, '0')}>{group.title}</Kicker>
                </Reveal>

                <div className="plate mt-6">
                  {group.items.map((item, i) => {
                    const id = `${group.id}-${i}`;
                    const on = open === id;
                    return (
                      <Reveal key={item.q} delay={Math.min(i * 60, 200)}>
                        <div className="border-b border-ig-ink/15 first:border-t">
                          <button
                            type="button"
                            onClick={() => setOpen(on ? null : id)}
                            aria-expanded={on}
                            aria-controls={`faq-${id}`}
                            className="flex w-full items-start justify-between gap-6 py-5 text-left md:py-6"
                          >
                            <span
                              /* Up from 16/18. A question is the thing you scan
                                 for, so on a page that is nothing but questions
                                 it should be set at reading size rather than at
                                 list size. */
                              className={`text-[17.5px] font-extrabold leading-[1.35] tracking-[-0.02em] transition-colors duration-300 md:text-[21px] ${
                                on ? 'text-ig-purple' : 'text-ig-ink'
                              }`}
                            >
                              {item.q}
                            </span>
                            {/* One glyph doing both states: a plus that turns
                                into a minus. Two icons swapped on a condition
                                would cross-fade through a frame where neither
                                is quite either. */}
                            <span
                              className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out ${
                                on
                                  ? 'rotate-[135deg] bg-ig-purple/[0.12] text-ig-purple'
                                  : 'bg-white text-ig-purple'
                              }`}
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                            </span>
                          </button>

                          <div id={`faq-${id}`} className={`disclose ${on ? 'open' : ''}`}>
                            <div>
                              {/* Up from 14.5/15.5, and the measure comes down
                                  from 62ch to 58ch to go with it — a longer line
                                  at a bigger size is harder to read, not easier,
                                  so the two have to move in opposite
                                  directions. */}
                              {/* `pr-10` keeps the answer clear of the plus
                                  button's column on a wide row. On a phone that
                                  column is 40px out of about 240, so the same
                                  rule costs a sixth of the measure to dodge a
                                  control that is not beside the answer at all —
                                  it is beside the question, a line above. */}
                              <p className="max-w-[58ch] pb-6 pr-1 text-[15.5px] leading-[1.65] text-ig-muted md:pr-10 md:text-[17px]">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* The one thing an FAQ owes a reader it could not answer */}
            <Reveal className="plate mt-16 flex flex-col items-center gap-5 rounded-[20px] border border-dashed border-ig-ink/25 px-6 py-10 text-center">
              <p className="text-[17px] font-extrabold tracking-[-0.02em] text-ig-ink md:text-[19px]">
                Something here not covered?
              </p>
              <TealButton onClick={openContact}>Contact Sales</TealButton>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

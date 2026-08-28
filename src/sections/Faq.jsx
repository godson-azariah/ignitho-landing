/* The questions page. Opening one answer closes whichever was open before,
   which is the only reason the page stays scannable.

   Questions and answers are in data/faq.js. */

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { HeroGlow } from '../components/artwork/HeroGlow.jsx';
import { SectionLabel } from '../components/ui/SectionLabel.jsx';
import { FadeIn } from '../components/ui/FadeIn.jsx';
import { PrimaryButton } from '../components/ui/Button.jsx';
import { FAQ_GROUPS } from '../data/faq.js';
import { SHELL } from '../lib/layout.js';
import { noOrphan } from '../lib/noOrphan.js';

/* The FAQ, as a page rather than a section — same two-part shape a suite page
   uses, so arriving here from the top bar feels like the same site: the dark
   aurora top bar with a way back, then a light band with the content.

   One open at A TIME, tracked by a single id rather than a set. An open-and-close list
   that lets everything open at once is a list of paragraphs with extra clicks in
   front of it; the point of the control is that the page stays scannable, and it
   only does that if opening the ninth question closes whichever was open before.

   The open-and-close panel uses `.disclose` from `controls.css`, which animates
   `grid-template-rows` from `0fr` to `1fr`. That is the one technique that opens
   to the content's OWN height without anyone measuring it — no `max-height`
   guess that clips a long answer or leaves a short one hanging. */
export function Faq({ openContact }) {
  const [open, setOpen] = useState(null);

  return (
    <main>
      {/* top bar · BACKGROUND A (DARK PURPLE)

          No back button, AND nothing replaces IT. This page has its own URL now,
          so the browser's back is the way out — and a second one drawn on the
          page is both redundant and worse, because it always goes to the home page
          where back goes wherever you actually came from.

          Removing it took the divider row with it, which is most of why this is
          shorter: the row, its rule and the 48px of clearance under it were 100px
          of top bar in service of one control. The rest comes off the padding —
          136/80 down to 116/56 — and off the display size, 78px down to 60px,
          which is where the heading fits one line rather than two.

          Centred, because there is nothing left to align to a left edge. */}
      <section className="aurora relative overflow-hidden pb-10 pt-[112px] text-center md:pb-12 md:pt-[132px]">
        <HeroGlow />

        <div className={SHELL}>
          <div className="relative mx-auto max-w-3xl">
            {/* The eyebrow this page never had. Every other band on the site
                opens with one; the questions page opened on its headline. */}
            <span className="mb-5 block font-mono text-[10px] font-bold tracking-[0.06em] text-ig-sky sm:text-[11px]">
              Common Questions
            </span>
            {/* `noOrphan` on both: it swaps the last space for a non-breaking one,
                so whatever else happens the final line can never be one word on
                its own. On the heading that is the difference between "Questions
                people ask" over "first" and a clean two-line break. */}
            <h1 className="font-extrabold leading-[0.98] tracking-[-0.042em] text-[clamp(30px,4.6vw,60px)] text-white">
              {noOrphan('Questions before you explore')}
            </h1>
            <p className="mx-auto mt-6 max-w-[54ch] text-[16.5px] leading-[1.5] text-ig-lavender md:text-[19px]">
              {noOrphan(
                'Understand how the method, applications and capabilities work together across enterprise workflows'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* content · BACKGROUND B (PALE LAVENDER) */}
      {/* THE top AND bottom paddings are no longer THE same number, because
          what sits above and below this band is not the same kind of thing.

          Above is the dark purple background top bar, and a band opening under one needs its
          own clearance — 80/112px. Below is the dark closing band at the very top or very bottom, which
          brings 48/64px of its own padding before its first line of type. The
          two paddings ADD: at py-28 the run from the button to "Pick one
          workflow" was 112 + 64 = 176px of nothing, on top of which the eye
          also reads the colour change as a break. A band boundary does not need
          to be announced twice.

          40/56 at the bottom puts that run at about 120px, which is a section
          gap rather than a gulf — and the dark band still supplies most of it,
          which is the right way round: the air belongs to the band that is
          starting, not to the one that has finished. */}
      <section className="bg-b dots relative pb-10 pt-20 md:pb-14 md:pt-28">
        <div className={SHELL}>
          <div className="mx-auto max-w-3xl">
            {FAQ_GROUPS.map((group, gi) => (
              <div key={group.id} className={gi ? 'mt-14 md:mt-16' : ''}>
                <FadeIn className="plate">
                  <SectionLabel index={String(gi + 1).padStart(2, '0')}>{group.title}</SectionLabel>
                </FadeIn>

                <div className="plate mt-6">
                  {group.items.map((item, i) => {
                    const id = `${group.id}-${i}`;
                    const on = open === id;
                    return (
                      <FadeIn key={item.q} delay={Math.min(i * 60, 200)}>
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
                            {/* One letter shape doing both states: a plus that turns
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
                              {/* Up from 14.5/15.5, and the text width comes down
                                  from 62ch to 58ch to go with it — a longer line
                                  at a bigger size is harder to read, not easier,
                                  so the two have to move in opposite
                                  directions. */}
                              {/* `pr-10` keeps the answer clear of the plus
                                  button's column on a wide row. On a phone that
                                  column is 40px out of about 240, so the same
                                  rule costs a sixth of the text width to dodge a
                                  control that is not beside the answer at all —
                                  it is beside the question, a line above. */}
                              <p className="max-w-[58ch] pb-6 pr-1 text-[15.5px] leading-[1.65] text-ig-muted md:pr-10 md:text-[17px]">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* The one thing an FAQ owes a reader it could not answer */}
            {/* No card at all now — the dashed outline has gone, and with it the
                radius and the padding that only existed to sit inside it.

                A dashed border is a placeholder convention: it says "something
                belongs here and does not exist yet". Around a real question and
                a real button it was drawing a box whose only content was the
                two things already legible without it, and the box is what made
                the space around them read as empty rather than as clear.

                So: a centred line of type and the page's standard pill under
                it, and nothing else. Sizes are untouched — 17/19px and the
                normal button. Everything that changed is space:

                  above it         mt-16 → mt-10   64px → 40px
                  its own padding  py-10 → none    40px top and bottom → 0
                  question→button  gap-5 → gap-4   20px → 16px
                  the plate reach                  62px → 24px per side

                The plate stays and still earns it: there is no fill here, so
                without it the band's dot grid runs straight under the question.
                `plate-tight` keeps the texture off the words at a quarter of
                the reach — at full size it cleared a 60px moat that read as
                emptiness of its own. */}
            <FadeIn className="plate plate-tight mt-10 flex flex-col items-center gap-4 text-center">
              <p className="text-[17px] font-extrabold tracking-[-0.02em] text-ig-ink md:text-[19px]">
                Something here not covered?
              </p>
              <PrimaryButton onClick={openContact}>Contact Us</PrimaryButton>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}

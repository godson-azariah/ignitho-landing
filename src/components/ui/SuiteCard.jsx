/* One suite drawn as a white card, used in the catalogue and again at the foot
   of a suite page. Hand it a suite and it draws whatever it is given; there
   are no words of its own in here. */

import { ArrowUpRight } from 'lucide-react';
import { BLOCKS } from '../../lib/layout.js';
import { noOrphan } from '../../lib/noOrphan.js';
import { splitHeading } from '../../lib/splitHeading.js';

/* One suite, as a card.

   Takes a whole `suite` object rather than a dozen separate props, so any list
   that already has suites can render these without unpacking them first.
   `accent` picks the icon chip's colour: pass one to fix it, or leave it and
   the card takes its turn from `BLOCKS` by index.

   Everything about it is self-sizing — the heading is set as a deliberate
   two-line pair and the tagline and callout each RESERVE two lines, so a row
   of these aligns line for line without the parent knowing anything about
   heights. That is what makes it safe to drop into a different grid.

   Usage:
     <SuiteCard suite={s} index={i} onOpen={openSuite} />
*/
export function SuiteCard({ suite, index = 0, accent, onOpen }) {
  const Icon = suite.icon;
  const chip = accent ?? BLOCKS[index % BLOCKS.length];
  /* Every run of text in the card goes through `noOrphan`, so no line
     anywhere on it can end up carrying a single stranded word. Applied at
     the point of use rather than to the data, because it is a typesetting
     decision about THIS layout — the same suite name in the suite page
     top bar has a whole column to itself and needs no help. */
  const heading = splitHeading(suite.name).map(noOrphan);

  return (
    /* The whole card is the control; "Read more" is the affordance rather than
       a separate button. */
    <button
      onClick={() => onOpen?.(suite.id)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-white text-center shadow-[0_10px_36px_-26px_rgba(22,6,58,0.45)] transition-all duration-[400ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-32px_rgba(22,6,58,0.55)]"
    >
      {/* the brand rule across the top edge */}
      <span
        aria-hidden="true"
        className="block h-[3px] w-full bg-[linear-gradient(90deg,#4A2FD4_0%,#7A00C2_52%,#00A274_100%)]"
      />

      <span className="relative block h-[92px] overflow-hidden">
        <img
          src={suite.imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,7,34,0.62)_0%,rgba(13,7,34,0.3)_55%,rgba(13,7,34,0.5)_100%)]"
        />
        <span className="absolute left-4 top-3.5 whitespace-nowrap rounded-full border border-white/30 bg-white/12 px-3.5 py-1 text-[12px] font-bold tracking-[-0.01em] text-white">
          Suite {suite.number}
        </span>
        <span
          className={`absolute right-4 top-3.5 grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white ${chip}`}
        >
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.9} />
        </span>
      </span>

      {/* The body is lifted over the band and rounded, so the picture reads as
          something the card sits on rather than a slab stuck to its top. */}
      <span className="relative -mt-3 flex flex-1 flex-col rounded-t-[18px] bg-white px-5 pb-5 pt-5">
        {/* Set as two deliberate lines, centred. Reserving the pair also keeps
            every card's tagline and ROI block on the same baseline across the
            row. */}
        <span className="block text-[18px] font-extrabold leading-[1.2] tracking-[-0.022em] text-ig-ink lg:text-[21px]">
          <span className="block">{heading[0]}</span>
          <span className="block">{heading[1]}</span>
        </span>

        <span className="clamp-2 mt-2.5 min-h-[2.6em] text-[14px] font-bold leading-[1.35] text-ig-teal">
          {noOrphan(suite.tagline)}
        </span>

        {/* callout: tinted, with a coloured left border. Centred like the rest
            of the card — it was the one block still set left, which read as a
            misalignment rather than as a deliberate change of alignment. */}
        <span className="mt-4 block rounded-r-md border-l-2 border-ig-purple bg-ig-paper-2 px-4 py-3 text-center">
          <span className="block whitespace-nowrap text-[11.5px] font-bold tracking-[-0.005em] text-ig-purple">
            Measured target ROI
          </span>
          <span className="clamp-2 mt-1.5 min-h-[2.8em] text-[13.5px] leading-[1.45] text-ig-ink">
            {noOrphan(suite.businessImpact)}
          </span>
        </span>

        <span className="mt-auto flex items-center justify-center gap-1.5 whitespace-nowrap pt-4 text-[14px] font-bold text-ig-ink transition-colors duration-300 group-hover:text-ig-purple">
          Read more
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.4}
          />
        </span>
      </span>
    </button>
  );
}

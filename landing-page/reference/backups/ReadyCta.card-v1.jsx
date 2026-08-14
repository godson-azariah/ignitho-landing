import { ArrowUpRight, Check } from 'lucide-react';
import { Reveal } from '../components/Reveal.jsx';
import { TealButton } from '../components/SwapButton.jsx';
import { SIGN_IN_URL } from '../data/navigation.js';
import { SHELL } from '../lib/layout.js';

/* THE THREE FACTS THE STRIP CARRIES, and not one of them is new.

     1  the catalogue's own split — this is its section heading, word for word
     2  the badge on every accelerator row of every suite page
     3  the claim the walkthrough two sections up is built on

   CUT TO ONE LINE EACH, AND THAT IS A STRUCTURAL FIX RATHER THAN AN EDIT. Three
   columns only read as three columns if they are of a size; the first of these
   ran to 51 characters and wrapped while its neighbours did not, which left the
   strip with one tall column and two short ones and a ragged bottom edge. At
   32, 34 and 31 characters they set as one line each in every column width the
   card has — 224px, 235px and 214px against a 266px column at the narrowest
   point the three-across layout exists at.

   Shorter is also truer to the page: "Three foundations, six verticals" is the
   catalogue's own heading rather than my paraphrase of it, and dropping
   "every" for a plural says the same thing in a third of the width. */
const PROOF = [
  'Three foundations, six verticals',
  'Accelerators ship as governed DAGs',
  'Live in days rather than months'
];

/* The soft prompt between the walkthrough and the closing bookend.

   REDESIGNED AGAINST THE PATTERN EVERY CTA LIBRARY CONVERGES ON: copy and the
   action on one side, a small panel answering "yes but" on the other. The
   advice underneath it is consistent across sources — neutralise the reasons a
   qualified reader hesitates BEFORE the last ask, and keep one primary action
   rather than two competing ones.

   That is what was wrong with the previous version, and it was not the styling.
   It was a badge, a heading, a sentence and a button, and every one of those
   was an assertion; there was nothing on the card a sceptical reader could
   check. A card with nothing to read but its own claim looks plain however it
   is set, because there is genuinely very little there.

   WHAT CHANGED, in order of how much it matters:

     · The three specifics came out of the paragraph and became a checked list
       in a panel of its own. Same words, structured — and structure is the
       difference between "we say this" and "here it is".
     · The paragraph shrank to its first clause. It is the promise; the panel
       is the evidence, and repeating the evidence inside the promise made both
       weaker.
     · A quiet second destination appeared under the primary. "Questions people
       ask first" is a real page on this site, and a link to it is the cheapest
       possible objection handling: it says the answers exist without spending
       any of this card on them. It is set as a text link, not a second pill —
       two pills side by side is what splits intent.

   NOT DARK, DELIBERATELY, and this is the one place the pattern libraries had
   to be overruled. Nearly every "final CTA" example is a dark or gradient
   full-bleed band, and this page already HAS one directly below: the closing
   bookend with the map. Two dark bands in a row would flatten the rhythm the
   whole page is built on (A → B → C → B → C → A) and put two equally loud asks
   next to each other. White on flavour B keeps this an aside — "when you are
   ready" — and leaves the dark one after it as the end of the argument. */
export function ReadyCta({ openFaq }) {
  return (
    <section className="bg-b dots relative py-10 md:py-12">
      <div className={SHELL}>
        {/* `flank-field` is the field masked to the outer 11% at each side, so
            the card has texture where the copy is not and nothing at all behind
            the copy. */}
        <Reveal className="flank-field relative mx-auto max-w-[1040px] overflow-hidden rounded-[24px] bg-white px-5 py-7 shadow-[0_1px_2px_rgba(22,6,58,0.05),0_24px_56px_-32px_rgba(22,6,58,0.4)] md:px-10 md:py-8 lg:px-14">
          {/* The page's single sanctioned gradient, the same three-stop bar
              every suite card wears across its top edge. It gives the card an
              identity in 3px. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block h-[3px] bg-[linear-gradient(90deg,#4A2FD4_0%,#7A00C2_52%,#00A274_100%)]"
          />

          {/* THREE FULL-WIDTH BANDS: the statement, the pair, the evidence.

              WHY THE HEADING IS NO LONGER IN A COLUMN. Capping it at 62% and
              putting the buttons opposite meant the buttons sat on the LAST
              line of a block whose first two lines had nothing beside them —
              so the top right of the card was empty by construction, and no
              amount of spacing could fill a hole that the layout was creating.
              The heading was also being forced to wrap at 62% when it fits the
              card's full width on one line at every size from 768 up.

              Full width, one line, nothing beside it: there is no top right to
              leave empty. The pairing happens one row lower, where a short
              paragraph and a button group are genuinely of a size to sit
              opposite each other.

              Then the evidence, three across under a hairline. It came out of
              a 340px side panel for the same reason: a third of the width
              carrying three short lines next to a 44px headline reads as a
              small thing parked beside a big one, however it is spaced. Three
              columns of one card is a structure; one column of a third of a
              card is a leftover.

              THIS BAND IS CENTRED AT EVERY WIDTH — no `md:text-left`. The badge
              and the heading are the card's announcement and they are now set
              on its centre line, which the rest of the card can hang off: the
              row below stays a split, and the strip below that stays three
              columns, both of which are symmetrical about the same axis. A
              centred statement over a divided body is a normal and stable
              arrangement; what it must not become is centred all the way down,
              which is the version that read as a placeholder. */}
          <div className="relative text-center">
              {/* The dot is doing a real job: the badge says "ready when you
                  are", and a live teal dot is how a surface says READY rather
                  than only claiming it. The page already owns the idiom — the
                  chat widget wears the same dot for the same reason. */}
              <span className="inline-flex items-center gap-2 rounded-full bg-ig-paper-2 px-4 py-1.5 text-[10.5px] font-bold tracking-[0.055em] text-ig-purple">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ig-teal" />
                Ready when you are
              </span>

              {/* SIZED TO THE MEASURE, WHICH IS THE ACTUAL FIX FOR THE EMPTY
                  TOP RIGHT.

                  At 44px this sentence draws about 715px of ink inside a 960px
                  card, so a quarter of the top band was blank — and no
                  rearranging closes that, because the space is simply the
                  measure the type failed to reach. Display type is supposed to
                  break its measure, not sit inside it looking short.

                  4.6vw with a 52px ceiling puts it at 88–92% of the available
                  width at every size the card has: ~574px of 624 at 768,
                  ~766 of 880 at 1024, ~846 of 960 from 1131 up. The remaining
                  8–12% is the ordinary right-hand rag of a line that ends where
                  the words end, not a hole.

                  The one-line rule still holds — 59px is the size at which this
                  sentence would touch 960px, and 52 is comfortably under it, so
                  a webfont landing a shade wide cannot wrap it. */}
              <h2 className="mt-4 font-extrabold leading-[1.05] tracking-[-0.038em] text-[clamp(28px,4.6vw,52px)] text-ig-ink">
                <span>Name the outcome. </span>
                <span className="serif-accent font-normal text-ig-purple">
                  We&rsquo;ll engineer it
                </span>
              </h2>

            {/* ON THE CENTRE LINE WITH THE TWO ABOVE IT, not opposite the
                buttons.

                The split row it used to be in was the problem: a 460px sentence
                pinned to the left edge and a 330px button group pinned to the
                right left 170px of nothing between them, under a heading that
                was centred. Three elements, three different alignments, and
                nothing for the eye to follow down the card.

                One axis now. Badge, heading, sentence and buttons all resolve
                to the same centre, and the strip below is a symmetrical grid
                whose middle column resolves to it as well. Alignment is not a
                property of any one element — it is whether there is a line
                everything answers to. */}
            <p className="mx-auto mt-4 max-w-[54ch] text-[15px] leading-[1.55] text-ig-muted md:text-[16.5px]">
              You describe the process, and one of nine suites already covers it
            </p>
          </div>

          {/* THE VERTICAL RHYTHM IS 16 · 16 · 24 · 24: the badge close to the
              heading it labels, the sentence close to the heading it explains,
              then two equal gaps into the actions and the evidence. An uneven
              set of gaps down a card is the difference between "structured" and
              "assembled" — the eye reads spacing as grouping whether or not
              anyone meant it to. */}
          {/* An anchor, like the masthead's: it leaves for the application on
              another host, and a thing that navigates has to be a link. Teal
              because it is the one action on this card.

              The FAQ sits beside it as TYPE, not as a second pill. Every source
              on this says the same thing — one primary action, and anything
              else on the card must not look like a rival to it.

              The pair is centred as a UNIT rather than each half being placed
              separately: the pill and the link read as one control group with
              one weight, which is what lets a text link sit beside a solid
              button without looking like it was left over. */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <TealButton as="a" href={SIGN_IN_URL} className="!px-6 !py-3.5 !text-[13.5px]">
                Sign in
                <ArrowUpRight className="h-3.5 w-3.5" />
              </TealButton>

              <button
                type="button"
                onClick={openFaq}
                className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[13.5px] font-semibold tracking-[-0.01em] text-ig-muted transition-colors duration-300 hover:text-ig-ink"
              >
                Questions people ask first
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-ig-purple transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2.4}
                />
              </button>
          </div>

          {/* THE EVIDENCE STRIP — full width, three across, over a hairline.

              No tint and no box. On a white card a tinted panel is a second
              surface, and a second surface has to earn its edges; across the
              full width the rule above the strip is all the separation it
              needs, and the three checks do the rest. It also means the strip
              reads as part of the card rather than as something dropped onto
              it.

              One column on a phone, two at `sm`, three from `lg`.

              A HAIRLINE BETWEEN THE COLUMNS, AND ONLY WHERE THERE ARE THREE OF
              THEM. It is what turns three items that happen to be beside each
              other into three columns of one strip — the same device the
              masthead uses between its two groups. It is a left border on the
              second and third rather than `divide-x`, because a divide utility
              on a wrapping grid also draws a line down the left of whatever
              lands first on the second row: correct at three columns, wrong at
              two. Below `lg` the gap does the separating on its own.

              `items-center` now that every label is a single line — a mark
              beside one line of type belongs on its centre. */}
          <ul className="mt-6 grid gap-x-8 gap-y-4 border-t border-ig-ink/10 pt-6 text-left sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-0">
            {PROOF.map((line, i) => (
              <li
                key={line}
                className={`flex items-center gap-2.5 ${
                  i ? 'lg:border-l lg:border-ig-ink/10 lg:pl-8' : ''
                } ${i < PROOF.length - 1 ? 'lg:pr-8' : ''}`}
              >
                {/* Teal at the accent's full strength — the exact use the
                    colour law reserves it for: "the fix", the confirmed
                    thing. Three small marks is the whole of it. */}
                <span
                  aria-hidden="true"
                  className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-ig-teal text-white"
                >
                  <Check className="h-2.5 w-2.5" strokeWidth={3.2} />
                </span>
                <span className="text-[13.5px] font-semibold leading-[1.45] tracking-[-0.01em] text-ig-ink">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal.jsx';
import { TealButton } from '../components/SwapButton.jsx';
import { SIGN_IN_URL } from '../data/navigation.js';
import { SHELL } from '../lib/layout.js';

/* The soft prompt between the walkthrough and the closing bookend.

   FOUR ELEMENTS AND NOTHING ELSE: a badge, a heading, a line, a button. What was
   here before had texture and a certification strip as well, and both were
   working against it —

     · THE FIELD HAD TO GO. Dots and 28px rules running behind a paragraph is
       texture competing with the thing it is meant to sit behind: every line of
       copy crossed two rules on its way across, which the eye reads as
       interference rather than as surface. It belongs on the walkthrough's panel
       where the content is windows and diagrams, and it does not belong behind a
       sentence anyone has to read.
     · THE CERTIFICATIONS HAD TO GO. They are real and they are already in the
       footer and the menu sheet; repeating them here made this the third place
       and added a row of small type under the one thing the card is for.

   Losing both takes about 90px out and leaves the hierarchy plain: one badge,
   one statement, one explanation, one action, in that order down a centre line.

   A CARD ON A BAND is still what keeps this a different weight from the closing
   section. The one below is the dark bookend with the office map, and two
   equally loud calls to action in a row would cancel each other. White on
   flavour B reads as an aside — "when you are ready" — and the dark one after it
   still reads as the end of the argument. Flavour B also keeps the alternation
   honest: the walkthrough above is C, this is B, the close is A.

   WHITE, NOT `paper`, now that there is no texture to carry the surface. Against
   the band's #F0E9FF it is the cleanest separation available, and the shadow
   does the rest — so there is no ring, no border and nothing drawn on the card
   except the brand rule along its top edge. */
export function ReadyCta() {
  return (
    <section className="bg-b dots relative py-14 md:py-16">
      <div className={SHELL}>
        {/* `flank-field` is the field masked to the outer 11% at each side, so
            the card has texture where the copy is not and nothing at all behind
            the copy. The mask fades out at 114px on a 1040px card, and the
            longest line — the heading, at ~780px of ink — begins at 130px. */}
        <Reveal className="flank-field relative mx-auto max-w-[1040px] overflow-hidden rounded-[24px] bg-white px-6 py-10 text-center shadow-[0_1px_2px_rgba(22,6,58,0.05),0_24px_56px_-32px_rgba(22,6,58,0.4)] md:px-12 md:py-11">
          {/* The one mark left on the card: the page's single sanctioned
              gradient, the same three-stop bar every suite card wears across its
              top edge. It gives the card an identity in 3px, which is what the
              texture was being asked to do in far more. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block h-[3px] bg-[linear-gradient(90deg,#4A2FD4_0%,#7A00C2_52%,#00A274_100%)]"
          />

          <span className="inline-flex items-center rounded-full bg-ig-paper-2 px-5 py-2 text-[11px] font-bold tracking-[0.055em] text-ig-purple">
            Ready when you are
          </span>

          {/* One line from 1024px up — 780px of type against an 896px measure.
              Two lines of 48px display was most of the height this card had. */}
          <h2 className="mx-auto mt-5 max-w-4xl font-extrabold leading-[1.05] tracking-[-0.038em] text-[clamp(28px,3.9vw,48px)] text-ig-ink">
            <span>Name the outcome. </span>
            <span className="serif-accent font-normal text-ig-purple">We&rsquo;ll engineer it</span>
          </h2>

          {/* Every clause is something the site states elsewhere: nine suites in
              the catalogue, the badge on every accelerator row, and the claim the
              section above this one is built on. */}
          <p className="mx-auto mt-4 max-w-[64ch] text-[15px] leading-[1.6] text-ig-muted md:text-[16.5px]">
            You describe the process. One of nine suites already covers it, every accelerator
            inside it ships as a governed DAG, and the whole thing goes live in days rather than
            months
          </p>

          {/* An anchor, like the masthead's: it leaves for the application on
              another host, and a thing that navigates has to be a link. Teal
              rather than the bar's violet because here it is the only action on
              the card, and teal is what a primary action wears on this page. */}
          <div className="mt-7 flex justify-center">
            <TealButton as="a" href={SIGN_IN_URL}>
              Sign in
              <ArrowUpRight className="h-3.5 w-3.5" />
            </TealButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

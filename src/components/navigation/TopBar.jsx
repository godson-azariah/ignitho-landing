/* The bar across the top of every page. Name on the left, three links in the
   middle, FAQ and the two buttons on the right. On a phone all of that becomes
   one round menu button.

   It is a three-column grid with the outer two forced to equal width. That is
   what puts the middle links on the centre of the page rather than in the gap
   left over, which is where they ended up in the two earlier attempts.

   It no longer hides when you scroll down; it just picks up a shadow. */

import { ArrowUpRight, MessageCircle, Menu } from 'lucide-react';
import { FAQ_LABEL, NAV_LINKS, SIGN_IN_URL } from '../../data/navigation.js';
import { SHELL } from '../../lib/layout.js';
import { useTopBarShadow } from '../../hooks/useTopBarShadow.js';
import { Button, PrimaryButton } from '../ui/Button.jsx';
import { Wordmark } from '../ui/Wordmark.jsx';

/* Owns its own scroll state — nothing else on the page needs to know whether
   the page has moved under the bar, so nothing else has to hold it. */
export function TopBar({ menuOpen, onOpenMenu, goHome, navAction, openContact, activeNav }) {
  const { scrolled } = useTopBarShadow();

  return (
    /* ALWAYS THERE. The bar used to retract on a downward scroll and return on
       an upward one; it no longer moves at all, so there is no transform on it
       and no transition to run one.

       The only thing that still answers the scroll is the shadow below, which
       is a change in the bar rather than a change to whether the bar exists. */
    <header className="fixed inset-x-0 top-0 z-50">
      {/* A plain white bar, balanced in three: wordmark left, destinations
          optically centred, one action right. It carries a thin line at rest
          and lifts onto a soft shadow once the page has moved under it. */}
      <nav
        className={`relative border-b border-ig-ink/10 bg-white transition-shadow duration-500 ease-out ${
          scrolled ? 'shadow-[0_16px_36px_-30px_rgba(22,6,58,0.95)]' : 'shadow-none'
        }`}
      >
        {/* A Three-column grid with equal flanks — which is what "centred on the
            page" actually requires, and neither of the two previous layouts
            could give.

            `absolute left-1/2` centred the destinations on the page but could
            not be squeezed, so at 1024 it painted them straight over the
            buttons. `flex-1` fixed the overlap by centring them in the space
            that was FREE — and free space is not symmetrical here: the actions
            on the right are roughly three times the width of the wordmark on
            the left, so the group sat about 90px right of where the eye expects
            the middle of a page to be.

            `1fr auto 1fr` gives the two sides the same width by construction,
            whatever is inside them. The middle track is the destinations at
            their natural size, and equal tracks either side put it on the page's
            centre line — the same line the section headings below it centre on.

            Unlike absolute positioning this participates in layout: the sides
            are `minmax(auto, 1fr)`, so they hold their content and the row
            cannot silently overlap. At 1024 — the width this appears at — the
            three tracks come to about 930px inside a 960px shell.

            Every item IS placed explicitly, and that is a bug fix rather than
            tidiness. A `display: none` element is not a grid item at all — it is
            removed from layout, it does not hold a cell, and auto-placement
            simply moves the next item up into the track it would have used. So
            below `lg`, where the middle group is hidden, the ACTIONS were being
            auto-placed into the middle `auto` track and the third `1fr` track
            sat empty behind them: the menu button ended up near the centre of
            the bar instead of at its right edge.

            `col-start-1 / 2 / 3` pins each item to its own track whatever else
            is rendered. On desktop this is exactly where auto-placement was
            already putting all three, so nothing there moves by a pixel; on a
            phone the empty middle track now collapses to zero and the equal
            sides put the wordmark hard left and the menu button hard right,
            which is what `justify-between` used to do. */}
        <div
          className={`${SHELL} grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-3 md:h-[84px]`}
        >
          <button
            onClick={goHome}
            className="col-start-1 flex items-center justify-self-start"
            aria-label="Ignitho's FRIEND Framework, back to the top"
          >
            {/* 36 and 44, against a bar that is 72 and 84. The logo is three
                lines deep where the word it replaces was one, so matching the
                old 21px of type would have put the top line at 6px. Half the
                bar's height is the most a mark can take before the row reads as
                a header for the logo rather than a bar with a logo in it. */}
            <Wordmark className="h-9 md:h-11" />
          </button>

          {/* THE middle track — sized to its own content, centred by the two
              equal tracks either side of it.

              The gap steps rather than sitting at one value: 20px where the row
              is tightest and back to the original 36px from `xl`, where there
              are 250-odd pixels spare and the destinations should breathe. The
              type stays at 15px at every width — shrinking a nav label to buy
              layout is the kind of saving a reader pays for. */}
          <div className="col-start-2 hidden items-center justify-center gap-5 lg:flex xl:gap-9">
            {/* FAQ IS filtered out here AND rendered beside THE actions.

                It is the odd one among the four: the other three scroll to a
                section of the page you are already on, and this one leaves for
                a page of its own. Sitting it with them implied it was another
                stop on the same journey. Beside "Contact Us" — the other
                thing you go to rather than scroll to — it reads as what it is. */}
            {NAV_LINKS.filter((l) => l !== FAQ_LABEL).map((label) => {
              const on = label === activeNav;
              return (
                <button
                  key={label}
                  onClick={navAction(label)}
                  /* `aria-current="page"` on the FAQ link and on whichever
                      section is under the reader. It is the attribute that says
                      "you are here" to anything not looking at the colour, and
                      without it the state is purple type and nothing else. */
                  aria-current={on ? 'page' : undefined}
                  /* No weight change in THE active state, deliberately. Medium
                      to semibold widens the label by a few pixels, and in a row
                      that is centred between two fixed ends every neighbour
                      shifts sideways as you scroll past a section boundary.
                      Colour and the rule carry it instead; neither moves
                      anything. */
                  className={`group relative whitespace-nowrap py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                    on ? 'text-ig-purple' : 'text-ig-muted hover:text-ig-ink'
                  }`}
                >
                  {label}
                  {/* The same rule serves both states: it wipes in from the left
                      on hover, and sits drawn while the section is current. One
                      element, so moving between the two is a transition rather
                      than a swap. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px bg-ig-purple transition-transform duration-500 ease-out ${
                      on
                        ? 'origin-left scale-x-100'
                        : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* One gap for all three, AND IT IS A SMALL ONE.

              These are the three things you LEAVE for rather than scroll to,
              and they now read as one cluster: 10px between each, nothing
              between them but that. Before, the FAQ link was separated from the
              pills by 16px, a thin line rule and another 16px — 33px of
              separation in the middle of a group of three, which made the
              cluster look like two groups that had drifted together.

              `justify-end` because this is a grid track wider than its contents
              now — the side is as wide as the opposite one, so without it the
              buttons would sit at the track's left edge instead of the page's
              right. */}
          <div className="col-start-3 flex items-center justify-end gap-2.5">
            {/* THE one icon in THE bar, AND IT IS teal.

                Colour with a job rather than colour for its own sake: the bar is
                otherwise a wordmark, four labels and two pills, and this single
                green mark is what stops the right-hand group reading as a wall
                of type. Teal is the page's accent, so it is the colour already
                licensed to appear once and mean "here".

                Still a link rather than a button — same type, same size, same
                hover rule and the same active treatment as the three in the
                centre. It moved position, not rank. */}
            {(() => {
              const on = activeNav === FAQ_LABEL;
              return (
                <button
                  onClick={navAction(FAQ_LABEL)}
                  aria-current={on ? 'page' : undefined}
                  className={`group relative hidden items-center gap-2 whitespace-nowrap py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 lg:flex ${
                    on ? 'text-ig-purple' : 'text-ig-muted hover:text-ig-ink'
                  }`}
                >
                  <MessageCircle
                    className="h-4 w-4 shrink-0 text-ig-teal"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  {FAQ_LABEL}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px bg-ig-purple transition-transform duration-500 ease-out ${
                      on
                        ? 'origin-left scale-x-100'
                        : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })()}

            {/* below lg both actions live in the menu sheet, so the bar keeps
                to a wordmark and one control */}
            {/* Tighter than THE page's other primary buttons, on purpose. A
                button in a 72px bar is not the same object as one at the end of
                a section: it shares its row with a wordmark, three destinations
                and a second action, and 24px of padding either side of a
                13.5px label was reading as a wide pill in a crowded row rather
                than as a compact control. 20/12 and 13px sit it beside "Sign
                in" as a pair. */}
            <div className="hidden lg:block">
              <PrimaryButton onClick={openContact} className="!px-5 !py-3 !text-[13px]">
                <span className="whitespace-nowrap">Contact Us</span>
              </PrimaryButton>
            </div>

            {/* An anchor, NOT A BUTTON WITH A CLICK HANDLER. This leaves the
                site for the application on another host, and a thing that
                navigates has to be a link — for middle-click, copy-link, the
                status-bar preview, and the role a screen reader announces.
                `Button`'s `as` prop is what makes that possible without
                giving up the shared button styling.

                No `target="_blank"`: signing in is continuing, not branching
                off, and a new tab would leave the reader with a marketing page
                behind the app they just opened.

                Violet rather than teal. Teal is the action colour and it
                belongs to the one primary action in this bar; a second teal pill
                beside the first would make neither of them the primary. */}
            <div className="hidden lg:block">
              {/* One step tighter again — "Sign in" is half the label, so equal
                  padding either side of the two would have made this pill look
                  padded rather than compact. Same 12px vertical, so the two
                  stand at exactly the same height. */}
              <Button
                as="a"
                href={SIGN_IN_URL}
                variant="violet"
                className="!px-4 !py-3 !text-[13px]"
              >
                <span className="whitespace-nowrap">Log in</span>
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.6} />
              </Button>
            </div>

            <div className="lg:hidden">
              <Button
                onClick={onOpenMenu}
                aria-expanded={menuOpen}
                aria-label="Menu"
                variant="ink"
                className="h-11 w-11"
              >
                <Menu className="h-4 w-4" strokeWidth={2.4} />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

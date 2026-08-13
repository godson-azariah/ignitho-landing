import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { CERTS, NAV_LINKS, SIGN_IN_URL } from '../data/navigation.js';
import { useOverlay } from '../lib/useOverlay.js';
import { SwapButton, TealButton } from './SwapButton.jsx';

/* A full sheet over the page rather than a dropdown. It opens by sliding down
   and closes by sliding back up the same way — the CSS holds `visibility`
   through the whole exit so the close is never cut short. */
export function MenuSheet({ open, onClose, goHome, navAction, openContact, activeNav }) {
  useOverlay(open, onClose);

  return (
    <div
      className={`sheet fixed inset-0 z-[70] ${open ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="sheet-panel dots-inv relative isolate h-full w-full overflow-y-auto bg-ig-violet text-white">
        <div className="flex h-[76px] items-center justify-between gap-5 px-5 md:h-[92px] md:px-8">
          <button onClick={goHome} className="flex items-baseline gap-2" aria-label="Ignitho AI">
            <span className="text-[19px] font-black tracking-[-0.02em] md:text-[22px]">
              Ignitho
            </span>
            <span className="serif-accent text-[23px] md:text-[27px]">AI</span>
          </button>
          <SwapButton
            onClick={onClose}
            variant="light"
            className="px-7 py-4 text-[14px] font-semibold"
          >
            <X className="h-4 w-4" strokeWidth={2.4} />
            Close
          </SwapButton>
        </div>

        {/* `gap-x-0` below `lg`. Eleven fixed 40px column gaps put a 440px
            floor under this grid, and a 412px phone's 372px of content width
            cannot meet it — so the grid overflowed by 68px and pushed the nav
            and the certifications 34px off centre inside their own columns.
            Both children are `col-span-12` until `lg`, so there is nothing
            for a horizontal gap to sit between until then. */}
        <div className="mx-auto grid w-full max-w-[1360px] grid-cols-12 gap-x-0 gap-y-14 px-5 pb-16 pt-10 md:px-8 md:pt-16 lg:gap-x-10">
          {/* primary destinations, set large */}
          <nav className="col-span-12 lg:col-span-7">
            {NAV_LINKS.map((label, i) => {
              const on = label === activeNav;
              return (
                <button
                  key={label}
                  onClick={() => {
                    onClose();
                    navAction(label)();
                  }}
                  aria-current={on ? 'page' : undefined}
                  style={{ animationDelay: `${180 + i * 70}ms` }}
                  className="sheet-item group flex w-full items-center justify-between gap-6 border-b border-white/15 py-6 text-left first:border-t md:py-8"
                >
                  <span className="flex items-baseline gap-5">
                    {/* SKY ON THIS GROUND, NOT THE PURPLE THE MASTHEAD USES.
                        Same meaning, different surface — the brand gives dark
                        grounds `--sky` for exactly this, which is why the hero's
                        eyebrow is sky and not violet. Purple on violet would be
                        barely a change at all. */}
                    <span
                      className={`font-mono text-[11px] font-bold tracking-[0.055em] transition-colors duration-300 ${
                        on ? 'text-ig-sky' : 'text-white/35 group-hover:text-ig-teal-ring'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-extrabold leading-[0.98] tracking-[-0.035em] text-[clamp(30px,4.4vw,56px)] transition-[transform,color] duration-500 ease-out group-hover:translate-x-2 ${
                        on ? 'text-ig-sky' : ''
                      }`}
                    >
                      {label}
                    </span>
                  </span>
                  <ArrowUpRight
                    className={`h-6 w-6 shrink-0 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ig-teal-ring md:h-8 md:w-8 ${
                      on ? 'text-ig-sky' : 'text-white/30'
                    }`}
                    strokeWidth={1.8}
                  />
                </button>
              );
            })}
          </nav>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            {/* BOTH ACTIONS ARE HERE, because below `lg` the bar carries
                neither — it keeps to a wordmark and the menu control, so this
                sheet is the only place a reader on a phone can reach either the
                briefing or the application.

                Sign in is `variant="light"` on this violet ground rather than
                the masthead's violet: a violet pill on violet has no edge. Same
                order as the bar — primary first, then the way in. */}
            <div
              style={{ animationDelay: '720ms' }}
              className="sheet-item flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              {/* the sheet closes first, or the dialog would open behind it */}
              <TealButton
                onClick={() => {
                  onClose();
                  openContact();
                }}
              >
                Contact Sales
                <ArrowRight className="h-3.5 w-3.5" />
              </TealButton>
              <SwapButton
                as="a"
                href={SIGN_IN_URL}
                variant="light"
                className="px-6 py-3.5 text-[13px] font-semibold"
              >
                Sign in
                <ArrowUpRight className="h-3.5 w-3.5" />
              </SwapButton>
            </div>

            <div
              style={{ animationDelay: '780ms' }}
              className="sheet-item mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-6"
            >
              {CERTS.map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-[11px] font-bold tracking-[0.055em] text-white/40"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

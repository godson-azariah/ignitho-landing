import { Menu } from 'lucide-react';
import { NAV_LINKS } from '../data/navigation.js';
import { SHELL } from '../lib/layout.js';
import { useScrollChrome } from '../lib/useScrollChrome.js';
import { SwapButton, TealButton } from './SwapButton.jsx';

/* Owns its own scroll state — nothing else on the page needs to know whether
   the bar is retracted, so nothing else has to hold it. */
export function Masthead({ menuOpen, onOpenMenu, goHome, navAction }) {
  const { hidden, scrolled } = useScrollChrome();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
        hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* A plain white bar, balanced in three: wordmark left, destinations
          optically centred, one action right. It carries a hairline at rest
          and lifts onto a soft shadow once the page has moved under it. */}
      <nav
        className={`relative border-b border-ig-ink/10 bg-white transition-shadow duration-500 ease-out ${
          scrolled ? 'shadow-[0_16px_36px_-30px_rgba(22,6,58,0.95)]' : 'shadow-none'
        }`}
      >
        <div
          className={`${SHELL} flex h-[72px] items-center justify-between gap-6 md:h-[84px]`}
        >
          <button
            onClick={goHome}
            className="flex shrink-0 items-baseline gap-1.5"
            aria-label="Ignitho AI"
          >
            <span className="text-[21px] font-black tracking-[-0.03em] text-ig-ink md:text-[24px]">
              Ignitho
            </span>
            <span className="serif-accent text-[25px] leading-none text-ig-purple md:text-[29px]">
              AI
            </span>
          </button>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {NAV_LINKS.map((label) => (
              <button
                key={label}
                onClick={navAction(label)}
                className="group relative py-2 text-[15px] font-medium tracking-[-0.01em] text-ig-muted transition-colors duration-300 hover:text-ig-ink"
              >
                {label}
                {/* wipes in from the left, out to the right */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-ig-purple transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100"
                />
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <span aria-hidden="true" className="hidden h-5 w-px bg-ig-ink/12 lg:block" />

            {/* below lg the action lives in the menu sheet, so the bar keeps
                to a wordmark and one control */}
            <div className="hidden lg:block">
              <TealButton className="!px-6 !py-3.5 !text-[13.5px]">
                <span className="whitespace-nowrap">Schedule Executive Briefing</span>
              </TealButton>
            </div>

            <div className="lg:hidden">
              <SwapButton
                onClick={onOpenMenu}
                aria-expanded={menuOpen}
                aria-label="Menu"
                variant="ink"
                className="h-11 w-11"
              >
                <Menu className="h-4 w-4" strokeWidth={2.4} />
              </SwapButton>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

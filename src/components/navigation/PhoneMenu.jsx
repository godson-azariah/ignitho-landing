/* The menu sheet on phones and tablets (the top bar shows its menu button
   only below `lg`, so desktop never sees this). A full white sheet: a round
   close button in the top right, and every destination centred in one
   column, then Contact Us and Log in as the last two lines. The current
   section is set in purple.

   It slides down to open and back up to close (overlay.css). While it is
   open the page behind it cannot scroll, and Escape closes it. The violet
   version is kept in design-research/backup. */

import { X } from 'lucide-react';
import { NAV_LINKS, SIGN_IN_URL } from '../../data/navigation.js';
import { useOverlay } from '../../hooks/useOverlay.js';

const ITEM =
  'sheet-item block py-3.5 text-center text-[22px] font-semibold tracking-[-0.02em] transition-colors duration-300';

export function PhoneMenu({ open, onClose, navAction, openContact, activeNav }) {
  useOverlay(open, onClose);

  return (
    <div
      className={`sheet fixed inset-0 z-[70] ${open ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
    >
      <div className="sheet-panel relative flex h-full w-full flex-col overflow-y-auto bg-white text-ig-ink">
        <div className="flex justify-end px-5 pt-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-ig-ink/10 bg-white text-ig-ink transition-colors hover:bg-ig-ink/[0.04]"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
        </div>

        {/* the destinations, centred in the sheet */}
        <nav className="flex flex-1 flex-col items-center justify-center px-6 pb-24">
          {NAV_LINKS.map((label, i) => {
            const on = label === activeNav;
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  onClose();
                  navAction(label)();
                }}
                aria-current={on ? 'page' : undefined}
                style={{ animationDelay: `${160 + i * 50}ms` }}
                className={`${ITEM} ${on ? 'text-ig-purple' : 'text-ig-ink hover:text-ig-purple'}`}
              >
                {label}
              </button>
            );
          })}
          {/* the sheet closes first, or the dialog would open behind it */}
          <button
            type="button"
            onClick={() => {
              onClose();
              openContact();
            }}
            style={{ animationDelay: `${160 + NAV_LINKS.length * 50}ms` }}
            className={`${ITEM} text-ig-ink hover:text-ig-purple`}
          >
            Contact Us
          </button>
          <a
            href={SIGN_IN_URL}
            style={{ animationDelay: `${210 + NAV_LINKS.length * 50}ms` }}
            className={`${ITEM} text-ig-ink hover:text-ig-purple`}
          >
            Log in
          </a>
        </nav>
      </div>
    </div>
  );
}

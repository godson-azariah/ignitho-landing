import { useMemo } from 'react';
import { Check } from 'lucide-react';
import { Reveal } from '../components/Reveal.jsx';
import { CERTS, NAV_LINKS } from '../data/navigation.js';
import { SUITES } from '../data/suites.js';
import { SHELL } from '../lib/layout.js';

/* Reference matter: the whole catalogue, the destinations and the
   certifications. No texture — it should sit quietly under the closing
   statement rather than compete with it. */
export function Colophon({ openSuite, navAction, goHome }) {
  /* Nine links over data that never changes — built once for the life of the
     page rather than on every render of the section. */
  const footerDirectory = useMemo(
    () =>
      SUITES.map((suite) => (
        <button
          key={suite.id}
          onClick={() => openSuite(suite.id)}
          className="group flex items-baseline gap-3 border-b border-ig-ink/10 py-1.5 text-left"
        >
          <span className="font-mono text-[11px] font-bold text-ig-divider transition-colors duration-300 group-hover:text-ig-teal">
            {suite.number}
          </span>
          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ig-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-ig-ink">
            {suite.name}
          </span>
        </button>
      )),
    [openSuite]
  );

  return (
    <footer className="bg-c relative">
      <div className={`${SHELL} py-9 md:py-10`}>
        <Reveal className="grid grid-cols-12 gap-x-8 gap-y-7">
          {/* Three sub-columns, not two. Nine suites over two columns ran five
              rows deep and set the height of the whole band on its own; over
              three it is three rows, and the widened span keeps the longest
              name clear of the truncation. */}
          <div className="col-span-12 lg:col-span-8">
            <span className="block font-mono text-[11px] font-bold tracking-[0.03em] text-ig-muted">
              Enterprise Catalog
            </span>
            <div className="mt-3.5 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {footerDirectory}
            </div>
          </div>

          <div className="col-span-6 lg:col-span-2">
            <span className="block font-mono text-[11px] font-bold tracking-[0.03em] text-ig-muted">
              Menu
            </span>
            <div className="mt-3.5 flex flex-col items-start gap-2.5">
              {NAV_LINKS.map((label) => (
                <button
                  key={label}
                  onClick={navAction(label)}
                  className="group relative text-[14px] font-semibold text-ig-muted transition-colors duration-300 hover:text-ig-ink"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-ig-purple transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-6 lg:col-span-2">
            <span className="block font-mono text-[11px] font-bold tracking-[0.03em] text-ig-muted">
              Compliance
            </span>
            <div className="mt-3.5 flex flex-col gap-2.5">
              {CERTS.map((cert) => (
                <span
                  key={cert}
                  className="flex items-center gap-2 text-[13px] font-medium text-ig-text"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-ig-teal" strokeWidth={3} />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* the wordmark at its real size, alongside the notice */}
        <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-ig-ink/12 pt-5 sm:flex-row">
          <button onClick={goHome} className="flex items-baseline gap-1.5" aria-label="Ignitho AI">
            <span className="text-[19px] font-black tracking-[-0.03em] text-ig-ink">Ignitho</span>
            <span className="serif-accent text-[22px] leading-none text-ig-purple">AI</span>
          </button>
          <p className="font-mono text-[11px] tracking-[0.055em] text-ig-muted">
            © 2026 Ignitho Technologies. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

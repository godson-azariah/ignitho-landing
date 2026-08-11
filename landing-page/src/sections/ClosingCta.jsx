import { ArrowRight } from 'lucide-react';
import { Reveal } from '../components/Reveal.jsx';
import { TealButton } from '../components/SwapButton.jsx';
import { SHELL } from '../lib/layout.js';

/* The bottom bookend, on the same ground as the hero. */
export function ClosingCta() {
  return (
    <section className="aurora dots-inv relative py-14 md:py-20">
      <div className={SHELL}>
        <Reveal className="relative grid grid-cols-12 items-end gap-x-10 gap-y-7">
          <div className="col-span-12 lg:col-span-8">
            <span className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-[11px] font-bold tracking-[0.055em] text-ig-lavender/80">
              Ignitho AI Platform
            </span>
            <h2 className="mt-6 max-w-[17ch] font-extrabold leading-[0.98] tracking-[-0.04em] text-[clamp(28px,4.2vw,52px)] text-white">
              Transforming enterprise IT through{' '}
              <span className="serif-accent font-normal text-ig-sky">
                workflow-driven AI accelerators
              </span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-3 lg:text-right">
            <TealButton className="w-full sm:w-auto">
              Schedule Executive Briefing
              <ArrowRight className="h-3.5 w-3.5" />
            </TealButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

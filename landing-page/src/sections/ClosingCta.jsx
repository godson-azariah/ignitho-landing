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
            <h2 className="max-w-[17ch] font-extrabold leading-[0.98] tracking-[-0.04em] text-[clamp(28px,4.2vw,52px)] text-white">
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

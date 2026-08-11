import { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Play } from 'lucide-react';
import { AgentSimulator } from '../components/AgentSimulator.jsx';
import { HeroStage } from '../components/HeroStage.jsx';
import { Kicker } from '../components/Kicker.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { SwapButton, TealButton } from '../components/SwapButton.jsx';
import { ROW_FILL, SHELL } from '../lib/layout.js';

/* Grow the row fill from whichever edge the pointer crossed. The suite list
   derives this from a tracked pointer because it has to survive scrolling;
   these rows are not in a scroll-hover context, so the events are enough. */
const setFillOrigin = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--fill-origin', e.clientY - r.top < r.height / 2 ? 'top' : 'bottom');
};

/* One suite, in full. Holds which accelerator is being simulated — the
   simulator itself owns the run. */
export function Dossier({ suite, goHome }) {
  const [simAccelerator, setSimAccelerator] = useState(null);
  const closeSimulator = useCallback(() => setSimAccelerator(null), []);

  return (
    <main>
      {/* masthead · FLAVOUR A */}
      <section
        className="aurora relative overflow-hidden pb-16 pt-[104px] md:pb-20 md:pt-[136px]"
      >
        <HeroStage />

        <div className={SHELL}>
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 py-4">
              <button
                onClick={goHome}
                className="group flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-sky transition-colors duration-300 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to All Suites
              </button>
              <span className="border border-ig-teal-ring/40 bg-ig-teal/15 px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-teal-ring">
                {suite.type === 'foundation'
                  ? 'Universal Foundation Platform'
                  : 'Industry Vertical Suite'}
              </span>
            </div>

            <div className="grid grid-cols-12 items-end gap-x-10 pt-12 md:pt-20">
              <div className="col-span-12 lg:col-span-9">
                <h1 className="font-extrabold leading-[0.93] tracking-[-0.042em] text-[clamp(32px,5.6vw,78px)] text-white">
                  {suite.name}
                </h1>
                <p className="serif-accent mt-7 max-w-2xl text-[22px] leading-[1.2] text-ig-lavender/85 md:text-[32px]">
                  {suite.tagline}
                </p>
              </div>
              <div className="col-span-12 mt-10 lg:col-span-3 lg:mt-0 lg:text-right">
                <span
                  aria-hidden="true"
                  className="stroke-lilac block select-none font-mono text-[96px] font-bold leading-[0.8] md:text-[150px]"
                >
                  {suite.number}
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>
      {/* spread · FLAVOUR B */}
      <section className="bg-b dots relative py-20 md:py-28">
        <div className={SHELL}>
          <div className="relative grid grid-cols-12 gap-x-10 gap-y-16">
            <Reveal className="col-span-12 lg:col-span-7">
              <p className="plate whitespace-pre-line text-[20px] leading-[1.4] tracking-[-0.018em] text-ig-text md:text-[27px]">
                {suite.executiveSummary}
              </p>

              <div className="mt-12 bg-ig-ink px-7 py-7 text-white md:px-9 md:py-8">
                <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-teal-ring">
                  Target Business Impact
                </span>
                <p className="mt-4 text-[17px] font-bold leading-[1.3] tracking-[-0.02em] md:text-[21px]">
                  {suite.businessImpact}
                </p>
              </div>

              <ul className="plate mt-14">
                {suite.outcomes.map((b, idx) => (
                  <li
                    key={b}
                    className="flex items-start gap-5 border-t border-ig-ink/15 py-6 last:border-b"
                  >
                    <span className="mt-1 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <Check className="mt-1 h-4 w-4 shrink-0 text-ig-teal" strokeWidth={3} />
                    <span className="text-[15px] leading-[1.6] text-ig-text md:text-[17px]">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <div className="border border-ig-ink/12 bg-white">
                  {/* three flat segments, not a blended bar */}
                  <span className="flex h-[4px] w-full">
                    <span className="flex-1 bg-ig-violet" />
                    <span className="flex-1 bg-ig-purple" />
                    <span className="flex-1 bg-ig-teal" />
                  </span>
                  <div className="h-40 overflow-hidden">
                    <img
                      src={suite.imageUrl}
                      alt={suite.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>

                  <div className="p-7">
                    <span className="font-mono text-[11.5px] font-bold tracking-[0.06em] text-ig-divider">
                      Sub-Domains:
                    </span>
                    <div className="mt-5">
                      {suite.subDomains.map((sub, idx) => (
                        <div
                          key={sub}
                          className="flex items-center gap-3.5 border-t border-ig-ink/10 py-3.5 first:border-t-0 first:pt-0"
                        >
                          <span className="font-mono text-[11px] font-bold text-ig-teal">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[14px] font-bold tracking-[-0.01em] text-ig-ink">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>

                    <TealButton className="mt-7 w-full">
                      Schedule Executive Briefing
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </TealButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* accelerators · FLAVOUR C */}
      <section className="bg-c dots relative py-20 md:py-28">
        <div className={SHELL}>
          <Reveal className="plate relative flex flex-col gap-6 border-b border-ig-ink/15 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <Kicker index="05">Embedded AI Accelerators</Kicker>
              <h2 className="mt-7 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(30px,4.6vw,58px)] text-ig-ink">
                <span className="block">Available Agents</span>
                <span className="serif-accent block font-normal text-ig-purple">
                  ({suite.accelerators.length})
                </span>
              </h2>
            </div>
            <p className="font-mono text-[11px] tracking-[0.05em] text-ig-muted md:pb-2">
              Click "Test Live Agent" to simulate execution
            </p>
          </Reveal>

          <div className="plate relative">
            {suite.accelerators.map((acc, idx) => (
              <Reveal key={acc.name} delay={Math.min(idx * 55, 260)}>
                <div
                  onMouseEnter={setFillOrigin}
                  onMouseLeave={setFillOrigin}
                  className="group relative overflow-hidden border-b border-ig-ink/15"
                >
                  <span
                    className={`row-fill pointer-events-none absolute inset-0 ${ROW_FILL}`}
                  />

                  <div className="relative grid grid-cols-12 items-center gap-x-8 gap-y-5 py-8 transition-colors duration-300 group-hover:text-white">
                    <div className="col-span-12 flex items-start gap-5 md:col-span-4">
                      <span className="mt-1.5 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider transition-colors duration-300 group-hover:text-ig-teal-ring">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.025em] text-ig-ink transition-colors duration-300 group-hover:text-white md:text-[24px]">
                          {acc.name}
                        </h3>
                        <span className="serif-accent mt-1 block text-[16px] text-ig-purple transition-colors duration-300 group-hover:text-ig-sky">
                          {acc.type}
                        </span>
                      </div>
                    </div>

                    <p className="col-span-12 text-[13.5px] leading-[1.6] text-ig-muted transition-colors duration-300 group-hover:text-white/65 md:col-span-5 md:text-[14.5px]">
                      {acc.desc}
                    </p>

                    <div className="col-span-12 flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                      <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-bold tracking-[0.035em] text-ig-teal transition-colors duration-300 group-hover:text-ig-teal-ring">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        Governed DAG Ready
                      </span>
                      <SwapButton
                        onClick={() => setSimAccelerator(acc)}
                        variant="ink"
                        className="shrink-0 px-5 py-3 text-[12.5px] font-semibold"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        Test Agent
                      </SwapButton>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <AgentSimulator accelerator={simAccelerator} onClose={closeSimulator} />
    </main>
  );
}

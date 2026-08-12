import { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Play } from 'lucide-react';
import { AgentSimulator } from '../components/AgentSimulator.jsx';
import { HeroStage } from '../components/HeroStage.jsx';
import { Kicker } from '../components/Kicker.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { SwapButton, TealButton } from '../components/SwapButton.jsx';
import { SHELL } from '../lib/layout.js';

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
            {/* The one way back, so it is a button rather than a line of small
                type — the same light pill the hero uses for its secondary
                action, which is what makes it read as pressable at a glance.
                The teal badge that used to sit opposite it has gone: it
                classified the suite for a reader who has just chosen it, and
                it was the loudest thing on the masthead. */}
            <div className="flex flex-wrap items-center gap-4 border-b border-white/15 py-4">
              <SwapButton
                onClick={goHome}
                variant="light"
                className="px-5 py-3 text-[12.5px] font-semibold"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to All Suites
              </SwapButton>
            </div>

            {/* The 150px outlined suite number that used to sit in a column on
                the right has gone. It was a wireframe device — the only one
                left anywhere on the site — and it was competing with the
                headline for the same glance while saying nothing the badge
                above and the URL do not already say. Losing it also gives the
                title the full measure, which is what a name this long wants. */}
            <div className="pt-12 md:pt-20">
              <h1 className="max-w-[18ch] font-extrabold leading-[0.93] tracking-[-0.042em] text-[clamp(32px,5.6vw,78px)] text-white">
                {suite.name}
              </h1>
              <p className="serif-accent mt-7 max-w-2xl text-[22px] leading-[1.2] text-ig-lavender/85 md:text-[32px]">
                {suite.tagline}
              </p>
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

              <div className="mt-12 rounded-[20px] bg-ig-ink px-7 py-7 text-white md:px-9 md:py-8">
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
                {/* `overflow-hidden` is what makes the rounding real here:
                    the three-segment rule and the image both run to the card's
                    own edge, so without it they would square off the corners
                    the border had just rounded. */}
                <div className="overflow-hidden rounded-[20px] border border-ig-ink/12 bg-white">
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
                {/* Not "Agents you can run today" — the page says deployment
                    takes days, so "today" contradicted it two sections
                    later, and the button below runs a simulation rather than
                    the agent itself. */}
                <span className="block">Agents in this suite</span>
                <span className="serif-accent block font-normal text-ig-purple">
                  ({suite.accelerators.length})
                </span>
              </h2>
            </div>
            {/* Original wording, with one factual correction kept: it said
                "Test Live Agent", and no control on the page carries that
                label — the button below says "Test Agent". */}
            <p className="font-mono text-[11px] tracking-[0.05em] text-ig-muted md:pb-2">
              Click "Test Agent" to simulate execution
            </p>
          </Reveal>

          <div className="plate relative">
            {suite.accelerators.map((acc, idx) => (
              <Reveal key={acc.name} delay={Math.min(idx * 55, 260)}>
                {/* A PLAIN TINT, NOT THE WIPE THE SUITE LIST USES.

                    The catalog's rows are the page's main navigation — nine
                    destinations, so a violet wipe that inverts the whole row
                    is doing real work there. These are not destinations; you
                    read down them and press one button. The same treatment
                    made every passing cursor repaint a block of text from
                    dark to white, which read as an event when nothing had
                    happened.

                    So: the section's own lavender, a straight cross-fade, and
                    every piece of text left exactly the colour it already
                    was. The only thing that follows the pointer now is the
                    title going purple — the same small acknowledgement the
                    suite cards make. */}
                <div className="group border-b border-ig-ink/15 transition-colors duration-300 hover:bg-ig-paper-2">
                  <div className="grid grid-cols-12 items-center gap-x-8 gap-y-5 py-8">
                    <div className="col-span-12 flex items-start gap-5 md:col-span-4">
                      <span className="mt-1.5 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.025em] text-ig-ink transition-colors duration-300 group-hover:text-ig-purple md:text-[24px]">
                          {acc.name}
                        </h3>
                        <span className="serif-accent mt-1 block text-[16px] text-ig-purple">
                          {acc.type}
                        </span>
                      </div>
                    </div>

                    <p className="col-span-12 text-[13.5px] leading-[1.6] text-ig-muted md:col-span-5 md:text-[14.5px]">
                      {acc.desc}
                    </p>

                    <div className="col-span-12 flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                      <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-bold tracking-[0.035em] text-ig-teal">
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

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { HeroStage } from '../components/HeroStage.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { SwapButton, TealButton } from '../components/SwapButton.jsx';
import { SHELL } from '../lib/layout.js';

export function Hero({ goTo }) {
  return (
    <section
      id="overview"
      className="aurora relative overflow-hidden pb-20 pt-[104px] md:pb-28 md:pt-[136px]"
    >
      <HeroStage />

      <div className={SHELL}>
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/15 py-4">
            {/* the eyebrow — sky, per the brand's rule for dark surfaces */}
            <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-sky md:text-[11px]">
              Transforming Ignitho into an AI-First Enterprise Partner
            </span>
            <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-lavender/45 md:text-[11px]">
              Enterprise AI Platform
            </span>
          </div>

          {/* the display block — type is the hero image */}
          <Reveal className="pt-12 md:pt-20">
            <h1 className="font-extrabold leading-[0.9] tracking-[-0.045em] text-[clamp(38px,7.3vw,106px)] text-white">
              <span className="line-mask">
                <span>Workflow-Driven</span>
              </span>
              <span className="line-mask">
                <span style={{ transitionDelay: '90ms' }}>
                  AI Solutions{' '}
                  {/* headline stays white on dark; the serif italic and
                      the outlined word carry the accent, not colour */}
                  <span className="serif-accent font-normal text-white">Delivering</span>
                </span>
              </span>
              <span className="line-mask">
                <span style={{ transitionDelay: '180ms' }}>
                  <span className="stroke-lilac">Measurable</span> Enterprise ROI
                </span>
              </span>
            </h1>
          </Reveal>

          <div className="mt-12 grid grid-cols-12 items-end gap-x-10 gap-y-10 border-t border-white/15 pt-10 md:mt-16">
            <Reveal className="col-span-12 lg:col-span-6">
              {/* Full-strength lavender rather than the spec's ~75%, plus
                  medium weight. At 400 and 75% this sat too close to the
                  gradient behind it; #D6CDEE at full opacity is nearly
                  white but keeps the tint, which is what stops it going
                  grey and lifeless the way low-alpha white does here. */}
              <p className="max-w-xl text-[17px] font-medium leading-[1.5] tracking-[-0.01em] text-ig-lavender md:text-[21px]">
                Move away from unguided prompt chats.{' '}
                <span className="serif-accent text-white">Ignitho AI</span> delivers
                pre-built, domain-specific AI accelerators that automate complex business
                operations safely and repeatably
              </p>
            </Reveal>

            <Reveal delay={120} className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <TealButton>
                  Schedule Executive Briefing
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </TealButton>
                <SwapButton
                  onClick={() => goTo('suites-catalog')}
                  variant="light"
                  className="px-6 py-3.5 text-[13px] font-semibold"
                >
                  9 Core Suites
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </SwapButton>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

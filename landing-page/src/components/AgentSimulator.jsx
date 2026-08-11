import { Fragment, useEffect, useState } from 'react';
import { Activity, Check, Cpu, Terminal, X } from 'lucide-react';
import { TealButton } from './SwapButton.jsx';
import { useOverlay } from '../lib/useOverlay.js';

/* Owns its own run. The dossier says which accelerator to show; the staging is
   this component's business, so opening one twice always starts from step one.
   The timers are cleaned up on unmount, which the previous version — bare
   setTimeouts fired from a click handler — did not do. */
export function AgentSimulator({ accelerator, onClose }) {
  const [step, setStep] = useState(0);
  useOverlay(Boolean(accelerator), onClose);

  useEffect(() => {
    if (!accelerator) return undefined;
    setStep(1);
    const a = setTimeout(() => setStep(2), 1200);
    const b = setTimeout(() => setStep(3), 2800);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [accelerator]);

  if (!accelerator) return null;

  return (
    /* The backdrop is lighter than it was and now blurs what is behind it.
       Both matter: at 88% ink the page was effectively gone, so the panel
       floated in a void with nothing to cast a shadow onto. Letting the page
       show through, softened, is what gives the window something to sit in
       FRONT of. The blur is affordable here because `useOverlay` locks body
       scroll while this is open, so it rasterises once. */
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ig-ink/55 p-4 backdrop-blur-[5px]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* A window, not a slab: hairline edge instead of the 2px near-black
          rule, a long soft shadow in the page's own violet, and a title bar
          that stays put because the panel is a flex column and only the body
          below it scrolls. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="pop-c relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[22px] border border-ig-ink/10 bg-white shadow-[0_44px_100px_-28px_rgba(22,6,58,0.6),0_8px_24px_-12px_rgba(22,6,58,0.3)]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ig-ink/10 bg-ig-paper-2 px-6 py-4">
          <span className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.06em] text-ig-ink">
            <Cpu className="h-3.5 w-3.5 text-ig-purple" strokeWidth={2.4} />
            Live Agent Pipeline Simulator
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-ig-muted transition-colors hover:bg-ig-ink/[0.07] hover:text-ig-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          <h3 className="text-[30px] font-extrabold leading-none tracking-[-0.035em] text-ig-ink md:text-[40px]">
            {accelerator.name}
          </h3>
          <p className="serif-accent mt-2 max-w-lg text-[17px] leading-[1.3] text-ig-purple">
            {accelerator.desc}
          </p>

          {/* pipeline */}
          <div className="mt-8 flex items-stretch">
            {[
              { label: 'Input Ingestion', node: 'Node 1', step: 1 },
              { label: 'Agent Execution', node: 'Node 2', step: 2 },
              { label: 'Enterprise Outcome', node: 'Node 3', step: 3 }
            ].map((n, i) => {
              const reached = step >= n.step;
              const running = step === n.step && n.step === 2;
              const done = reached && !running;
              return (
                <Fragment key={n.node}>
                  {i > 0 && (
                    <div className="relative mt-8 h-px w-4 shrink-0 self-start bg-ig-divider md:w-8">
                      <span
                        className={`absolute left-0 top-0 h-px bg-ig-teal transition-all duration-700 ease-out ${
                          reached ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                  <div
                    /* Tints, not solids. The running node used to go to a
                       filled near-black box mid-pipeline, which was the
                       single highest-contrast thing in the window and made
                       the two nodes either side of it look broken rather
                       than merely waiting. Violet for working, teal for
                       done — the page's own meanings — at a strength that
                       still separates the three states. */
                    className={`flex-1 rounded-[14px] border p-4 transition-colors duration-500 ${
                      running
                        ? 'border-ig-violet-600/35 bg-ig-violet-600/[0.1] text-ig-ink'
                        : reached
                          ? 'border-ig-teal/35 bg-ig-teal/[0.08] text-ig-ink'
                          : 'border-ig-ink/12 bg-ig-paper text-ig-muted'
                    }`}
                  >
                    <span className="block font-mono text-[11.5px] font-bold tracking-[0.055em] opacity-50">
                      {n.node}
                    </span>
                    <span
                      className={`mt-1.5 block text-[13px] font-extrabold leading-tight tracking-[-0.01em] ${
                        reached ? '' : 'opacity-45'
                      }`}
                    >
                      {n.label}
                    </span>
                    <span className="mt-3 flex h-4 items-center">
                      {running && (
                        <Activity className="h-4 w-4 animate-spin text-ig-violet-600" />
                      )}
                      {done && <Check className="h-4 w-4 text-ig-teal" strokeWidth={3} />}
                    </span>
                  </div>
                </Fragment>
              );
            })}
          </div>

          {/* Stream — still dark, because a console reads right dark and
              nothing else here does. But on the brand's violet-black rather
              than the near-black it was, so it belongs to the same page as
              the window around it. */}
          <div className="mt-8 rounded-[14px] bg-ig-ink p-4 font-mono text-[11.5px] leading-relaxed">
            <div className="mb-2.5 flex items-center gap-2 border-b border-white/10 pb-2 text-white/35">
              <Terminal className="h-3.5 w-3.5" />
              <span className="tracking-[0.055em]">Execution Status Stream</span>
            </div>
            <div className="text-white/45">
              [00:00.10] Initializing agent payload context...
            </div>
            {step >= 2 && (
              <div className="msg-in text-white/75">
                [00:01.20] Executing domain rules &amp; policy guardrails...
              </div>
            )}
            {step === 3 && (
              <div className="msg-in font-bold text-ig-teal-ring">
                [00:02.50] Status 200 OK: Generated outcome verified successfully
              </div>
            )}
          </div>

          <div className="mt-7 flex justify-end">
            <TealButton onClick={onClose}>Close Tester</TealButton>
          </div>
        </div>
      </div>
    </div>
  );
}

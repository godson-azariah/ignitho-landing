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
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ig-ink/88 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pop-c relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border-2 border-ig-ink bg-ig-paper"
      >
        <div className="flex items-center justify-between border-b border-ig-ink/15 px-6 py-4">
          <span className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.06em] text-ig-ink">
            <Cpu className="h-3.5 w-3.5 text-ig-purple" strokeWidth={2.4} />
            Live Agent Pipeline Simulator
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ig-muted transition-colors hover:text-ig-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 md:p-8">
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
                    className={`flex-1 border p-4 transition-colors duration-500 ${
                      running
                        ? 'border-ig-ink bg-ig-ink text-white'
                        : reached
                          ? 'border-ig-teal bg-ig-teal/10 text-ig-ink'
                          : 'border-ig-ink/20 text-ig-muted'
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
                      {running && <Activity className="h-4 w-4 animate-spin" />}
                      {done && <Check className="h-4 w-4 text-ig-teal" strokeWidth={3} />}
                    </span>
                  </div>
                </Fragment>
              );
            })}
          </div>

          {/* stream — the one place a true console reads right */}
          <div className="mt-8 bg-ig-console p-4 font-mono text-[11.5px] leading-relaxed">
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

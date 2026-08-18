/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  STEP 3 OF THE WALKTHROUGH — going live, drawn as a screen

   WHERE YOU SEE THIS
     The right-hand illustration while "Deploy in days" is the active step.

   WHAT IS IN HERE
     · A window showing a deployment schedule measured in days.
     · A second window confirming the release.

   WORTH KNOWING
     The point it makes visually is the one the step text makes in words: days, not months.
   ========================================================================== */
import { Calendar, Check, ChevronDown } from 'lucide-react';
import { Bar, Tool, Foot } from './chrome.jsx';
import { WIN, RULE, MICRO, LABEL, VALUE, TOP, BOT, at } from './tokens.js';

export function DeployPanel() {
  /* NO FIGURE ON THE LONG BAR, DELIBERATELY. The page's claim is "days rather
     than custom multi-month projects", and "multi-month" is not a number.
     "~6 months" would have invented one and handed it to the reader as a
     measurement. The tracks illustrate a ratio the page states in words, so
     they carry the words instead. */
  const BARS = [
    { label: 'Custom build', figure: 'months', pct: '100%', fill: 'bg-ig-divider', d: 240 },
    { label: 'Ignitho accelerators', figure: 'days', pct: '17%', fill: 'bg-ig-teal', d: 300 }
  ];
  return (
    <>
      <div className={`${TOP} ${WIN} mr-auto`}>
        <Bar
          title="Time to production"
          right={
            <span className="flex shrink-0 items-center gap-1 rounded-[6px] bg-ig-paper-2 px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-ig-muted">
              One workflow
              <ChevronDown className="h-2 w-2" strokeWidth={3} />
            </span>
          }
        />
        <Tool>
          <span className={`min-w-0 flex-1 truncate ${MICRO}`}>Comparison</span>
          <span className="flex shrink-0 items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ig-divider" />
            <span className={MICRO}>Custom</span>
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ig-teal" />
            <span className={MICRO}>Ignitho</span>
          </span>
        </Tool>

        <div className="px-3 pb-4 pt-3">
          <div className="flex flex-col gap-3">
            {BARS.map((b, i) => (
              <div key={b.label} className="mg" style={at(150 + i * 60)}>
                <span className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[10.5px] font-bold tracking-[-0.01em] text-ig-ink">
                    {b.label}
                  </span>
                  <span
                    className={`shrink-0 font-mono text-[9.5px] font-bold ${
                      i === 1 ? 'text-ig-teal' : 'text-ig-muted'
                    }`}
                  >
                    {b.figure}
                  </span>
                </span>
                {/* full-width track, part-width fill, and the fill wipes inside
                    a clipped box so its rounded cap is never scaled out of shape
                    the way a scaleX on the bar itself would */}
                <span className="mt-1.5 block h-2 w-full rounded-full bg-ig-ink/[0.07]">
                  <span
                    className="block h-full overflow-hidden rounded-full"
                    style={{ width: b.pct }}
                  >
                    <span
                      className={`mg-wipe block h-full w-full rounded-full ${b.fill}`}
                      style={at(b.d)}
                    />
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* the axis. A chart without a scale is an infographic. */}
          <span className="mg mt-2 flex items-center justify-between" style={at(340)}>
            {['Day 0', 'Week 1', 'Month 1', 'Month 6'].map((t) => (
              <span key={t} className={MICRO}>
                {t}
              </span>
            ))}
          </span>

          <Foot
            left="No custom engineering cycle"
            delay={390}
            right={<Check className="h-3 w-3 shrink-0 text-ig-teal" strokeWidth={3} />}
          />
        </div>
      </div>

      <div className={`${BOT} ${WIN} ml-auto`} style={at(380)}>
        <Bar
          title="Rollout"
          right={<Calendar className="h-2.5 w-2.5 shrink-0 text-ig-divider" strokeWidth={2.6} />}
        />
        <div className="p-3">
          <span className="flex items-baseline justify-between">
            <span className={LABEL}>Week one</span>
            <span className={VALUE}>5 / 5</span>
          </span>
          <span className="mt-2 flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="mg h-1.5 flex-1 rounded-full bg-ig-teal"
                style={at(440 + i * 45, { '--mg-y': '0px', '--mg-s': '0.4' })}
              />
            ))}
          </span>
          <span className="mt-1 flex items-center gap-1">
            {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
              <span key={i} className={`${MICRO} flex-1 text-center`}>
                {d}
              </span>
            ))}
          </span>
          <span className={`mt-2 flex items-center justify-between border-t ${RULE} pt-2`}>
            <span className={LABEL}>Status</span>
            <span className="flex items-center gap-1 font-mono text-[9.5px] font-bold text-ig-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-ig-teal" />
              Live
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

/* 04 — THE CALCULATOR, with the real controls it has: the −/+ stepper around
   the headcount, the slider with its 50 and 10,000 end stops and the handle at
   the position 500 employees actually puts it, and the basis line underneath.
   The figure is computed from the calculator's own constants and formatted with
   the same `toLocaleString()`, so it is whatever the live control two sections
   up shows on the same machine. */

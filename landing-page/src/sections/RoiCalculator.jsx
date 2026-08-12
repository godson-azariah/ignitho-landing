import { useMemo, useState } from 'react';
import { Minus, MoveHorizontal, Plus } from 'lucide-react';
import { Cross } from '../components/Cross.jsx';
import { Kicker } from '../components/Kicker.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { SHELL } from '../lib/layout.js';

const MIN_EMPLOYEES = 50;
const MAX_EMPLOYEES = 10000;
const SAVINGS_PER_EMPLOYEE = 320;

/* Self-contained: the employee count is of no interest to anything else on the
   page, so nothing else holds it. That also means dragging the slider
   re-renders this section alone rather than the whole site. */
export function RoiCalculator() {
  const [companyEmployees, setCompanyEmployees] = useState(500);

  const estimatedSavings = useMemo(
    () => (companyEmployees * SAVINGS_PER_EMPLOYEE).toLocaleString(),
    [companyEmployees]
  );

  // the figure tracks the handle directly — no count-up, nothing to wait for
  const nudgeEmployees = (delta) =>
    setCompanyEmployees((n) => Math.min(MAX_EMPLOYEES, Math.max(MIN_EMPLOYEES, n + delta)));

  const sliderPct = ((companyEmployees - MIN_EMPLOYEES) / (MAX_EMPLOYEES - MIN_EMPLOYEES)) * 100;

  return (
    <section id="roi-calculator" className="bg-c dots relative py-16 md:py-24">
      <div className={SHELL}>
        <Cross className="-top-7 left-1 md:left-3" />
        <Cross className="-top-7 right-1 md:right-3" />

        <div className="relative">
          <Reveal className="plate mx-auto max-w-3xl text-center">
            {/* The heading tells you what to DO and what you get back, which
                is what a heading over a control should do. "Routine work
                already costs you this much" was a statement — true, but it
                pointed at nothing, so the slider underneath had to explain
                itself.

                Both halves name a real part of this section: the headcount
                is the input, the annual figure is the output. Nothing here
                repeats the kicker above it, which already says the word
                "calculator" once. */}
            <Kicker index="03" centered>
              Interactive Enterprise Savings Calculator
            </Kicker>
            <h2 className="mt-5 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(27px,3.9vw,48px)] text-ig-ink">
              <span className="block">Set your headcount</span>
              <span className="serif-accent block font-normal text-ig-purple">
                see what you save
              </span>
            </h2>
          </Reveal>

          {/* Input and result share one row — the two figures sit on the
              same horizontal axis, split by a rule, at the same type size
              so their baselines land together. The slider still owns the
              row beneath, full width, with nothing beside it. */}
          <Reveal className="mt-8 md:mt-10">
            <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_20px_56px_-30px_rgba(22,6,58,0.5)] ring-1 ring-inset ring-ig-ink/8">
              {/* 1 — the two numbers, side by side */}
              <div className="grid grid-cols-1 divide-y divide-ig-ink/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {/* the input */}
                <div className="flex flex-col items-center gap-4 px-6 py-7 md:px-8 md:py-9">
                  <span className="font-mono text-[11px] font-bold tracking-[0.05em] text-ig-muted">
                    Employees
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => nudgeEmployees(-50)}
                      aria-label="Fewer employees"
                      disabled={companyEmployees <= 50}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ig-ink text-white transition-colors duration-300 hover:bg-ig-violet-600 disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <Minus className="h-4 w-4" strokeWidth={2.6} />
                    </button>
                    {/* fixed width, so the `+` does not shift as digits are
                        gained — `tnum` steadies the glyphs, this steadies
                        the box */}
                    <span className="tnum w-[130px] shrink-0 text-center font-extrabold leading-[0.9] tracking-[-0.04em] text-[clamp(32px,4vw,54px)] text-ig-ink md:w-[168px]">
                      {companyEmployees.toLocaleString()}
                    </span>
                    <button
                      onClick={() => nudgeEmployees(50)}
                      aria-label="More employees"
                      disabled={companyEmployees >= 10000}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ig-ink text-white transition-colors duration-300 hover:bg-ig-violet-600 disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.6} />
                    </button>
                  </div>
                </div>

                {/* the result */}
                <div className="flex flex-col items-center gap-4 px-6 py-7 md:px-8 md:py-9">
                  <span className="font-mono text-[11px] font-bold tracking-[0.05em] text-ig-muted">
                    Estimated Annual ROI
                  </span>
                  {/* the invisible `$` on the right balances the real one,
                      so the digits centre in the cell rather than sitting
                      off to one side of it */}
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="font-mono font-bold leading-[0.9] text-[clamp(20px,2.4vw,32px)] text-ig-teal">
                      $
                    </span>
                    <span className="tnum font-extrabold leading-[0.9] tracking-[-0.04em] text-[clamp(32px,4vw,54px)] text-ig-ink">
                      {estimatedSavings}
                    </span>
                    <span
                      aria-hidden="true"
                      className="invisible font-mono font-bold leading-[0.9] text-[clamp(20px,2.4vw,32px)]"
                    >
                      $
                    </span>
                  </div>
                </div>
              </div>

              {/* 2 — the control */}
              <div className="border-t border-ig-ink/10 px-6 pb-6 pt-7 md:px-9 md:pb-8 md:pt-8">
                <span className="flex items-center justify-center gap-2 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-purple">
                  <MoveHorizontal className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Drag to adjust
                </span>

                {/* The track owns this row outright — full panel width,
                    nothing to its left or right at any breakpoint. */}
                <div className="relative mt-6">
                  <div className="h-2 w-full rounded-full bg-ig-ink/10">
                    <div
                      className="h-2 rounded-full bg-ig-teal"
                      style={{ width: `${sliderPct}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="10000"
                    step="1"
                    value={companyEmployees}
                    onChange={(e) => setCompanyEmployees(Number(e.target.value))}
                    aria-label="Employees"
                    aria-valuetext={`${companyEmployees.toLocaleString()} Employees`}
                    className="ig-range absolute inset-x-0 -top-[9px]"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-[11px] font-bold tracking-[0.055em] text-ig-muted">
                  <span>50</span>
                  <span>10,000</span>
                </div>
              </div>

              {/* 3 — the basis */}
              <div className="border-t border-ig-ink/10 bg-ig-paper-2 px-6 py-4 text-center md:px-9">
                <p className="font-mono text-[11.5px] leading-[1.5] tracking-[0.04em] text-ig-purple">
                  Based on 60% routine workflow reduction
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

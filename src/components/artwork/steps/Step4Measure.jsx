/* Step 4: the return. Figures, a comparison bar, and the headline saving.

   The numbers come from the same assumptions the savings calculator uses, so
   the two cannot end up quoting different figures. */

import { Check, Minus, MoveHorizontal, Plus, TrendingUp } from 'lucide-react';
import { Bar, Tool, Btn, Foot } from './WindowParts.jsx';
import { WIN, MICRO, LABEL, TOP, BOT, at, UP } from './sharedStyles.js';
import { DEFAULT_EMPLOYEES, SAVINGS_PER_EMPLOYEE } from '../../../sections/SavingsCalculator.jsx';

export function Step4Measure() {
  const BARS = ['34%', '52%', '71%', '100%'];
  const roi = (DEFAULT_EMPLOYEES * SAVINGS_PER_EMPLOYEE).toLocaleString();
  /* 500 of a 50–10,000 range is 4.5% along, so the fill and the handle sit at
     exactly that — the illustration and the control it illustrates agree. */
  const pos = '4.5%';
  return (
    <>
      <div className={`${TOP} ${WIN} ml-auto`}>
        <Bar
          title="Savings calculator"
          right={
            <span className="shrink-0 rounded-[6px] bg-ig-paper-2 px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-ig-muted">
              USD
            </span>
          }
        />
        <Tool>
          <span className={`min-w-0 flex-1 truncate ${MICRO}`}>Employees</span>
          <span className="flex shrink-0 items-center gap-1.5">
            <Btn icon={Minus} />
            <span className="tnum font-mono text-[10px] font-bold text-ig-ink">
              {DEFAULT_EMPLOYEES.toLocaleString()}
            </span>
            <Btn icon={Plus} on />
          </span>
        </Tool>

        <div className="px-3 pb-4 pt-3">
          <span className={`mg block ${LABEL}`} style={at(70)}>
            Estimated annual ROI
          </span>
          <span className="mg mt-1 flex items-baseline gap-1.5" style={at(130)}>
            <span className="font-mono text-[15px] font-bold leading-none text-ig-teal">$</span>
            <span className="tnum text-[30px] font-extrabold leading-[0.9] tracking-[-0.04em] text-ig-ink sm:text-[34px]">
              {roi}
            </span>
            <span className="ml-1 flex items-center gap-0.5 self-center rounded-[5px] bg-ig-teal/[0.12] px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-ig-teal">
              <TrendingUp className="h-2 w-2" strokeWidth={3} />
              60%
            </span>
          </span>

          {/* the slider, with its real end stops and its real handle position */}
          <span className="mg mt-3 block" style={at(190)}>
            <span className="flex items-center gap-1.5">
              <MoveHorizontal className="h-2.5 w-2.5 shrink-0 text-ig-purple" strokeWidth={2.6} />
              <span className={LABEL}>Drag to adjust</span>
            </span>
            <span className="relative mt-2 block h-1.5 w-full rounded-full bg-ig-ink/[0.07]">
              <span className="block h-full overflow-hidden rounded-full" style={{ width: pos }}>
                <span
                  className="mg-wipe block h-full w-full rounded-full bg-ig-teal"
                  style={at(240)}
                />
              </span>
              <span
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ig-teal ring-2 ring-white"
                style={{ left: pos }}
              />
            </span>
            <span className="mt-1.5 flex items-center justify-between">
              <span className={MICRO}>50</span>
              <span className={MICRO}>10,000</span>
            </span>
          </span>

          <Foot
            left="Based on 60% routine workflow reduction"
            delay={330}
            right={
              <span className="shrink-0 font-mono text-[9px] font-bold text-ig-purple">
                ${SAVINGS_PER_EMPLOYEE}/head
              </span>
            }
          />
        </div>
      </div>

      <div className={`${BOT} ${WIN} mr-auto`} style={at(380)}>
        <Bar title="Measured target" />
        <div className="p-3">
          <span className="flex items-baseline justify-between">
            <span className={LABEL}>Quarterly</span>
            <span className="flex items-center gap-1 font-mono text-[9.5px] font-bold text-ig-teal">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
              Met
            </span>
          </span>
          {/* a shape, not a data series — there is no fourth quarter of anything
              on this page — so the last bar is teal because it is the outcome,
              not because it measures something different */}
          <span className="mt-2 flex h-10 items-end gap-1.5">
            {BARS.map((h, i) => (
              <span
                key={h}
                className="relative block flex-1 overflow-hidden rounded-t-[3px] bg-ig-ink/[0.07]"
                style={{ height: h }}
              >
                {/* `/55` rather than solid: #4A12B8 at full strength was the last
                    dark block anywhere in these panels. At 55% it still reads
                    plainly above the 7% ink track, so the chart keeps its
                    contrast without a near-black bar. Teal stays solid on the
                    last one — it is the accent, and #00A274 is not a dark. */}
                <span
                  className={`mg-wipe absolute inset-0 rounded-t-[3px] ${
                    i === BARS.length - 1 ? 'bg-ig-teal' : 'bg-ig-violet-600/55'
                  }`}
                  style={at(420 + i * 45, UP)}
                />
              </span>
            ))}
          </span>
          <span className="mt-1 flex items-center gap-1.5">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
              <span key={q} className={`${MICRO} flex-1 text-center`}>
                {q}
              </span>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}


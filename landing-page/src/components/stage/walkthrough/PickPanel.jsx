/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  STEP 1 OF THE WALKTHROUGH — the catalogue, drawn as a screen

   WHERE YOU SEE THIS
     The right-hand illustration while "Choose the suite" is the active step.

   WHAT IS IN HERE
     · A window showing the suite catalogue as a table: a search box, the filter tabs, column headings and three rows of real suite names.
     · A second, smaller window showing one suite selected.

   WORTH KNOWING
     The rows are read from the real suite list, so this drawing cannot show a suite the site does not have.
   ========================================================================== */
import { Check, ChevronRight, LayoutGrid, List, ListFilter, Search } from 'lucide-react';
import { Bar, Tool, Btn, Foot } from './chrome.jsx';
import { WIN, RULE, MICRO, LABEL, VALUE, PICKED, TOP, BOT, at, FOUNDATIONS, FOUNDATION_TAB, CHOSEN } from './tokens.js';

export function PickPanel() {
  return (
    <>
      <div className={`${TOP} ${WIN} mr-auto`}>
        <Bar
          title="Enterprise catalog"
          right={
            <span className="shrink-0 rounded-full bg-ig-paper-2 px-1.5 py-0.5 font-mono text-[8.5px] font-bold text-ig-muted">
              9
            </span>
          }
        />
        <Tool>
          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-[7px] bg-ig-paper-2 px-2 py-1.5">
            <Search className="h-2.5 w-2.5 shrink-0 text-ig-purple" strokeWidth={2.6} />
            <span className="min-w-0 flex-1 truncate font-mono text-[9.5px] text-ig-ink">
              {FOUNDATION_TAB}
            </span>
            {/* the text caret — a field without one is not being typed in */}
            <span className="h-2.5 w-px shrink-0 bg-ig-purple" />
          </span>
          <span className={`h-3.5 w-px shrink-0 bg-ig-ink/10`} />
          <Btn icon={ListFilter} on />
          <Btn icon={LayoutGrid} />
          <Btn icon={List} on />
        </Tool>

        <div className="px-3 pb-4 pt-2.5">
          <span className="mg flex items-center gap-1" style={at(70)}>
            {['All 9', 'Foundations', 'Verticals'].map((t, i) => (
              <span
                key={t}
                className={`rounded-[6px] px-2 py-1 font-mono text-[8.5px] font-bold tracking-[0.04em] ${
                  i === 1 ? PICKED : 'text-ig-muted'
                }`}
              >
                {t}
              </span>
            ))}
          </span>

          {/* column headers — the cheapest possible signal that a list is data */}
          <span className="mg mt-2.5 flex items-center gap-2.5 px-2" style={at(130)}>
            <span className={`${MICRO} w-4`}>No</span>
            <span className={`${MICRO} min-w-0 flex-1`}>Suite</span>
            <span className={MICRO}>Type</span>
            <span className="w-3" />
          </span>

          <span className={`mt-1 block border-t ${RULE}`} />

          <div className="flex flex-col">
            {FOUNDATIONS.map((s, i) => {
              const on = s.id === CHOSEN.id;
              return (
                <span
                  key={s.id}
                  className={`mg flex items-center gap-2.5 border-b ${RULE} px-2 py-2 ${
                    on ? 'bg-ig-purple/[0.09]' : ''
                  }`}
                  style={at(180 + i * 60)}
                >
                  <span
                    className={`w-4 font-mono text-[9px] font-bold ${
                      on ? 'text-ig-purple' : 'text-ig-divider'
                    }`}
                  >
                    {s.number}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[10.5px] font-bold tracking-[-0.01em] text-ig-ink">
                    {s.name}
                  </span>
                  <span className="shrink-0 rounded-[5px] bg-ig-paper-2 px-1.5 py-0.5 font-mono text-[8px] font-bold text-ig-muted">
                    Core
                  </span>
                  {on ? (
                    <Check className="h-3 w-3 shrink-0 text-ig-teal" strokeWidth={3} />
                  ) : (
                    <ChevronRight className="h-3 w-3 shrink-0 text-ig-divider" strokeWidth={2.6} />
                  )}
                </span>
              );
            })}
          </div>

          <Foot
            left="3 of 9 shown"
            delay={370}
            right={
              <span className="flex items-center gap-1 font-mono text-[9px] font-bold tracking-[0.04em] text-ig-purple">
                1 selected
              </span>
            }
          />
        </div>
      </div>

      <div className={`${BOT} ${WIN} ml-auto`} style={at(380)}>
        <Bar title="Suite detail" />
        <div className="p-3">
          {/* breadcrumb — a detail view is always somewhere */}
          <span className="flex items-center gap-1">
            <span className={MICRO}>Catalog</span>
            <ChevronRight className="h-2 w-2 text-ig-divider" strokeWidth={3} />
            <span className={`${MICRO} text-ig-purple`}>{CHOSEN.number}</span>
          </span>
          <span className="mt-1.5 block truncate text-[10.5px] font-extrabold tracking-[-0.01em] text-ig-ink">
            {CHOSEN.name}
          </span>
          <span className="mt-1 block text-[10px] font-bold leading-[1.35] text-ig-teal">
            {CHOSEN.tagline}
          </span>
          <span className={`mt-2 block border-t ${RULE} pt-2`}>
            <span className="flex items-center justify-between">
              <span className={LABEL}>Sub-domains</span>
              <span className={VALUE}>{CHOSEN.subDomains.length}</span>
            </span>
            <span className="mt-1.5 flex items-center justify-between">
              <span className={LABEL}>Governance</span>
              <span className="flex items-center gap-1 font-mono text-[9.5px] font-bold text-ig-teal">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                Ready
              </span>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

/* 02 — THE SIMULATOR: a run toolbar, three DAG nodes WITH THE EDGES DRAWN
   between them, per-node durations, a progress track with a percentage, and the
   console as a second window with line numbers and a status footer. */

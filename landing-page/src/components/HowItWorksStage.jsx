import { useEffect, useState } from 'react';
import {
  Activity,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  LayoutGrid,
  List,
  ListFilter,
  Minus,
  MoveHorizontal,
  Play,
  Plus,
  Search,
  Terminal,
  TrendingUp
} from 'lucide-react';
import { SUITES } from '../data/suites.js';
import { TABS } from '../data/navigation.js';
import { DEFAULT_EMPLOYEES, SAVINGS_PER_EMPLOYEE } from '../sections/RoiCalculator.jsx';

/* The illustration beside the four steps: two windows per step, each one built
   to read as a working screen rather than as a picture of one.

   WHAT MAKES A MOCK-UP LOOK LIKE AN INTERFACE, and what these windows now have:

     · CHROME THAT DOES SOMETHING. A title bar with dots and a name, plus a
       right-hand slot carrying live state — a count, an elapsed time, a unit.
     · A TOOLBAR UNDER THE CHROME. Real apps put controls in a strip of their
       own, separated by a hairline: a field, icon buttons, a segmented view
       switch. A screen with no controls is a diagram.
     · COLUMN HEADERS OVER ROWS. Two words of tiny mono over a list is the
       single cheapest signal that the list is DATA.
     · A STATUS BAR AT THE FOOT. Count on the left, context on the right, above
       a hairline. Every real window has one and no illustration ever does.
     · EDGES BETWEEN THE DAG NODES. They were three adjacent boxes with gaps,
       which is a row of cards; a pipeline needs the connections drawn, and the
       reached ones fill teal behind the node that follows.
     · CONTROLS IN THEIR REAL STATES. The calculator window carries the actual
       stepper, the actual slider with its 50 and 10,000 end stops, and the
       handle sitting at the position 500 employees really puts it.
     · RIGHT-ALIGNED VALUES AGAINST LEFT-ALIGNED LABELS, mono for anything
       numeric. That one alignment habit does more for realism than any amount
       of decoration.

   THE PALETTE IS UNTOUCHED. White windows, `paper-2` for recessed controls,
   violet tints for selection, ink for type, `divider` hairlines, and teal on
   the accent alone — one confirmed state and one measured outcome per window.
   Nothing here goes dark and nothing new enters the palette.

   THE COMPOSITION IS A DIAGONAL: a wide window at the TOP against one side, a
   narrow one at the BOTTOM against the OTHER, alternating which side leads. Their
   widths sum past 100% so they must overlap horizontally, and a 22px negative
   top margin overlaps them vertically — so the meeting is a CORNER, the only
   overlap that reads as two depths rather than one thing covering another. The
   22px lands inside the upper window's own bottom padding, so it never covers
   content, and every offset is measured from the windows' own edges so the
   diagonal survives the stage being three different heights.

   ONE WINDOW ON A PHONE. Two overlapping windows in a 290px box is a pile.

   THE WHOLE STAGE IS DECORATION — everything it says is in the step copy beside
   it, so it is `aria-hidden` at the root and none of it is announced. */

const SHADOW =
  'shadow-[0_1px_2px_rgba(22,6,58,0.18),0_10px_20px_-6px_rgba(22,6,58,0.22),0_36px_64px_-20px_rgba(22,6,58,0.32)]';
const WIN = `relative overflow-hidden rounded-[14px] bg-white ring-1 ring-inset ring-ig-purple/[0.16] ${SHADOW}`;
const RULE = 'border-ig-purple/[0.11]';
const MICRO = 'font-mono text-[8.5px] font-bold tracking-[0.055em] text-ig-divider';
const LABEL = 'font-mono text-[9.5px] font-bold tracking-[0.055em] text-ig-muted';
const VALUE = 'font-mono text-[9.5px] font-bold tracking-[0.03em] text-ig-ink';
/* Selection: a violet tint with ink type, never a violet fill with white type.
   Nothing inside these panels goes dark. */
const PICKED = 'bg-ig-purple/[0.11] text-ig-ink ring-1 ring-inset ring-ig-purple/25';

const TOP = 'mg w-[82%]';
const BOT = 'mg relative z-10 -mt-[22px] hidden w-[60%] sm:block';

const at = (ms, more) => ({ '--mg-d': `${ms}ms`, ...more });
const UP = { '--mg-x': '0px', '--mg-y': '101%' };

const FOUNDATIONS = SUITES.filter((s) => s.type === 'foundation').slice(0, 3);
const FOUNDATION_TAB = TABS.find((t) => t.id === 'FOUNDATION')?.label ?? '';
const CHOSEN = FOUNDATIONS[1] ?? FOUNDATIONS[0];

/* Window chrome. Three dots in neutral ink rather than red/amber/green —
   traffic lights would import a palette this page does not own, and the shape
   alone already says "window". The right slot is where a real title bar keeps
   live state. */
function Bar({ title, right }) {
  return (
    <span className={`flex items-center gap-2 border-b ${RULE} px-3.5 py-2.5`}>
      <span className="flex shrink-0 gap-[5px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[7px] w-[7px] rounded-full bg-ig-ink/[0.17]" />
        ))}
      </span>
      <span className={`ml-1 min-w-0 flex-1 truncate ${LABEL}`}>{title}</span>
      {right}
    </span>
  );
}

/* The control strip. Its own row, its own hairline — which is exactly what
   makes it read as a toolbar rather than as the first line of content. */
function Tool({ children }) {
  return (
    <span className={`flex items-center gap-2 border-b ${RULE} px-3 py-2`}>{children}</span>
  );
}

/* A square icon button, in the two states a toolbar always has one of. */
function Btn({ icon: Icon, on = false }) {
  return (
    <span
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-[6px] ${
        on ? 'bg-ig-purple/[0.12] text-ig-purple' : 'text-ig-divider'
      }`}
    >
      <Icon className="h-2.5 w-2.5" strokeWidth={2.6} />
    </span>
  );
}

/* The status bar. Count left, context right, over a hairline. */
function Foot({ left, right, delay }) {
  return (
    <span
      className={`mg mt-2.5 flex items-center justify-between border-t ${RULE} pt-2`}
      style={at(delay)}
    >
      <span className={LABEL}>{left}</span>
      {right}
    </span>
  );
}

/* 01 — THE CATALOGUE, as a table view: toolbar with a search field and the real
   grid/list switch, segmented filters, column headers, three data rows and a
   status bar. Rows and labels come out of `suites.js` and `navigation.js`, so
   the window cannot drift away from the catalogue it illustrates. */
function PickPanel() {
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
function TestPanel() {
  const NODES = [
    { label: 'Input ingestion', ms: '0.10s', state: 'done' },
    { label: 'Agent execution', ms: '1.20s', state: 'run' },
    { label: 'Enterprise outcome', ms: '—', state: 'wait' }
  ];
  return (
    <>
      <div className={`${TOP} ${WIN} ml-auto`}>
        <Bar
          title="Live agent pipeline"
          right={
            <span className="flex shrink-0 items-center gap-1 font-mono text-[8.5px] font-bold tracking-[0.04em] text-ig-purple">
              <Clock className="h-2.5 w-2.5" strokeWidth={2.6} />
              00:02.50
            </span>
          }
        />
        <Tool>
          <span className="flex shrink-0 items-center gap-1 rounded-[7px] bg-ig-teal px-2 py-1 font-mono text-[8.5px] font-bold tracking-[0.04em] text-white">
            <Play className="h-2 w-2 fill-current" />
            Running
          </span>
          <span className="h-3.5 w-px shrink-0 bg-ig-ink/10" />
          <span className={`min-w-0 flex-1 truncate ${MICRO}`}>Governed DAG · 3 nodes</span>
          <span className={VALUE}>2/3</span>
        </Tool>

        <div className="px-3 pb-4 pt-3">
          {/* THE EDGES. Three boxes with gaps between them is a row of cards; a
              pipeline is nodes plus the connections, and the ones already
              reached are filled so the run's position is legible from the wiring
              rather than only from the icons. */}
          <div className="flex items-stretch">
            {NODES.map((n, i) => (
              <span key={n.label} className="flex min-w-0 flex-1 items-stretch">
                {i > 0 && (
                  <span
                    className="mg relative mt-6 h-px w-3 shrink-0 bg-ig-divider"
                    style={at(120 + i * 60)}
                  >
                    <span
                      className={`absolute inset-0 ${
                        n.state !== 'wait' ? 'bg-ig-teal' : 'bg-transparent'
                      }`}
                    />
                  </span>
                )}
                <span
                  className={`mg min-w-0 flex-1 rounded-[9px] border p-2 ${
                    n.state === 'run'
                      ? 'border-ig-violet-600/35 bg-ig-violet-600/[0.1]'
                      : n.state === 'done'
                        ? 'border-ig-teal/35 bg-ig-teal/[0.08]'
                        : 'border-ig-ink/10 bg-ig-paper'
                  }`}
                  style={at(130 + i * 60)}
                >
                  <span className="flex items-center justify-between">
                    <span className={MICRO}>Node {i + 1}</span>
                    <span className="flex h-3 w-3 items-center justify-center">
                      {n.state === 'run' && (
                        <Activity className="h-3 w-3 animate-spin text-ig-violet-600" />
                      )}
                      {n.state === 'done' && (
                        <Check className="h-3 w-3 text-ig-teal" strokeWidth={3} />
                      )}
                    </span>
                  </span>
                  <span
                    className={`mt-1 block truncate text-[9.5px] font-extrabold leading-tight tracking-[-0.01em] ${
                      n.state === 'wait' ? 'text-ig-muted' : 'text-ig-ink'
                    }`}
                  >
                    {n.label}
                  </span>
                  <span className={`mt-1 block ${MICRO}`}>{n.ms}</span>
                </span>
              </span>
            ))}
          </div>

          <span className="mg mt-3 block" style={at(310)}>
            <span className="flex items-baseline justify-between">
              <span className={LABEL}>Pipeline progress</span>
              <span className={VALUE}>67%</span>
            </span>
            <span className="mt-1.5 block h-1.5 w-full rounded-full bg-ig-ink/[0.07]">
              <span className="block h-full w-2/3 overflow-hidden rounded-full">
                <span
                  className="mg-wipe block h-full w-full rounded-full bg-ig-teal"
                  style={at(340)}
                />
              </span>
            </span>
          </span>
        </div>
      </div>

      <div className={`${BOT} ${WIN} mr-auto`} style={at(380)}>
        <Bar
          title="Execution stream"
          right={<Terminal className="h-2.5 w-2.5 shrink-0 text-ig-divider" strokeWidth={2.6} />}
        />
        <div className="p-3">
          {/* line numbers in a gutter — the one detail that says "log" */}
          {[
            ['01', '00:00.10', 'Initializing payload', false],
            ['02', '00:01.20', 'Domain rules & guardrails', false],
            ['03', '00:02.50', 'Status 200 OK', true]
          ].map(([n, t, msg, ok]) => (
            <span key={n} className="flex items-baseline gap-1.5">
              <span className={`${MICRO} w-3 shrink-0`}>{n}</span>
              <span className="shrink-0 font-mono text-[8.5px] text-ig-divider">{t}</span>
              <span
                className={`min-w-0 flex-1 truncate font-mono text-[8.5px] ${
                  ok ? 'font-bold text-ig-teal' : 'text-ig-muted'
                }`}
              >
                {msg}
              </span>
            </span>
          ))}
          <span className={`mt-2 flex items-center justify-between border-t ${RULE} pt-2`}>
            <span className={LABEL}>Outcome</span>
            <span className="flex items-center gap-1 font-mono text-[9.5px] font-bold text-ig-teal">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
              Verified
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

/* 03 — TIME TO PRODUCTION: a header with a dropdown-style scope control, two
   tracks with an axis scale beneath them, a status bar, and the rollout week as
   a second window with day letters and a live chip. */
function DeployPanel() {
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
function MeasurePanel() {
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

const PANELS = {
  pick: PickPanel,
  test: TestPanel,
  deploy: DeployPanel,
  measure: MeasurePanel
};

/* Must match `mg-out`'s duration in `motion.css`. If this is shorter the
   outgoing panel is torn out mid-fade; if it is longer an invisible panel sits
   in the stage doing nothing until the timer catches up. */
const EXIT_MS = 360;

const CENTRE = 'absolute inset-0 grid place-items-center p-5 sm:p-8';

/* THE OUTGOING PANEL HAS TO STAY MOUNTED TO BE ABLE TO LEAVE.

   `key={activeId}` alone gives a free entrance — a freshly mounted element runs
   its CSS animations from the top — but it also means the old panel is gone from
   the DOM in the same commit, and something that is not there cannot animate.

   So the stage keeps two ids. `shown` is what is playing and is what the `key`
   hangs off, so entrances work exactly as before. `leaving` is the one that just
   stopped being shown, held for `EXIT_MS` then dropped. Both render into the
   same absolutely-positioned centre box, so they occupy identical space and
   cross-fade rather than shifting anything.

   The guard is `activeId === shown` rather than a ref or a previous-value trick:
   if the parent re-renders for any other reason, this effect compares the two
   ids, sees they agree, and does nothing. */
export function HowItWorksStage({ activeId, live }) {
  const [shown, setShown] = useState(activeId);
  const [leaving, setLeaving] = useState(null);

  /* NOTHING IN HERE RENDERS UNTIL THE SECTION HAS BEEN REACHED ONCE.

     The panel is in the DOM from first paint, so its entrance — eight to
     thirteen elements each animating a blur — used to run during page load,
     against everything else competing for the main thread at exactly that
     moment, and finish long before anyone had scrolled far enough to see it.
     All of that work went nowhere.

     `awake` latches on and never off. Unmounting when the section leaves the
     viewport would save a little more and cost far more than it saved: the
     entrance would replay every time the reader scrolled past, which is both a
     surprise and the same expensive work over again.

     The skin above renders unconditionally, so the panel's box, fill and border
     are there from the start and nothing shifts when the contents arrive. */
  const [awake, setAwake] = useState(false);
  useEffect(() => {
    if (live) setAwake(true);
  }, [live]);

  useEffect(() => {
    if (activeId === shown) return undefined;
    setLeaving(shown);
    setShown(activeId);
    const t = setTimeout(() => setLeaving(null), EXIT_MS);
    return () => clearTimeout(t);
  }, [activeId, shown]);

  const Panel = PANELS[shown] ?? PickPanel;
  const Leaving = leaving ? PANELS[leaving] : null;

  return (
    /* THE PANEL IS A KEYED LAYER INSIDE A PLAIN SIZING BOX, NOT THE BOX ITSELF.

       The block has to bounce when the step changes, and in React the way an
       element replays a CSS animation is by being remounted — which is what a
       changing `key` does. But this element also holds the outgoing panel that is
       mid-exit, and remounting the parent would tear that child out on the spot.
       A container cannot both restart itself and preserve what is leaving.

       So they are separated. The outer div only measures. The panel's entire skin
       — fill, border, rounding — is a sibling layer at `inset-0`, keyed on
       `shown`, so it remounts and replays `stage-pulse` on every change while the
       crossfade layers beside it are left alone.

       NO `overflow-hidden` ON THE OUTER BOX: the clip belongs to the skin, which
       is what has rounded corners to clip. Leaving the outer open is also what
       lets the skin scale without being cut, and nothing else can escape — the
       compositions are centred inside 40-64px of padding and the largest
       transform in play is 1.04. */
    <div
      aria-hidden="true"
      /* Heights measured against the tallest composition, `pick`, which the
         toolbar, column headers and status bar bring to about 436px; plus 64px
         of padding at `sm`. `lg:min-h` is a floor, not a height — the row is
         `items-stretch`, so whichever of this and the step list is taller sets
         both. */
      className="relative h-[380px] sm:h-[520px] lg:h-full lg:min-h-[530px]"
    >
      {/* The fill is the specified #F7F2FF and the border is the active step
          card's 1px violet hairline. Both live in `.panel-field` — the fill
          because a literal beats an alpha whose result shifts with what is
          behind it, the border because Tailwind's `ring` IS a box-shadow and a
          hand-written class in this bundle overrides a Play-CDN utility at equal
          specificity, so a `ring-*` here gets silently discarded. */}
      <div
        key={`skin-${shown}`}
        className="panel-field stage-pulse absolute inset-0 overflow-hidden rounded-[26px] bg-[#f7f2ff]"
      />

      {/* BOTH BLURS SIT ON THE 470px BLOCK, NOT ON THE FULL-SIZE WRAPPER, and
          that is the single biggest thing that could be done for weak hardware
          without touching a pixel of the result.

          `stage-swap` and `mg-out` animate `filter: blur()`, which is a
          separable convolution the GPU re-runs every frame over the element's
          whole paint area. On the wrapper — `inset-0` less its padding — that
          area is 652×466 at a desktop width. On the block it actually contains
          it is 470×440. Identical output, because the wrapper is transparent
          everywhere the block is not, and 32% fewer pixels to convolve.

          The transform is identical too: `place-items-center` puts the block's
          centre on the wrapper's, so scaling about either origin is the same
          scale. Nothing moves that did not move before. */}
      {awake && Leaving && (
        <div key={`out-${leaving}`} className={`${CENTRE} pointer-events-none`}>
          <div className="mg-out w-full max-w-[470px]">
            <Leaving />
          </div>
        </div>
      )}

      {/* `stage-swap` is the group ripple for the CONTENTS: the window group
          arrives oversized and out of focus and settles back, so the staggered
          windows read as a ripple through one panel rather than as a queue.
          `stage-pulse` on the skin above moves the panel itself at the same
          moment — together they are one object reacting. */}
      {awake && (
        <div key={shown} className={CENTRE}>
          <div className="stage-swap w-full max-w-[470px]">
            <Panel />
          </div>
        </div>
      )}
    </div>
  );
}

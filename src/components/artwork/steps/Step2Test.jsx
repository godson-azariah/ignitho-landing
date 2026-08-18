/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  STEP 2 OF THE WALKTHROUGH — a test run, drawn as a screen

   WHERE YOU SEE THIS
     The right-hand illustration while "Test the agent" is the active step.

   WHAT IS IN HERE
     · A console window playing through the stages of a simulated run, each one ticking off.
     · A second window showing the run finishing cleanly.

   WORTH KNOWING
     It illustrates the same idea as the Test Agent button on a suite page, but nothing here runs.
   ========================================================================== */
import { Activity, Check, Clock, Play, Terminal } from 'lucide-react';
import { Bar, Tool } from './WindowParts.jsx';
import { WIN, RULE, MICRO, LABEL, VALUE, TOP, BOT, at } from './sharedStyles.js';

export function Step2Test() {
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

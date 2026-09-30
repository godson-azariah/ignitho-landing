/* The method section's film: one app window on a soft lavender canvas, in
   which a cursor does each step's work, as in a product video.

   HOW IT PLAYS. Each scene is plain markup whose parts are tagged with
   `data-hit` (something the cursor presses) or `data-type` (a field it
   types into). A scene's SCRIPT is a list of moments: at `t` ms the cursor
   arrives on a target, presses it, and the scene gains the class
   `on-<state>`. Everything that happens next (a button turning into
   "Connected", a column being masked, tests ticking) is CSS keyed off those
   classes, so the markup stays declarative and the timing lives here.

   The cursor is shared by all four scenes, so between steps it glides from
   where it last clicked to the next thing it needs. Moves and presses use
   the Web Animations API, positions are measured from the real elements, so
   the film stays in sync at any size.

   It only plays while the section is on screen (`running`). Under reduced
   motion (`still`) every state is applied at once and the cursor is hidden:
   each scene shows its finished frame. Styles are in steps.css. */

import { useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Check,
  Cloud,
  Database,
  FileCode2,
  FileSpreadsheet,
  FolderTree,
  GitMerge,
  KeyRound,
  Lock,
  Play,
  ScanSearch,
  ShieldCheck,
  Snowflake,
  Sparkles
} from 'lucide-react';

const EASE_MOVE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const TEMPO = 1.8; /* slower than real use, so the camera can follow */
const MOVE_MS = 650 * TEMPO;

/* ---------------------------------------------------------------- pieces */

function Btn({ hit, tone = 'ghost', icon: Icon, done, doneIcon: DoneIcon = Check, children }) {
  return (
    <span className={`v-btn is-${tone} ${done ? 'v-swap' : ''}`} data-hit={hit}>
      <span className="v-btn-a">
        {Icon && <Icon strokeWidth={2.2} />}
        {children}
      </span>
      {done && (
        <span className="v-btn-b">
          <DoneIcon strokeWidth={2.6} />
          {done}
        </span>
      )}
    </span>
  );
}

function Label({ children }) {
  return <span className="v-label">{children}</span>;
}

/* ------------------------------------------------------------ 1 · connect */

function Connect() {
  const sources = [
    { hit: 'c1', icon: Database, name: 'PostgreSQL', meta: 'orders_db · 2.1M rows' },
    { hit: 'c2', icon: FileSpreadsheet, name: 'orders.csv', meta: 'Daily export · SFTP' },
    { hit: 'c3', icon: Cloud, name: 'Salesforce', meta: 'Accounts · API' }
  ];
  return (
    <div className="v-split">
      <div className="v-col">
        <Label>Sources</Label>
        <div className="v-list">
          {sources.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.hit} className="v-row">
                <span className="v-ico">
                  <Icon strokeWidth={1.8} />
                </span>
                <span className="v-row-text">
                  <b>{s.name}</b>
                  <em>{s.meta}</em>
                </span>
                <Btn hit={s.hit} done="Connected">
                  Connect
                </Btn>
              </div>
            );
          })}
        </div>
        <Label>Describe the rule</Label>
        <div className="v-input" data-hit="rule">
          <span className="v-typed" data-type="rule" />
          <i className="v-caret" />
          <span className="v-ph">e.g. load daily orders into Snowflake…</span>
        </div>
        <div className="v-actions">
          <span className="v-hint">FRIEND asks follow-ups if anything is unclear</span>
          <Btn hit="gen" tone="primary" icon={Sparkles}>
            Generate pipeline
          </Btn>
        </div>
      </div>

      <div className="v-canvas">
        <Label>Pipeline preview</Label>
        <span className="v-empty">Your pipeline will appear here</span>
        <div className="v-flow">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {[25, 50, 75].map((y) => (
              <path key={y} d={`M22 ${y} C 36 ${y}, 36 50, 50 50`} />
            ))}
            <path d="M50 50 L 78 50" />
          </svg>
          {[
            { icon: Database, y: 25 },
            { icon: FileSpreadsheet, y: 50 },
            { icon: Cloud, y: 75 }
          ].map(({ icon: Icon, y }, i) => (
            <span key={y} className="v-node" style={{ left: '14%', top: `${y}%`, '--k': i }}>
              <Icon strokeWidth={1.8} />
            </span>
          ))}
          <span className="v-node is-hub" style={{ left: '50%', top: '50%', '--k': 3 }}>
            <Sparkles strokeWidth={1.8} />
          </span>
          <span className="v-node is-dest" style={{ left: '84%', top: '50%', '--k': 4 }}>
            <Snowflake strokeWidth={1.8} />
          </span>
          <span className="v-flow-tag" style={{ left: '84%', top: '66%' }}>
            analytics.orders
          </span>
          <span className="v-flow-rate">
            <i />
            12,480 rows / min
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 2 · privacy */

function Privacy() {
  const rows = [
    ['Ava Thompson', 'ava.t@northwind.com', 'a•••••@northwind.com', '+1 415 555 0142', '+1 ••• •••• 42', 'US'],
    ['Liam Patel', 'liam.p@contoso.io', 'l•••••@contoso.io', '+44 20 7946 0831', '+44 ••• •••• 31', 'UK'],
    ['Mia Chen', 'mia.chen@fabrikam.co', 'm•••••@fabrikam.co', '+1 212 555 0199', '+1 ••• •••• 99', 'US'],
    ['Noah Garcia', 'noah.g@adatum.com', 'n•••••@adatum.com', '+34 91 555 0107', '+34 ••• •••• 07', 'ES'],
    ['Zoe Martin', 'zoe.m@litware.com', 'z•••••@litware.com', '+33 1 55 55 0164', '+33 ••• •••• 64', 'FR']
  ];
  return (
    <div className="v-stack">
      <div className="v-toolbar">
        <span className="v-title">
          <FileSpreadsheet strokeWidth={1.8} />
          customers.csv
          <em>5 of 18,204 rows</em>
        </span>
        <span className="v-tools">
          <Btn hit="scan" icon={ScanSearch} done="2 PII columns" doneIcon={ScanSearch}>
            Scan for PII
          </Btn>
          <span className="v-toggle-wrap">
            <span className="v-toggle" data-hit="mask">
              <i />
            </span>
            Mask PII
          </span>
        </span>
      </div>

      <div className="v-table">
        <span className="v-tr is-head">
          <span>Customer</span>
          <span className="is-pii">
            Email <b>PII</b>
          </span>
          <span className="is-pii">
            Phone <b>PII</b>
          </span>
          <span>Country</span>
        </span>
        {rows.map((r, i) => (
          <span key={r[0]} className="v-tr" style={{ '--r': i }}>
            <span>{r[0]}</span>
            <span className="v-pii">
              <span className="raw">{r[1]}</span>
              <span className="masked">{r[2]}</span>
            </span>
            <span className="v-pii">
              <span className="raw">{r[3]}</span>
              <span className="masked">{r[4]}</span>
            </span>
            <span>{r[5]}</span>
          </span>
        ))}
        <i className="v-scan" />
      </div>

      <div className="v-cred">
        <span className="v-ico">
          <KeyRound strokeWidth={1.8} />
        </span>
        <span className="v-row-text">
          <b>Database password</b>
          <em className="v-secret">
            <span className="raw">Nw7!orders-prod</span>
            <span className="masked">••••••••••••••</span>
          </em>
        </span>
        <span className="v-proof">
          <ShieldCheck strokeWidth={2} />0 bytes of personal data sent to the model
        </span>
        <Btn hit="enc" tone="dark" icon={Lock} done="Encrypted on device" doneIcon={Lock}>
          Encrypt on device
        </Btn>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- 3 · build */

function Build() {
  const code = [
    [['k', 'MERGE INTO'], ['t', ' analytics.orders o']],
    [['k', 'USING'], ['t', ' staging.daily_orders s']],
    [['k', 'ON'], ['t', ' o.order_id = s.order_id']],
    [['k', 'WHEN MATCHED THEN UPDATE SET']],
    [['t', '  o.amount = s.amount, o.status = s.status']],
    [['k', 'WHEN NOT MATCHED THEN INSERT']],
    [['s', '  VALUES (s.order_id, s.amount, s.status);']]
  ];
  const tests = ['Schema matches target', 'No duplicate order_id', 'PII columns masked', 'Row counts reconcile'];
  const files = ['load_daily_orders.sql', 'test_orders.py', 'pipeline.yaml'];
  return (
    <div className="v-ide">
      <div className="v-files">
        <span className="v-files-head">
          <FolderTree strokeWidth={1.8} />
          friend/orders
        </span>
        {files.map((n, i) => (
          <span key={n} className={`v-file ${i === 0 ? 'is-on' : ''}`} style={{ '--k': i }}>
            <FileCode2 strokeWidth={1.8} />
            {n}
          </span>
        ))}
      </div>

      <div className="v-editor-col">
        <div className="v-toolbar">
          <span className="v-tab">
            <FileCode2 strokeWidth={1.8} />
            load_daily_orders.sql
          </span>
          <span className="v-tools">
            <Btn hit="gen2" icon={Sparkles} done="Generated in 38s">
              Generate code
            </Btn>
            <Btn hit="run" tone="primary" icon={Play}>
              Run tests
            </Btn>
          </span>
        </div>
        <div className="v-editor">
          {code.map((line, i) => (
            <span key={i} className="v-line" style={{ '--l': i }}>
              <em>{i + 1}</em>
              <span className="v-line-code">
                {line.map(([t, v], j) => (
                  <span key={j} className={`is-${t}`}>
                    {v}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </div>
        <div className="v-tests">
          <span className="v-tests-head">
            <b>Unit tests</b>
            <span className="v-pass">4 / 4 passed · 96% coverage</span>
          </span>
          <span className="v-tests-grid">
            {tests.map((t, i) => (
              <span key={t} className="v-test" style={{ '--t': i }}>
                <i>
                  <Check strokeWidth={3} />
                </i>
                {t}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- 4 · deploy */

function Deploy() {
  const checks = [
    ['Unit tests', '4 / 4 passed'],
    ['Privacy', 'PII masked on device'],
    ['Schema', 'Validated against target']
  ];
  const stages = ['Build', 'Verify', 'Production'];
  return (
    <div className="v-stack">
      <div className="v-pr-head">
        <span className="v-pr-icon">
          <GitMerge strokeWidth={2} />
        </span>
        <span className="v-row-text">
          <b>Load daily orders into Snowflake</b>
          <em>#482 · friend/load-daily-orders → main</em>
        </span>
        <span className="v-state">
          <span className="a">Open</span>
          <span className="b">Merged</span>
        </span>
      </div>

      <div className="v-split is-even">
        <div className="v-col">
          <Label>Checks</Label>
          <div className="v-list">
            {checks.map(([name, meta]) => (
              <div key={name} className="v-row is-check">
                <i className="v-tick">
                  <Check strokeWidth={3} />
                </i>
                <span className="v-row-text">
                  <b>{name}</b>
                  <em>{meta}</em>
                </span>
              </div>
            ))}
            <div className="v-row is-check is-review">
              <i className="v-tick">
                <Check strokeWidth={3} />
              </i>
              <span className="v-row-text">
                <b>Review</b>
                <em className="v-swap-text">
                  <span className="a">Waiting for approval</span>
                  <span className="b">Approved by 2 reviewers</span>
                </em>
              </span>
              <span className="v-avatars">
                <i>AK</i>
                <i>SR</i>
              </span>
            </div>
          </div>
          <div className="v-actions">
            <Btn hit="approve" icon={Check} done="Approved">
              Approve
            </Btn>
            <Btn hit="deploy" tone="primary" icon={ArrowUpRight} done="Deployed" doneIcon={Check}>
              Merge &amp; deploy
            </Btn>
          </div>
        </div>

        <div className="v-canvas is-deploy">
          <Label>Release</Label>
          <div className="v-stages">
            <span className="v-stage-track">
              <i />
            </span>
            {stages.map((s, i) => (
              <span key={s} className="v-stage" style={{ '--p': i }}>
                <i>
                  <Check strokeWidth={3} />
                </i>
                <b>{s}</b>
              </span>
            ))}
          </div>
          <div className="v-live">
            <span className="v-live-pill">
              <i />
              Live in production
            </span>
            <span className="v-rows">
              <b>1.2M</b>
              <em>rows loaded today</em>
            </span>
            <span className="v-bars">
              {[30, 42, 38, 55, 48, 62, 70, 66, 82, 94].map((h, i) => (
                <i key={i} style={{ height: `${h}%`, '--b': i }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- the script */

const SCENES = [
  { title: 'Connect data', Scene: Connect },
  { title: 'Privacy', Scene: Privacy },
  { title: 'Generate and test', Scene: Build },
  { title: 'Deploy', Scene: Deploy }
];

const RULE = 'Load daily orders into Snowflake, dedupe on order_id';

const SCRIPTS = [
  [
    { t: 900, hit: 'c1', state: 'c1' },
    { t: 1500, hit: 'c2', state: 'c2' },
    { t: 2100, hit: 'c3', state: 'c3' },
    { t: 3000, hit: 'rule', state: 'rule', type: ['rule', RULE] },
    { t: 6300, hit: 'gen', state: 'gen' }
  ],
  [
    { t: 1000, hit: 'scan', state: 'scan' },
    { t: 3500, hit: 'mask', state: 'mask' },
    { t: 5600, hit: 'enc', state: 'enc' }
  ],
  [
    { t: 1000, hit: 'gen2', state: 'gen2' },
    { t: 4400, hit: 'run', state: 'run' }
  ],
  [
    { t: 1200, hit: 'approve', state: 'approve' },
    { t: 3000, hit: 'deploy', state: 'deploy' }
  ]
];

/* Types `text` into `el` one character at a time, at an uneven, human
   rhythm; each character fades up out of a soft blur. Returns a stop. */
function typeInto(el, text, field) {
  el.textContent = '';
  field?.classList.add('is-typing');
  let i = 0;
  let timer = 0;
  const next = () => {
    if (i >= text.length) {
      field?.classList.remove('is-typing');
      return;
    }
    const ch = document.createElement('span');
    ch.className = 'ch';
    ch.textContent = text[i];
    el.appendChild(ch);
    const c = text[i];
    i += 1;
    const pause = (c === ',' ? 180 : c === ' ' ? 55 : 26 + ((i * 37) % 30)) * TEMPO;
    timer = window.setTimeout(next, pause);
  };
  next();
  return () => window.clearTimeout(timer);
}

export function MethodStage({ active, running = true, still = false, onFocus }) {
  const stage = useRef(null);
  const cursor = useRef(null);
  const pos = useRef(null);

  useEffect(() => {
    const root = stage.current;
    const cur = cursor.current;
    if (!root || !cur) return undefined;
    const scenes = [...root.querySelectorAll('.v-scene')];
    const scene = scenes[active];

    /* every scene back to its opening frame */
    scenes.forEach((s) => {
      [...s.classList].filter((c) => c.startsWith('on-')).forEach((c) => s.classList.remove(c));
      s.querySelectorAll('[data-type]').forEach((t) => (t.textContent = ''));
    });

    const script = SCRIPTS[active];
    const apply = (step) => {
      if (step.state) scene.classList.add(`on-${step.state}`);
    };

    if (still) {
      script.forEach((step) => {
        apply(step);
        if (step.type) {
          const el = scene.querySelector(`[data-type="${step.type[0]}"]`);
          if (el) el.textContent = step.type[1];
        }
      });
      return undefined;
    }
    if (!running) return undefined;

    /* Where a target is, in the stage's own pixels. The stage and the target
       are measured together, every time, so scrolling (or the stage being
       scaled by the card it sits in) can never leave the cursor aiming at a
       stale position; the ratio undoes any scale on the way in. */
    const target = (hit) => {
      const el = scene.querySelector(`[data-hit="${hit}"]`);
      if (!el) return null;
      const box = root.getBoundingClientRect();
      const k = root.offsetWidth / (box.width || 1);
      const r = el.getBoundingClientRect();
      return {
        el,
        x: (r.left - box.left + r.width * 0.62) * k,
        y: (r.top - box.top + r.height * 0.62) * k
      };
    };

    if (!pos.current) pos.current = { x: root.offsetWidth * 0.62, y: root.offsetHeight * 0.92 };
    cur.style.opacity = '1';
    cur.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    onFocus?.(null);

    const timers = [];
    const stops = [];
    script.forEach((step) => {
      timers.push(
        window.setTimeout(() => {
          const t = target(step.hit);
          if (!t) return;
          const from = pos.current;
          pos.current = { x: t.x, y: t.y };
          /* the camera follows: where the action is, as a fraction of the stage */
          onFocus?.({ x: t.x / root.offsetWidth, y: t.y / root.offsetHeight });
          cur.animate(
            [
              { transform: `translate3d(${from.x}px, ${from.y}px, 0)` },
              { transform: `translate3d(${t.x}px, ${t.y}px, 0)` }
            ],
            { duration: MOVE_MS, easing: EASE_MOVE, fill: 'forwards' }
          );
        }, Math.max(0, step.t * TEMPO - MOVE_MS - 60))
      );
      timers.push(
        window.setTimeout(() => {
          const t = target(step.hit);
          cur.querySelector('svg')?.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(0.82)' }, { transform: 'scale(1)' }],
            { duration: 260, easing: 'ease-out' }
          );
          cur.querySelector('i')?.animate(
            [
              { opacity: 0.9, transform: 'scale(0.2)' },
              { opacity: 0, transform: 'scale(1.5)' }
            ],
            { duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          );
          t?.el.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(0.95)' }, { transform: 'scale(1)' }],
            { duration: 240, easing: 'ease-out' }
          );
          apply(step);
          if (step.type) {
            const el = scene.querySelector(`[data-type="${step.type[0]}"]`);
            if (el) stops.push(typeInto(el, step.type[1], t?.el));
          }
        }, step.t * TEMPO)
      );
      /* after the click has landed (or the typing has run), the camera
         eases wide again, so the next move can zoom back in */
      timers.push(
        window.setTimeout(() => {
          const t = target(step.hit);
          if (t) onFocus?.({ x: t.x / root.offsetWidth, y: t.y / root.offsetHeight, wide: true });
        }, (step.t + (step.type ? 900 + step.type[1].length * 45 : 1100)) * TEMPO)
      );
    });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      stops.forEach((stop) => stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, running, still]);

  return (
    <div ref={stage} className="mstage" aria-hidden="true">
      <span className="mstage-grid" />
      <div className="win">
        <div className="win-bar">
          <span className="win-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="win-crumb">
            FRIEND <b className="win-app">AI Studio</b> <span>/</span> Daily orders to Snowflake <span>/</span>{' '}
            <b key={active}>{SCENES[active].title}</b>
          </span>
          <span className="win-user">
            <i>G</i>
          </span>
        </div>
        <div className="win-body">
          {SCENES.map(({ title, Scene }, i) => (
            <div key={title} className={`v-scene ${i === active ? 'is-on' : ''}`}>
              <Scene />
            </div>
          ))}
        </div>
      </div>
      <span ref={cursor} className="v-cursor">
        <svg viewBox="0 0 24 24">
          <path d="M5 3l14 7.5-6.2 1.6L9.6 18z" />
        </svg>
        <i />
      </span>
    </div>
  );
}

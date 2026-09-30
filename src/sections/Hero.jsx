/* The band at the very top, and the only part of the page that has to work
   in one screen.

   The words first: a one-line lead-in, the headline over two lines, the
   sentence and the two actions, on white with a mesh of the brand violets
   rising from the bottom edge. Under them the product: a laptop rising out
   of the bottom edge with the FRIEND AI workspace on its screen. Around it,
   four panels of proof overlapping its edges.

   The laptop stands up as it rises in; the panels arrive after it and then
   drift a few pixels on slow cycles. Nothing moves for anyone whose device
   asks for reduced motion. Styles are in hero.css. */

import { ArrowRight, ArrowUp, Check, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { Laptop } from '../components/artwork/Laptop.jsx';
import { Button } from '../components/ui/Button.jsx';
import { CERTS, HERO_FIGURES } from '../data/navigation.js';
import { WORKFLOW_AGENTS, WORKFLOW_OUTPUT } from '../data/workflow.js';

/* The FRIEND AI workspace, mid-conversation: the sidebar of chats, a
   request in plain English, FRIEND's questions back, and the build plan it
   has started running. Written as a still frame; nothing here is live. */
const CHATS = ['Daily orders to Snowflake', 'Sales CSV to Power BI', 'Pipeline failure alerts', 'Repeat-buyer model'];
const PLAN = [
  { icon: WORKFLOW_AGENTS[0].icon, name: 'Connect the orders feed', state: 'done' },
  { icon: WORKFLOW_AGENTS[1].icon, name: 'Generate the ETL job', state: 'done' },
  { icon: WORKFLOW_AGENTS[2].icon, name: 'Validate against schema', state: 'running' },
  { icon: WORKFLOW_OUTPUT.icon, name: 'Open the pull request', state: 'queued' }
];

function Screen() {
  return (
    <div className="scr" aria-hidden="true">
      <aside className="scr-side">
        <span className="scr-logo">FRIEND</span>
        <span className="scr-new">
          <Plus strokeWidth={2.4} />
          New chat
        </span>
        <span className="scr-label">Recent</span>
        {CHATS.map((c, i) => (
          <span key={c} className={`scr-chat ${i === 0 ? 'is-on' : ''}`}>
            {c}
          </span>
        ))}
      </aside>
      <div className="scr-main">
        <div className="scr-head">
          <span className="scr-avatar">
            <Sparkles strokeWidth={2} />
          </span>
          <span>
            <b>FRIEND AI</b>
            <em>Data Engineering agent</em>
          </span>
          <span className="scr-live">
            <i />
            Building
          </span>
        </div>
        <div className="scr-thread">
          <p className="scr-msg is-user">
            I need an ETL that loads our daily orders CSV into Snowflake
          </p>
          <div className="scr-msg is-ai">
            <p>Got it. Two quick questions before I build:</p>
            <span className="scr-ask">
              <Check strokeWidth={3} />
              Load time: <b>06:00 UTC daily</b>
            </span>
            <span className="scr-ask">
              <Check strokeWidth={3} />
              PII columns: <b>mask email and phone</b>
            </span>
          </div>
          <div className="scr-plan">
            <span className="scr-plan-head">
              <span>Build plan</span>
              <span>2 of 4</span>
            </span>
            {PLAN.map((p) => {
              const Icon = p.icon;
              return (
                <span key={p.name} className={`scr-step is-${p.state}`}>
                  <Icon strokeWidth={2} />
                  {p.name}
                  <em>{p.state === 'done' ? 'Done' : p.state === 'running' ? 'Running' : 'Queued'}</em>
                </span>
              );
            })}
          </div>
          <p className="scr-msg is-ai">
            Schema checks passing on 1.2M rows. I&rsquo;ll open the pull request for review as
            soon as validation finishes.
          </p>
          <span className="scr-typing">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="scr-input">
          <span>Describe the problem to solve</span>
          <i>
            <ArrowUp strokeWidth={2.6} />
          </i>
        </div>
      </div>
    </div>
  );
}

/* The four panels around the laptop. Each has a place (`slot`) and a delay. */
function Panels() {
  const [speed, saved, audit] = HERO_FIGURES;
  return (
    <div className="panels" aria-hidden="true">
      <div className="panel slot-tl" style={{ '--d': '1.15s', '--f': '0s' }}>
        <span className="panel-figure">{speed.figure}</span>
        <span className="panel-label">{speed.label}</span>
      </div>
      <div className="panel slot-bl" style={{ '--d': '1.3s', '--f': '-3s' }}>
        <span className="panel-row">
          <ShieldCheck strokeWidth={1.8} />
          <span>
            <span className="panel-name">Privacy shield</span>
            <span className="panel-label">PII masked before any model call</span>
          </span>
        </span>
      </div>
      <div className="panel slot-tr" style={{ '--d': '1.22s', '--f': '-5s' }}>
        <span className="panel-figure">{audit.figure}</span>
        <span className="panel-label">{audit.label}</span>
      </div>
      <div className="panel slot-br" style={{ '--d': '1.38s', '--f': '-7s' }}>
        <span className="panel-name">{saved.figure} {saved.label.toLowerCase()}</span>
        <span className="panel-certs">
          {CERTS.map((c) => (
            <span key={c}>
              <Check strokeWidth={3} />
              {c.replace(' Certified', '').replace(' Compliant', '')}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function Hero({ openContact, navAction }) {
  return (
    <section id="overview" className="hero-frame">
      <div className="hero">
      <div aria-hidden="true" className="hero-ground" />

      <div className="hero-stage">
        <div className="hw">
          <p className="hw-kicker">
            <span className="hero-rise" style={{ '--d': '0ms' }}>
              Enterprise AI automation, auditable by design
            </span>
          </p>

          <h1 className="hl">
            <span className="hl-line">
              <span className="hl-mask">
                <span className="hl-rise" style={{ '--d': '60ms' }}>
                  Build &amp; Deploy <span className="hl-accent">Governed</span>
                </span>
              </span>
            </span>
            <span className="hl-line">
              <span className="hl-mask">
                <span className="hl-rise" style={{ '--d': '150ms' }}>
                  Data &amp; AI Workflows in Minutes
                </span>
              </span>
            </span>
          </h1>

          <p className="hw-body">
            <span className="hero-rise" style={{ '--d': '380ms' }}>
              No manual coding required. A repeatable method for automating code generation,
              data workflows, and production deployment, with a full audit trail at every step
            </span>
          </p>

          <div className="hw-actions">
            <span className="hero-rise" style={{ '--d': '480ms' }}>
              <span className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="teal" onClick={openContact} className="hero-cta group">
                  Talk to our team
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
                    strokeWidth={2.2}
                  />
                </Button>
                <button type="button" onClick={navAction('Applications')} className="hero-link group">
                  Explore applications
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* The product. The horizon glows behind the laptop; the laptop's lower
          part runs off the bottom of the band. */}
      <div className="hero-scene">
        <Laptop>
          <Screen />
        </Laptop>
        <Panels />
      </div>
      </div>
    </section>
  );
}

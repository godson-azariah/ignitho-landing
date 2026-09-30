/* Solutions (section 3), drawn as what the copy says: industry applications
   are built on the foundations. The six industries stand as tiles on top
   of three full-width layers, one per foundation, each layer carrying its
   suite's name and line. Each family keeps its heading, its line and its
   one way in, the catalogue filtered to it, in a rail on the left of its
   row. Styles in solutions.css. */

import { FadeIn } from '../components/ui/FadeIn.jsx';
import { SUITES } from '../data/suites.js';
import { SHELL } from '../lib/layout.js';

const INDUSTRY = {
  id: 'INDUSTRY',
  label: 'Industry Applications',
  cta: 'Explore applications',
  title: 'Apply the method to real industries',
  body: 'Industry-focused applications built on the same governed method, covering healthcare, financial services, retail and more'
};
const FOUNDATION = {
  id: 'FOUNDATION',
  label: 'Foundation',
  cta: 'Explore capabilities',
  title: 'Build faster. Automate smarter',
  body: 'Core capabilities that solve reusable enterprise problems across data engineering, analysis, quality, analytics and AI workflows'
};

function Rail({ group, onPick }) {
  return (
    <div className="st-rail">
      <span className="st-label">{group.label}</span>
      <h3 className="st-rail-title">{group.title}</h3>
      <p className="st-rail-body">{group.body}</p>
      <button type="button" onClick={() => onPick(group.id)} className="st-cta">
        {group.cta}
      </button>
    </div>
  );
}

export function Solutions({ onPickGroup }) {
  const industries = SUITES.filter((s) => s.type === 'industry');
  const foundations = SUITES.filter((s) => s.type === 'foundation');
  return (
    <section id="solutions" className="st bg-c dots">
      <div className={SHELL}>
        <FadeIn className="st-head plate">
          <h2 className="st-title">Solutions that scale with your ambition</h2>
          <p className="st-lede">
            From core method to industry application: foundational capabilities power reusable,
            industry-specific automation through one governed framework
          </p>
        </FadeIn>

        <div className="st-rows">
          <FadeIn className="st-row is-industry">
            <Rail group={INDUSTRY} onPick={onPickGroup} />
            <ul className="st-tiles">
              {industries.map((s, i) => (
                <li key={s.id} style={{ '--i': i }}>
                  {s.name}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={90} className="st-row is-foundation">
            <Rail group={FOUNDATION} onPick={onPickGroup} />
            <ul className="st-layers">
              {foundations.map((s, i) => (
                <li key={s.id} style={{ '--i': i }}>
                  <b>{s.name}</b>
                  <span>{s.tagline}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

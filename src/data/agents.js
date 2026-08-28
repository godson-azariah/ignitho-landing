/* The named accelerators shown in their own band on the home page.

   Built FROM the suite list rather than typed out again. Every accelerator on
   this page therefore exists inside a real suite, its badge names the suite it
   came from, and pressing it searches for a term that cannot come back empty.
   A hand-written list drifts the first time a suite is renamed; this one
   cannot.

   `SHOWCASE` picks which ones appear and in what order. Everything else about
   them — the name, the description, the icon — comes from the suite itself. */

import { SUITES } from './suites.js';

/* Two from each foundation suite and one from each vertical, which is what
   fills three rows of three without the row reading as one suite's shopping
   list. Named rather than sliced, so the choice is deliberate and visible. */
const SHOWCASE = [
  'Data Ingestion Nexus',
  'Golden Record Prime',
  'Security Filtering',
  'ETL Nexus',
  'SQL Forge',
  'Cost-Aware Routing',
  'Pipeline Architect',
  'Recovery Phoenix',
  'Output Verification'
];

/* The suite each one belongs to, with its icon and a short badge */
const byName = new Map();
for (const suite of SUITES) {
  for (const accelerator of suite.accelerators) {
    byName.set(accelerator.name, { suite, accelerator });
  }
}

export const NAMED_AGENTS = SHOWCASE.map((name, i) => {
  const hit = byName.get(name);
  if (!hit) return null;
  return {
    n: String(i + 1).padStart(2, '0'),
    icon: hit.suite.icon,
    name: hit.accelerator.name,
    badge: hit.accelerator.type,
    desc: hit.accelerator.desc,
    /* the accelerator's own name is always findable: the catalogue searches
       accelerator names as well as suite names */
    search: hit.accelerator.name
  };
}).filter(Boolean);

/* What the count line says. Read from the suites rather than typed, so it is
   right on the day someone adds a tenth accelerator. */
export const TOTAL_ACCELERATORS = SUITES.reduce((n, s) => n + s.accelerators.length, 0);

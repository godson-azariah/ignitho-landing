/* The harness diagram: business intent goes in, four agents work around a
   governed middle, a checked pull request comes out.

   Words and icons only. The drawing is in HarnessDiagram.jsx, and it carries no
   per-agent colours any more — the picture runs on one violet light and a
   single teal at the end, which is the whole of its palette. Four coloured
   chips is what a template does; light of one colour falling across everything
   is what the good ones do. */

import {
  Code2,
  Database,
  BadgeCheck,
  ShieldCheck,
  Target,
  GitPullRequest
} from 'lucide-react';

/* The two ends of the run */
export const WORKFLOW_INTENT = {
  icon: Target,
  name: 'Business Intent',
  role: 'Turn requirements into production-ready workflows'
};

export const WORKFLOW_OUTPUT = {
  icon: GitPullRequest,
  name: 'Validated Output',
  role: 'From business intent to tested deployment'
};

/* The four agents, in the order the work passes through them — which is also
   left to right in the drawing, because they hang off the harness in one row.

   The lines under the names are kept to three words. They sit in a column about
   a hundred pixels wide, and anything longer takes three lines there while its
   neighbours take one, which is what makes a row of four look uneven. */
export const WORKFLOW_AGENTS = [
  { n: '01', icon: Database, name: 'Foundation', role: 'Connect and prepare data' },
  { n: '02', icon: Code2, name: 'Engineering', role: 'Generate production code' },
  { n: '03', icon: BadgeCheck, name: 'Integrity', role: 'Validate and ensure quality' },
  { n: '04', icon: ShieldCheck, name: 'Network', role: 'Security, compliance and audit' }
];

/* What sits in the middle, holding the four together. The long line is back:
   it was cut to two words when the circle was 210 across and it broke there,
   stranding its last word on a line of its own. The circle is 280 now, which
   holds all three terms on one line with room to spare. */
export const WORKFLOW_CORE = {
  name: 'Orchestration',
  role: 'Plan · Generate · Validate'
};

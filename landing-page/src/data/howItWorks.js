import { FlaskConical, LineChart, MousePointerClick, Rocket } from 'lucide-react';

/* The four steps, and every one of them is something the page already claims
   somewhere else — this section is a summary, not a new set of promises:

     01  the catalogue's own split, "3 Universal Foundations" and
         "6 Industry Verticals", straight off the filter above
     02  the badge on every accelerator row of a suite page, "Governed DAG
         Ready", and the button beside it that simulates a run
     03  `pillars.js`, verbatim in substance: "Pre-built modular accelerators
         deploy in days rather than custom multi-month projects"
     04  the callout on all nine suite cards, "Measured target ROI", and the
         calculator that sits directly above this section

   Nothing here introduces a figure, a certification or a capability that is
   not already on the page. */
export const HOW_IT_WORKS = [
  {
    id: 'pick',
    icon: MousePointerClick,
    /* "Choose", not "Pick" — the closing call to action already opens with
       "Pick one workflow", and two prominent imperatives sharing a verb read
       as the page repeating itself rather than as two separate asks. */
    title: 'Choose the suite',
    body: 'Search the catalogue and take one of three universal foundations or six industry verticals. Nothing gets scoped from scratch'
  },
  {
    id: 'test',
    icon: FlaskConical,
    title: 'Test the agent',
    body: 'Every accelerator arrives as a governed DAG. Simulate a run end to end before it touches a production system'
  },
  {
    id: 'deploy',
    icon: Rocket,
    title: 'Deploy in days',
    body: 'Pre-built modular accelerators go live in days rather than the multi-month cycle a custom build asks for'
  },
  {
    id: 'measure',
    icon: LineChart,
    title: 'Measure the return',
    body: 'Each suite carries a measured target, and the calculator above already put a figure against your own headcount'
  }
];

/* How long a step holds before the next one takes over. The entrance sequence
   below finishes around 1.2s, so this leaves roughly four and a half seconds
   of stillness — long enough to read the body copy without turning the
   section into something you have to wait on. Shared with the dwell meter in
   `motion.css`, which is why it is a number here rather than a CSS literal. */
export const DWELL_MS = 5600;

/* The four steps, and how long each one holds before the next takes over.

   Nothing in these steps is a new claim; each one repeats something the page
   already says elsewhere. The dwell time is a number here rather than in the
   style file because the countdown ring reads the same value, and the two must
   agree. */

import { Cpu, GitPullRequest, Plug, ShieldCheck } from 'lucide-react';

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
    id: "connect",
    icon: Plug,
    title: "Connect data and specify rules",
    body: "Select your data source and state your transformation rules in plain English"
  },
  {
    id: "lock",
    icon: ShieldCheck,
    title: "Lock credentials and privacy",
    body: "Database passwords, customer names and PII are encrypted on your own device"
  },
  {
    id: "generate",
    icon: Cpu,
    title: "Code generation and testing",
    body: "The method writes production code and runs automated unit tests"
  },
  {
    id: "ship",
    icon: GitPullRequest,
    /* THREE WORDS, NOT TWO, AND THAT IS THE WHOLE OF THE FIX.

       The stage cards reserve two lines for a title so every body starts on the
       same row. Three of the four fill both lines; this one filled one, which
       left an empty line inside its card — a 43-pixel gap between title and body
       against 16 in the other three, and the only visible hole in the row.

       No layout can close it. "One-click deployment" is two words: it is one
       line, or it is two lines of one word each, and a word alone on a line is
       the thing the balancing was there to prevent. A third word is the only
       way, and it sets as "One-click deployment" over "to production" — the
       original phrase intact on the first line, and nothing orphaned on the
       second. */
    title: "One-click deployment to production",
    body: "Deploys clean, validated code directly to your repository"
  }
];

/* How long a step holds before the next one takes over. The entrance sequence
   below finishes around 1.2s, so this leaves roughly four and a half seconds
   of stillness — long enough to read the body copy without turning the
   section into something you have to wait on. Shared with the dwell meter in
   `motion.css`, which is why it is a number here rather than a CSS literal. */
export const DWELL_MS = 5600;

/* The four violet cards on the home page: number, icon, title, sentence and
   the green target line.

   The colour they all share is here too. They used to have one each, which
   made them look like four categories instead of four results of one thing. */

import { Database, ShieldCheck, Cpu, MessagesSquare } from 'lucide-react';

/* The four reasons, for the comparison row. */

/* One fill for all four cards, and it is a constant rather than the same
   string written out four times — four copies of a colour are four chances for
   three of them to be updated.

   The stack used to step down the violet→blue family, a flat depth per card:
   violet, violet-800, violet-600, blue-deep. It read as four categories, which
   is not what these are — they are four outcomes of one thing, and the ONLY
   difference between the cards worth seeing is what each one says. One fill
   makes the row a set.

   #4A12B8 is the third card's colour, kept because it is the one in the middle
   of the range the four used to span: dark enough to hold white type at 11.4:1,
   light enough that four of them in a row do not read as a wall. Teal still
   appears on the target line alone — the "positive outcome" signal. */
export const OUTCOME_CARD_COLOUR = 'bg-ig-violet-600';

export const OUTCOMES = [
  {
    n: "01",
    icon: Database,
    kicker: "Universal ingestion and transformation",
    title: "Privacy shield",
    body: "Sensitive data is never sent to an external model unprotected, and personal identifying information is detected and handled automatically",
    points: [
      "Self-healing automation that spots schema drifts and broken pipelines",
      "One set of figures across AWS, Azure, GCP and Snowflake"
    ],
    target: "10x faster pipeline speed"
  },
  {
    n: "02",
    icon: ShieldCheck,
    kicker: "Compliance and security shield",
    title: "HIPAA ready, GDPR aligned",
    body: "Meets the handling standards healthcare data requires, and the standards EU data protection requires",
    points: [
      "Full masking of personal data, with no leakage to a model",
      "Audit trails that match HIPAA, SOC 2 and GDPR",
      "Live cost routing, so model spend cannot run past its budget"
    ],
    target: "100% privacy shielded"
  },
  {
    n: "03",
    icon: Cpu,
    kicker: "DevOps and pipeline automation",
    title: "Immutable audit trails",
    body: "Every action is logged in a record that cannot be altered after the fact",
    points: [
      "Unit tests run before a pull request is opened",
      "Legacy Oracle PL/SQL and SAS translated into Snowflake SQL",
      "Manual engineering workload down by up to 60%"
    ],
    target: "60% engineering cost reduction"
  },
  {
    n: "04",
    icon: MessagesSquare,
    kicker: "Plain-English data intelligence",
    title: "Role-based access",
    body: "Who can see or change what is enforced automatically by policy, at every stage of the method",
    points: [
      "Plain-English questions turned straight into SQL",
      "Charts and dashboards that update as the numbers do",
      "No more spreadsheets compiled by hand, and no typing errors"
    ],
    target: "Reports in seconds"
  }
];

/* The six marks the platform is held to, shown as a row under the four cards.

   Labels, not claims: each names a standard or a control that either applies or
   does not. They sit apart from the cards above them for that reason. */
export const COMPLIANCE_MARKS = [
  'Zero-LLM privacy shield',
  'PII protection',
  'HIPAA ready',
  'GDPR aligned',
  'Immutable audit trails',
  'Role-based policy controls'
];

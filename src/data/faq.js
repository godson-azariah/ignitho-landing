/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE QUESTIONS AND ANSWERS

   WHERE YOU SEE THIS
     The questions page, reached from FAQ in the menu bar.

   WHAT IS IN HERE
     · The questions, grouped by subject, each with its answer.

   WORTH KNOWING
     EDIT THE FAQ HERE. Adding a question is one entry in a list; the
     page picks it up with no other change.
   ========================================================================== */

/* Placeholder answers, and every one is assembled from something the site
   already says out loud — the catalogue's split, the badge on the accelerator
   rows, `pillars.js`, the calculator's constants and basis line, the
   certifications in the footer, and the chat widget's canned replies. Nothing
   here introduces a figure, a product name or a capability that is not already
   on a page a reader can check.

   That is the point of writing them this way rather than inventing plausible
   ones: when the real copy arrives it replaces this file, and until then nothing
   on the FAQ page contradicts anything on the site.

   Grouped, because eleven questions in one column is a list rather than a
   reference — and the groups are the three things people actually arrive
   wanting: what the thing is, how it lands, and who is accountable for it. */
export const FAQ_GROUPS = [
  {
    id: 'what',
    title: 'What it is',
    items: [
      {
        q: 'What is an AI suite?',
        a: 'A packaged set of accelerators covering one domain. There are nine: three universal foundations that any enterprise runs on, and six built for a specific industry. You take a suite rather than commissioning one'
      },
      {
        q: 'What is an accelerator?',
        a: 'A single automated workflow inside a suite. Each one arrives as a governed DAG, and every suite page carries a simulator that runs one end to end so you can watch the steps before anything touches a production system'
      },
      {
        q: 'What does “governed DAG” mean?',
        a: 'The shape an accelerator executes as — a fixed graph of steps rather than an open-ended conversation. Domain rules and policy guardrails are applied as it runs, which is what the execution stream in the simulator is reporting'
      },
      {
        q: 'How is this different from a chat assistant?',
        a: 'A chat assistant waits to be prompted and produces an answer. These are pre-built workflows that execute an operation, the same way each time, with the guardrails applied whether anyone is watching or not'
      }
    ]
  },
  {
    id: 'deploy',
    title: 'Getting it live',
    items: [
      {
        q: 'How long does deployment take?',
        a: 'Days rather than the multi-month cycle a custom build asks for. The accelerators are pre-built and modular, so the work is configuration and connection rather than engineering from scratch'
      },
      {
        q: 'Do we have to build anything ourselves?',
        a: 'No. Every suite in the catalogue already exists in full. The first conversation is about which of your processes to point one at, not about scoping a build'
      },
      {
        q: 'Can we start with a single workflow?',
        a: 'Yes, and it is the normal way in. One accelerator from one suite is a complete starting point — the rest of the suite is there when the first one has proved itself'
      },
      {
        q: 'Which industries are covered?',
        a: 'Six verticals today: healthcare and pharma, supply chain and procurement, retail and customer growth, logistics and fleet operations, banking and financial services, and digital growth and brand protection. The three foundation suites sit underneath all of them'
      }
    ]
  },
  {
    id: 'trust',
    title: 'Governance and return',
    items: [
      {
        q: 'How is our data governed?',
        a: 'Ignitho AI is ISO 27001 certified and SOC2 Type II compliant. The Fortress security firewall prevents data leaks, prompt attacks and PII violations automatically rather than by policy alone'
      },
      {
        q: 'How is the return measured?',
        a: 'Every suite carries a measured target rather than a general promise. The calculator on the home page works from 320 dollars saved per employee each year, on a basis of 60% routine workflow reduction'
      },
      {
        q: 'Does this reduce our AI cloud spend?',
        a: 'CostPilot routing cuts AI cloud API spending by up to 40% by sending each call to the model that can actually serve it, rather than sending everything to the largest one available'
      }
    ]
  }
];

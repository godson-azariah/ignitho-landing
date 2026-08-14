import { TrendingUp, DollarSign, ShieldCheck, Clock } from 'lucide-react';

/* The four reasons, for the comparison row. */

/* ONE FILL FOR ALL FOUR CARDS, and it is a constant rather than the same
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
export const PILLAR_BG = 'bg-ig-violet-600';

export const PILLARS = [
  {
    n: '01',
    icon: TrendingUp,
    title: 'Revenue Acceleration',
    body: 'Shortens proposal turnaround from 4 days to 45 minutes and boosts sales close rates',
    target: 'Target: +18% Sales Win Rate'
  },
  {
    n: '02',
    icon: DollarSign,
    title: 'Cost Reduction',
    body: 'Automates accounts payable and data pipelines, slashing routine operational overhead',
    target: 'Target: 60%–80% Overhead Savings'
  },
  {
    n: '03',
    icon: ShieldCheck,
    title: 'Corporate Governance',
    body: 'Embedded AI firewalls prevent hallucinations and data privacy leaks automatically',
    target: 'Target: 100% Policy Compliance'
  },
  {
    n: '04',
    icon: Clock,
    title: 'Rapid Deployment',
    body: 'Pre-built modular accelerators deploy in days rather than custom multi-month projects',
    target: 'Target: Deploys in Days'
  }
];

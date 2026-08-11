import { TrendingUp, DollarSign, ShieldCheck, Clock } from 'lucide-react';

/* The four reasons, for the comparison row. */
/* The stack steps down the violet→blue family — four FLAT depths, no blends.
   Teal appears only on the target line: the "positive outcome" signal. */
export const PILLARS = [
  {
    n: '01',
    icon: TrendingUp,
    title: 'Revenue Acceleration',
    body: 'Shortens proposal turnaround from 4 days to 45 minutes and boosts sales close rates',
    target: 'Target: +18% Sales Win Rate',
    bg: 'bg-ig-violet'
  },
  {
    n: '02',
    icon: DollarSign,
    title: 'Cost Reduction',
    body: 'Automates accounts payable and data pipelines, slashing routine operational overhead',
    target: 'Target: 60%–80% Overhead Savings',
    bg: 'bg-ig-violet-800'
  },
  {
    n: '03',
    icon: ShieldCheck,
    title: 'Corporate Governance',
    body: 'Embedded AI firewalls prevent hallucinations and data privacy leaks automatically',
    target: 'Target: 100% Policy Compliance',
    bg: 'bg-ig-violet-600'
  },
  {
    n: '04',
    icon: Clock,
    title: 'Rapid Deployment',
    body: 'Pre-built modular accelerators deploy in days rather than custom multi-month projects',
    target: 'Target: Deploys in Days',
    bg: 'bg-ig-blue-deep'
  }
];

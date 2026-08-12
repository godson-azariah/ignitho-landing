/* Everything that names a destination or a filter. Kept apart from the suite
   catalogue because it changes for different reasons and at a different pace. */

import { BadgeCheck, Boxes, HeartPulse, ShieldCheck, Truck, Workflow } from 'lucide-react';

export const NAV_LINKS = ['Overview', 'ROI Calculator', '9 Core Suites'];

export const TABS = [
  { id: 'ALL', label: 'All 9 Suites' },
  { id: 'FOUNDATION', label: '3 Universal Foundations' },
  { id: 'INDUSTRY', label: '6 Industry Verticals' }
];

export const CERTS = ['ISO 27001 Certified', 'SOC2 Type II', 'HIPAA Compliant'];

/* The starting points offered under the hero's search field.

   Every one of these was checked against the catalogue rather than chosen for
   how it reads: the search matches a suite's name, tagline and executive
   summary, and each term below returns at least one suite. A suggestion chip
   that lands on an empty result is worse than no chip at all — it teaches the
   reader that the search does not work. Counts today, in order: 2, 3, 1, 1,
   1, 2.

   `label` is what the chip says; `term` is what it searches for. They are the
   same today, but keeping them apart means a chip can be phrased for a reader
   later without silently changing which suites it returns. */
export const SEARCH_SUGGESTIONS = [
  { label: 'Governance', term: 'Governance', icon: ShieldCheck },
  { label: 'Compliance', term: 'Compliance', icon: BadgeCheck },
  { label: 'Supply chain', term: 'Supply Chain', icon: Boxes },
  { label: 'Healthcare', term: 'Healthcare', icon: HeartPulse },
  { label: 'Automation', term: 'Automation', icon: Workflow },
  { label: 'Logistics', term: 'Logistics', icon: Truck }
];

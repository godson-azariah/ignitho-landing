/* Menu labels, the sign-in address, the filter buttons, the search suggestions
   under the hero field, the industry list for the contact form, and the
   certifications.

   The top bar, the phone menu and the footer all read the same list of
   destinations, so a menu item is added once.

   CONTACT_ENDPOINT is where the contact form posts, and it is deliberately
   empty. A form that thanks you and drops the message is worse than one that
   admits it cannot send. */

/* Everything that names a destination or a filter. Kept apart from the suite
   catalogue because it changes for different reasons and at a different pace. */

import { BadgeCheck, Boxes, HeartPulse, ShieldCheck, Truck, Workflow } from 'lucide-react';

/* In page order, which is the only order a set of scroll destinations can
   sensibly be in: the calculator, the catalogue, then the walkthrough that sits
   between the catalogue and the closing band at the very top or very bottom.

   "OVERVIEW" Has gone, AND IT was doing nothing. It mapped to `goHome`, which
   sets the open suite to null — so from a suite page it worked, and from the
   index, where the value was already null, React saw no state change, re-rendered
   nothing, and the effect that scrolls to the top never ran. A destination that
   silently does nothing four times out of five is worse than no destination.

   Nothing is lost by removing it: the Ignitho AI name beside it already calls the same
   `goHome`, and that is the conventional place to look for "back to the start"
   anyway. Every label that remains has a real section id behind it.

   One list, three consumers — the top bar, the menu sheet and the footer's
   "Menu" column all map over this, so a destination is added once. */
/* Named, because two components have to agree on it and a bare string in both
   is a rename waiting to go half-finished: the top bar lifts this one label out
   of the centred group and renders it beside the actions, so it has to be able
   to identify it. The menu sheet and the footer take the list whole. */
export const FAQ_LABEL = 'FAQ';

export const NAV_LINKS = ['ROI Calculator', '9 Core Suites', 'How It Works', FAQ_LABEL];

/* The product itself, which is a separate application on its own host. Kept
   here beside the destinations rather than inline in the two components that
   link to it, so the top bar and the menu sheet cannot drift apart. */
export const SIGN_IN_URL = 'https://ignitho-login.vercel.app/';

/* THE contact form's industry options — the supplied list, verbatim and in its
   own order.

   Which means alphabetical with "Other" sitting between "Oil & Gas" and
   "Professional Services" rather than pinned to the end. That looks like a
   mistake and is not one: it is where a straight A-to-Z sort puts it, the source
   list has it there, and moving it would be me quietly disagreeing with the
   thing I was given.

   Note the deliberate near-duplicates — Banking alongside Financial Services,
   Healthcare alongside Healthcare & Life Sciences. They are not redundant: a
   retail bank and an asset manager do not pick the same option, and a hospital
   group and a pharmaceutical company do not either. Collapsing them would lose
   the distinction that made someone write both. */
export const CONTACT_INDUSTRIES = [
  'Airlines',
  'Automotive',
  'Banking',
  'CPG',
  'Digital & Creative Agency',
  'EdTech',
  'Education',
  'Energy',
  'Entertainment',
  'Financial Services',
  'Gaming',
  'Healthcare',
  'Healthcare & Life Sciences',
  'Hospitality',
  'Insurance',
  'Logistics',
  'Manufacturing',
  'Marketing & Advertising',
  'Media',
  'Mining',
  'Oil & Gas',
  'Other',
  'Professional Services',
  'Public Sector',
  'Retail',
  'Sports',
  'Technology',
  'Telecommunications',
  'Utilities'
];

/* Every country, re-exported so the dialog has one import for its option lists.
   The list itself lives in `countries.js` — 190-odd entries of pure data that
   would have buried the rest of this file. */
export { COUNTRIES as CONTACT_COUNTRIES } from './countries.js';

/* Where THE form posts — AND IT posts nowhere yet.

   Deliberately `null` rather than a placeholder URL. With no endpoint the dialog
   validates, then says plainly that it cannot send and offers the address
   instead; it does NOT show a thank-you. A form that accepts a lead, thanks the
   sender and drops it on the floor is worse than no form, and a fake endpoint
   would produce exactly that the moment it 404ed.

   Set this to a real handler — a form service, an API route, anything that takes
   a POST of JSON — and the dialog switches to the sent state on its own. */
export const CONTACT_ENDPOINT = null;
export const CONTACT_EMAIL = 'info@ignitho.com';

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

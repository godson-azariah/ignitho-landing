/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE WORDS FOR ALL NINE SUITES

   WHERE YOU SEE THIS
     The nine cards in the catalogue and every one of the nine suite
     pages. This is the biggest single piece of writing on the site.

   WHAT IS IN HERE
     · For each suite: its name, its tagline, whether it is a foundation
       or an industry vertical, its executive summary, its figures, its
       photograph, and every accelerator listed on its page.

   WORTH KNOWING
     EDIT SUITE WORDING HERE. There is no layout in this file, so
     changing the text cannot break anything visually — though much
     longer text will wrap differently on the cards.
   ========================================================================== */

import {
  Database,
  BarChart3,
  BrainCircuit,
  Pill,
  Truck,
  ShoppingBag,
  Megaphone,
  Landmark,
  Compass
} from 'lucide-react';

/* The nine suites. Content only — nothing here knows how it is rendered, which
   is what lets the catalog, the dossier and the footer directory all read from
   one source. `icon` holds the component itself rather than a name, so a typo
   is a build error instead of a blank space. */
export const SUITES = [
  {
    id: 'data-engineering',
    number: '01',
    name: 'Enterprise Data Foundation Suite',
    type: 'foundation',
    icon: Database,
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    gradient: 'from-blue-600 to-indigo-600',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Connect Siloed Enterprise Data & Automate Real-Time Reporting',
    executiveSummary: `Connects multi-cloud databases, legacy software, and business APIs into an automated, auto-healing pipeline that guarantees 99.9% data availability for executive decisions`,
    businessImpact: 'Slashes manual data gathering costs by 60% and speeds up executive decision-making from weeks to seconds',
    outcomes: [
      'Zero manual effort required to compile executive reports',
      'Single-source-of-truth metrics across all departments',
      'Self-healing automation that prevents system downtime'
    ],
    subDomains: ['Automated Ingestion', 'Smart Data Mapping', 'Self-Healing Pipelines'],
    accelerators: [
      { name: 'Data Ingestion Nexus', type: 'Data Connector', desc: 'Connects multi-cloud databases into a real-time data stream effortlessly' },
      { name: 'ETL Nexus', type: 'Pipeline Automation', desc: 'Automates extraction and database loading without manual intervention' },
      { name: 'SQL Forge', type: 'Plain English Querying', desc: 'Translates plain English questions into optimized ANSI SQL queries instantly' },
      { name: 'Pipeline Architect', type: 'DAG Builder', desc: 'Visually constructs dynamic data processing pipelines with built-in error handling' },
      { name: 'Recovery Phoenix', type: 'Auto-Healing Agent', desc: 'Detects broken feeds and retries failed pipeline steps with zero downtime' }
    ]
  },
  {
    id: 'data-quality',
    number: '02',
    name: 'Enterprise Data Trust and Governance Suite',
    type: 'foundation',
    icon: BarChart3,
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    gradient: 'from-indigo-600 to-violet-600',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Guaranteed Single Source of Truth for Boardroom Decisions',
    executiveSummary: `Cleans dirty datasets, eliminates duplicate client files, and enforces 100% data governance compliance across all company systems automatically`,
    businessImpact: 'Boosts decision accuracy by 85% and eliminates expensive manual data cleanup work',
    outcomes: [
      'Creates 360° Master Golden Records for clients and suppliers',
      'Prevents costly shipping, billing, and regulatory filing errors',
      'Ensures full data audit readiness for executive board review'
    ],
    subDomains: ['Golden Record MDM', 'Automated Cleansing', 'Compliance Guardrails'],
    accelerators: [
      { name: 'Golden Record Prime', type: 'Master Profile Creator', desc: 'Consolidates duplicate customer records into a single accurate master profile' },
      { name: 'Data Cleansing Forge', type: 'Anomaly Cleaner', desc: 'Strips corrupt formatting and invalid values automatically upon entry' },
      { name: 'Data Validation Sentinel', type: 'Error Preventer', desc: 'Validates records against strict business rules before client billing occurs' },
      { name: 'Address Validation Atlas', type: 'Address Verifier', desc: 'Verifies and normalizes global postal and shipping addresses instantly' }
    ]
  },
  {
    id: 'data-science',
    number: '03',
    name: 'Enterprise AI & Governance Studio',
    type: 'foundation',
    icon: BrainCircuit,
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    gradient: 'from-violet-600 to-purple-600',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Safe, Governed & Cost-Controlled AI for Business Growth',
    executiveSummary: `Deploy custom enterprise AI applications without risking data leaks, brand damage, or runaway cloud expenses. Equipped with real-time AI firewalls and token cost routing`,
    businessImpact: 'Launches custom enterprise AI tools in days instead of months, reducing AI cloud spend by 40%',
    outcomes: [
      'Protects corporate IP with an enterprise AI security firewall',
      'Eliminates AI hallucinations by double-checking internal data',
      'Controls monthly AI API budgets automatically via dynamic routing'
    ],
    subDomains: ['AI Security Firewall', 'Cost Optimizer', 'Predictive Analytics'],
    accelerators: [
      { name: 'Fortress', type: 'AI Security Firewall', desc: 'Blocks prompt injection attacks, unauthorized access, and sensitive data leaks' },
      { name: 'CostPilot', type: 'API Budget Optimizer', desc: 'Routes AI tasks across efficient models to slash monthly cloud spend' },
      { name: 'TruthGuard', type: 'Hallucination Prevention', desc: 'Verifies AI outputs against real company documents before decisions are made' },
      { name: 'DriftWatch', type: 'Model Accuracy Monitor', desc: 'Monitors live models and triggers automatic retraining when accuracy drops' }
    ]
  },
  {
    id: 'healthcare-pharma',
    number: '04',
    name: 'Healthcare & Pharma Acceleration Suite',
    type: 'industry',
    icon: Pill,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    gradient: 'from-emerald-600 to-teal-600',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Speed Up Clinical Research & Automate Regulatory Filings',
    executiveSummary: `Automates patient matching for clinical trials, summarizes medical research papers instantly, and verifies strict FDA, EMA, and HIPAA regulatory compliance automatically`,
    businessImpact: 'Cuts clinical trial protocol review times by 50% and accelerates drug time-to-market',
    outcomes: [
      'Shortens clinical candidate matching from 6 weeks to 3 days',
      'Automates regulatory dossier reviews for FDA/EMA submissions',
      'Monitors real-world patient safety notes continuously to flag drug side-effects'
    ],
    subDomains: ['Clinical Trial Acceleration', 'Regulatory Auditing', 'Patient Safety'],
    accelerators: [
      { name: 'TrialIQ', type: 'Trial Cohort Matcher', desc: 'Parses complex clinical trial protocols to identify matching patient pools instantly' },
      { name: 'MedReader', type: 'Research Synthesizer', desc: 'Scans thousands of medical journals to summarize research insights in minutes' },
      { name: 'ComplianceRx', type: 'Regulatory Auditor', desc: 'Audits submission documents against FDA and HIPAA guidelines automatically' }
    ]
  },
  {
    id: 'supply-chain',
    number: '05',
    name: 'Supply Chain & Procurement Suite',
    type: 'industry',
    icon: Truck,
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    gradient: 'from-cyan-600 to-blue-600',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Predictive Stock Planning & Automated Vendor Negotiations',
    executiveSummary: `Predicts inventory stockouts, audits vendor master agreements to highlight cost variances, and calculates fuel-efficient logistics delivery routes`,
    businessImpact: 'Uncovers up to 12% in procurement contract savings and achieves 99.2% on-time inventory fulfillment',
    outcomes: [
      'Prevents inventory stockouts that result in lost customer sales',
      'Scans supplier contracts automatically to highlight price inflation',
      'Calculates fuel-efficient delivery routes to lower fleet logistics expenses'
    ],
    subDomains: ['Vendor Negotiations', 'Predictive Replenishment', 'Logistics Route Optimization'],
    accelerators: [
      { name: 'SourceAI', type: 'Vendor Savings Finder', desc: 'Audits supplier agreements to spot hidden price increases and savings' },
      { name: 'DemandPilot', type: 'Stock Shortage Predictor', desc: 'Forecasts regional customer purchasing surges so warehouses stay stocked' },
      { name: 'RouteIQ', type: 'Fleet Route Optimizer', desc: 'Finds the fastest delivery paths to lower fuel and driver expenses' }
    ]
  },
  {
    id: 'retail-ecommerce',
    number: '06',
    name: 'Retail, Sales & Customer Growth Suite',
    type: 'industry',
    icon: ShoppingBag,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    gradient: 'from-amber-600 to-orange-600',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Accelerate Sales Close Rates & Customer Lifetime Value',
    executiveSummary: `Automates opportunity lead scoring, proposal drafting, dynamic product pricing, and customer churn prediction to maximize recurring revenue`,
    businessImpact: 'Boosts sales close rates by 18% and slashes proposal turnaround time by 90%',
    outcomes: [
      'Tells sales teams exactly which prospective deals will close first',
      'Generates custom enterprise proposals in under 1 hour instead of 4 days',
      'Flags at-risk customer accounts early so managers can step in to save revenue'
    ],
    subDomains: ['Sales Pipeline Execution', 'Proposal Automation', 'Customer Churn Prevention'],
    accelerators: [
      { name: 'DealIQ', type: 'Deal Close Predictor', desc: 'Analyzes buyer interactions to highlight deals closest to signing' },
      { name: 'ProposalForge', type: 'Instant Proposal Writer', desc: 'Assembles custom RFP responses and client proposals in minutes' },
      { name: 'RetainAI', type: 'Customer Churn Guard', desc: 'Identifies unhappy customer accounts early to protect recurring revenue' }
    ]
  },
  {
    id: 'digital-marketing',
    number: '07',
    name: 'Digital Growth & Brand Protection Suite',
    type: 'industry',
    icon: Megaphone,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    gradient: 'from-rose-600 to-pink-600',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Multiply Content Volume 5x While Safeguarding Brand Compliance',
    executiveSummary: `Empowers growth teams with campaign strategy tools, social content automation, and real-time brand style checkers that guarantee all public messaging matches policy`,
    businessImpact: 'Reduces campaign execution cycles by 65% while guaranteeing 100% brand voice compliance',
    outcomes: [
      'Multiplies marketing content creation volume by 5x across all channels',
      'Prevents off-brand messaging, grammar mistakes, and legal compliance errors',
      'Improves organic acquisition via AI-optimized search engine structures'
    ],
    subDomains: ['Multi-Channel Strategy', 'SEO Optimization', 'Brand Policy Guard'],
    accelerators: [
      { name: 'CampaignForge', type: 'Omnichannel Launch Planner', desc: 'Drafts end-to-end launch strategies, ad variants, and messaging' },
      { name: 'BrandShield', type: 'Brand Compliance Checker', desc: 'Audits all marketing copy before publication to prevent brand mistakes' },
      { name: 'WordSmith', type: 'Brand-Voice Copywriter', desc: 'Writes long-form blogs, whitepapers, and articles matching your company tone' }
    ]
  },
  {
    id: 'bfsi',
    number: '08',
    name: 'Banking, Financial Services & Accounting Suite',
    type: 'industry',
    icon: Landmark,
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    gradient: 'from-sky-600 to-indigo-600',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Automate Accounts Payable, Underwriting & Fraud Prevention',
    executiveSummary: `Automates time-consuming financial tasks like supplier invoice processing, employee expense auditing, commercial loan risk scoring, and real-time payment fraud detection`,
    businessImpact: 'Cuts invoice processing costs by 80% and accelerates loan decisions from 5 days to 20 minutes',
    outcomes: [
      'Automates accounts payable processing to eliminate manual data entry errors',
      'Stops fraudulent transaction charges instantly in real-time streams',
      'Speeds up business loan approvals safely while maintaining zero audit violations'
    ],
    subDomains: ['Financial Operations', 'Loan Underwriting Risk', 'Real-Time Fraud Shield'],
    accelerators: [
      { name: 'InvoiceFlow', type: 'Automated Invoice Processor', desc: 'Extracts invoice details, matches purchase orders, and queues payment' },
      { name: 'FraudShield', type: 'Real-Time Fraud Blocker', desc: 'Monitors transaction feeds continuously to stop unauthorized charges' },
      { name: 'CreditIQ', type: 'Loan Approval Assistant', desc: 'Evaluates applicant creditworthiness quickly using alternative risk signals' }
    ]
  },
  {
    id: 'transport-logistics',
    number: '09',
    name: 'Logistics & Fleet Operations Suite',
    type: 'industry',
    icon: Compass,
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    gradient: 'from-teal-600 to-emerald-600',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Predictive Maintenance & Dynamic Delivery Optimization',
    executiveSummary: `Monitors vehicle telematics in real time to prevent costly roadside engine breakdowns, calculate optimal delivery paths, and provide accurate live delivery updates`,
    businessImpact: 'Reduces vehicle maintenance downtime by 35% and improves last-mile delivery satisfaction',
    outcomes: [
      'Alerts fleet mechanics to repair needs before costly breakdowns occur',
      'Lowers fleet fuel expenditure with traffic-aware route optimization',
      'Keeps clients happy with accurate, real-time estimated arrival updates'
    ],
    subDomains: ['Fleet Breakdown Prevention', 'Route Fuel Optimization', 'Live Customer Tracking'],
    accelerators: [
      { name: 'FleetPulse', type: 'Predictive Fleet Monitor', desc: 'Analyzes engine telemetry to alert mechanics before breakdowns happen' },
      { name: 'RouteIQ', type: 'Smart Route Dispatcher', desc: 'Calculates the fastest, fuel-efficient delivery paths considering live traffic' },
      { name: 'CargoTrack', type: 'Customer Delivery Tracker', desc: 'Recalculates estimated arrival times and notifies customers automatically' }
    ]
  }
];

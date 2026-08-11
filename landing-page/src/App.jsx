import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  Database,
  BarChart3,
  BrainCircuit,
  Pill,
  Truck,
  ShoppingBag,
  Megaphone,
  Landmark,
  Compass,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  X,
  Search,
  Plus,
  Minus,
  MoveHorizontal,
  TrendingUp,
  ShieldCheck,
  Clock,
  DollarSign,
  Play,
  Terminal,
  Activity,
  Cpu,
  Menu,
  List,
  LayoutGrid,
  Send,
  Bot,
  Minimize2,
  Check
} from 'lucide-react';

// --- ALL 9 SUITES DATA MODEL ---
const SUITES = [
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
    name: 'Data Trust & Governance Suite',
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

/* The stack steps down the violet→blue family — four FLAT depths, no blends.
   Teal appears only on the target line: the "positive outcome" signal. */
const PILLARS = [
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

/* Card header blocks cycle the same flat violet→blue family */
const BLOCKS = [
  'bg-ig-violet',
  'bg-ig-violet-800',
  'bg-ig-violet-600',
  'bg-ig-violet-500',
  'bg-ig-blue-deep',
  'bg-ig-blue-deepest'
];

/* Row hover fill — one flat colour, wiped in from the left */
const ROW_FILL = 'bg-ig-violet';

const TABS = [
  { id: 'ALL', label: 'All 9 Suites' },
  { id: 'FOUNDATION', label: '3 Universal Foundations' },
  { id: 'INDUSTRY', label: '6 Industry Verticals' }
];

const CERTS = ['ISO 27001 Certified', 'SOC2 Type II', 'HIPAA Compliant'];

const NAV_LINKS = ['Overview', 'ROI Calculator', '9 Core Suites'];

/* Quick-entry cells under the hero headline — labels are the catalog's own */
const HERO_CELLS = [
  { n: '09', id: 'ALL', label: 'All 9 Suites' },
  { n: '03', id: 'FOUNDATION', label: '3 Universal Foundations' },
  { n: '06', id: 'INDUSTRY', label: '6 Industry Verticals' }
];

const SHELL = 'relative mx-auto w-full max-w-[1360px] px-5 md:px-8';

/* =========================================================================
   PRIMITIVES
   ========================================================================= */

/* One observer for the whole page rather than one per Reveal. There are ~50
   of them; fifty separate IntersectionObservers each keep their own record of
   root bounds and re-run on every scroll tick, which is real work for no
   reason. Targets are unobserved the moment they land, so the registry
   empties itself as you read down. */
let revealIO = null;
const revealCallbacks = new WeakMap();

function observeReveal(el, onEnter) {
  if (typeof IntersectionObserver === 'undefined') {
    onEnter();
    return undefined;
  }
  if (!revealIO) {
    revealIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const fn = revealCallbacks.get(entry.target);
          revealCallbacks.delete(entry.target);
          revealIO.unobserve(entry.target);
          fn?.();
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -60px 0px' }
    );
  }
  revealCallbacks.set(el, onEnter);
  revealIO.observe(el);
  return () => {
    revealCallbacks.delete(el);
    revealIO.unobserve(el);
  };
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    return observeReveal(el, () => setSeen(true));
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${seen ? 'is-in' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* [04] ENTERPRISE CATALOG ———— */
function Kicker({ index, children, tone = 'ink' }) {
  const dark = tone !== 'ink';
  return (
    <span
      className={`flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.03em] ${
        dark ? 'text-white/55' : 'text-ig-muted'
      }`}
    >
      <span className={dark ? 'text-ig-sky' : 'text-ig-purple'}>[{index}]</span>
      <span>{children}</span>
      <span className={`h-px w-6 sm:w-10 ${dark ? 'bg-white/25' : 'bg-ig-divider'}`} />
    </span>
  );
}

function ViewToggle({ view, setView }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-[0_10px_28px_-18px_rgba(22,6,58,0.8)]">
      {[
        { id: 'grid', Icon: LayoutGrid },
        { id: 'index', Icon: List }
      ].map(({ id, Icon }) => (
        <button
          key={id}
          onClick={() => setView(id)}
          aria-label={id}
          aria-pressed={view === id}
          className={`grid h-9 w-9 place-items-center rounded-full transition-colors duration-300 ${
            view === id ? 'bg-ig-violet text-white' : 'text-ig-muted hover:text-ig-ink'
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={2.2} />
        </button>
      ))}
    </div>
  );
}

/* The hero stage: a bloom, three layers of folds hung at different depths —
   the mid one inside a billowing frame — a travelling sheen, and the rule
   grid on top. Purely ambient: no pointer handlers, no per-frame JavaScript,
   every moving layer animates transform only. */
function HeroStage() {
  const surfaceRef = useRef(null);
  const [live, setLive] = useState(true);

  /* Nothing here is worth a single frame once it is off screen. Scrolling
     down the page used to leave six animated layers running against the
     compositor forever; now they park until the hero comes back. */
  useEffect(() => {
    const el = surfaceRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), {
      rootMargin: '200px 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div
        ref={surfaceRef}
        className={`art-surface ${live ? '' : 'art-idle'}`}
        aria-hidden="true"
      >
        <div className="glow" />

        <div className="curtain-field">
          {/* Back layer — wide, slow folds reading as depth behind the rest */}
          <div className="curtain curtain-c" />
          {/* Mid layer, hung inside a billowing frame */}
          <div className="billow">
            <div className="curtain curtain-b" />
          </div>
          {/* Front layer — the crisp folds */}
          <div className="curtain curtain-a" />
          <div className="sheen" />
          {/* the floor-up falloff, painted rather than masked */}
          <div className="curtain-veil" />
        </div>

        <div className="art-grid" />
      </div>

      {/* Grid-intersection marks — the drawing detail, corners only */}
      <div className="pointer-events-none absolute inset-0 z-[2] text-white/25" aria-hidden="true">
        <span className="crosshair left-5 top-5 sm:left-7 sm:top-7 lg:left-9 lg:top-9" />
        <span className="crosshair right-5 top-5 sm:right-7 sm:top-7 lg:right-9 lg:top-9" />
        <span className="crosshair bottom-5 left-5 sm:bottom-7 sm:left-7 lg:bottom-9 lg:left-9" />
        <span className="crosshair bottom-5 right-5 sm:bottom-7 sm:right-7 lg:bottom-9 lg:right-9" />
      </div>
    </>
  );
}

/* Swiss registration mark */
function Cross({ className = '', tone = 'ink' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none font-mono text-[14px] leading-none ${
        tone === 'ink' ? 'text-ig-divider' : 'text-white/30'
      } ${className}`}
    >
      +
    </span>
  );
}

/* Rest colour · the band that sweeps between · arrival colour.
   Every middle band is a fully saturated brand colour — never a tint or a
   shade of its neighbours, which is what made it look washed out. */
const SWAP = {
  teal: {
    faceA: 'bg-ig-teal text-white',
    faceM: 'bg-ig-violet-500',
    faceB: 'bg-ig-violet text-white',
    rip: 'bg-white/30'
  },
  violet: {
    faceA: 'bg-ig-violet text-white',
    faceM: 'bg-ig-purple',
    faceB: 'bg-white text-ig-ink',
    rip: 'bg-white/25'
  },
  light: {
    faceA: 'bg-white text-ig-ink',
    faceM: 'bg-ig-teal-ring',
    faceB: 'bg-ig-teal text-white',
    rip: 'bg-ig-ink/12'
  },
  ink: {
    faceA: 'bg-ig-ink text-white',
    faceM: 'bg-ig-violet-500',
    faceB: 'bg-ig-teal text-white',
    rip: 'bg-white/25'
  }
};

/* Every button on the site is a swap button: three solid bands ride one
   tilted track on a springy curve, a ripple blooms from the centre, and the
   whole pill scales up a touch. Labels counter-rotate so they read level. */
function SwapButton({ children, className = '', variant = 'violet', ...rest }) {
  const { faceA, faceM, faceB, rip } = SWAP[variant] || SWAP.violet;
  return (
    <button {...rest} className={`swap group ${faceA} ${className}`}>
      <span className="swap-ghost">{children}</span>
      <span aria-hidden="true" className="swap-track">
        <span className={`swap-face swap-face--a ${faceA}`}>
          <span className="swap-text">{children}</span>
        </span>
        <span className={`swap-mid ${faceM}`} />
        <span className={`swap-face swap-face--b ${faceB}`}>
          <span className="swap-text">{children}</span>
        </span>
      </span>
      <span aria-hidden="true" className={`swap-ripple ${rip}`} />
    </button>
  );
}

/* Teal rests, deep violet arrives — the primary action everywhere */
function TealButton({ children, className = '', ...rest }) {
  return (
    <SwapButton
      {...rest}
      variant="teal"
      className={`px-6 py-3.5 text-[13px] font-semibold ${className}`}
    >
      {children}
    </SwapButton>
  );
}

/* =========================================================================
   APP
   ========================================================================= */

export default function App() {
  const [activeSuiteId, setActiveSuiteId] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive ROI Calculator State
  const [companyEmployees, setCompanyEmployees] = useState(500);

  // Live Simulation Modal State
  const [simAccelerator, setSimAccelerator] = useState(null);
  const [simStep, setSimStep] = useState(0);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am the Ignitho AI Assistant. How can I assist your executive team today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Chrome
  const [navHidden, setNavHidden] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState('grid');
  const pendingAnchor = useRef(null);

  // Segmented control — the pill measures the active tab and glides to it
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  /* Hover-peek: a preview card that trails the pointer down the list.
     The card eases toward the pointer rather than snapping to it, and the
     suite is kept in state through the fade-out so it never blanks. */
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const activeRow = useRef(null);
  const [previewSuite, setPreviewSuite] = useState(null);
  const [previewOn, setPreviewOn] = useState(false);
  /* Which row is lit. Driven from the pointer rather than by CSS :hover — the
     browser does not re-run :hover while the page scrolls under a still
     cursor, which is why the fill used to stay behind on the old row. */
  const [hoverId, setHoverId] = useState(null);
  const aim = useRef({ x: 0, y: 0 });
  const at = useRef({ x: 0, y: 0 });
  const settled = useRef(false);

  // Dead zones: the number gutter on the left, the impact text and arrow on
  // the right. The card gets out of the way so those stay readable.
  const PEEK_EDGE_L = 84;
  const PEEK_EDGE_R = 132;
  const PEEK_W = 300;
  const PEEK_H = 292;

  /* The pointer, in VIEWPORT coordinates.

     This is the whole fix for the scroll behaviour. The card is positioned
     inside the list, so scrolling moves the list — and the card with it — out
     from under a cursor that has not moved. Anything stored relative to the
     list is stale the instant the page scrolls; the viewport is the only frame
     of reference that survives it. */
  const pointer = useRef(null);

  /* The single source of truth for the whole hover behaviour: where the card
     sits, whether it is inside the live zone, which row is lit, and which way
     that row's fill grows. Everything is derived from the pointer plus a fresh
     measurement, so a scroll and a mouse move produce the same answer. */
  const syncPeek = useCallback(() => {
    const list = listRef.current;
    const p = pointer.current;
    if (!list || !p) return;
    const box = list.getBoundingClientRect();

    /* Cheap bounds test first — this runs on every mouse move anywhere on the
       page, and there is no reason to hit-test the document unless the pointer
       is actually over the list. */
    const inside =
      p.x >= box.left && p.x <= box.right && p.y >= box.top && p.y <= box.bottom;

    /* Hit-test for the row rather than trusting mouseenter. Firefox does not
       fire it at all while the page scrolls under a still cursor, and Chrome
       defers it. The card is pointer-events:none, so this can never find the
       card instead of the row underneath it. */
    let row = null;
    if (inside) {
      const hit = document.elementFromPoint(p.x, p.y);
      row = hit?.closest?.('[data-suite-id]') || null;
    }

    /* Direction-aware fill, set once per change of row — the leaving row
       retracts toward the edge the pointer left by, the arriving one grows
       from the edge it came in by. Setting this every frame would move the
       origin mid-transition. */
    if (row !== activeRow.current) {
      for (const el of [activeRow.current, row]) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--fill-origin', p.y < r.top + r.height / 2 ? 'top' : 'bottom');
      }
      activeRow.current = row;
      setHoverId(row ? row.getAttribute('data-suite-id') : null);
    }

    if (!row) {
      setPreviewOn(false);
      return;
    }

    aim.current = { x: p.x - box.left, y: p.y - box.top };
    if (!settled.current) {
      at.current = { ...aim.current };
      settled.current = true;
    }

    // same object identity each time, so React bails out on a no-op set
    const suite = SUITES.find((s) => s.id === row.getAttribute('data-suite-id'));
    if (suite) setPreviewSuite(suite);

    const inZone = aim.current.x > PEEK_EDGE_L && aim.current.x < box.width - PEEK_EDGE_R;
    setPreviewOn(inZone);
  }, []);

  /* Tracked on the window, not on the list.

     Bound to the list, the pointer was unknown until you moved it *inside* the
     list — so scrolling the section up under a cursor that was already sitting
     over a row did nothing until you jiggled the mouse. On the window, the
     position is already known by the time the list arrives, and the scroll
     handler can light the right row immediately.

     Both events share one rAF gate, so this costs one derivation per frame at
     most, and `syncPeek` returns immediately when the list is not mounted. */
  useEffect(() => {
    let ticking = false;
    const schedule = () => {
      if (ticking || !pointer.current) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        syncPeek();
      });
    };
    const onMove = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      schedule();
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', schedule);
    };
  }, [syncPeek]);

  useEffect(() => {
    if (!previewOn) {
      settled.current = false;
      return undefined;
    }
    let raf = 0;
    const loop = () => {
      at.current.x += (aim.current.x - at.current.x) * 0.13;
      at.current.y += (aim.current.y - at.current.y) * 0.13;
      const el = previewRef.current;
      const box = listRef.current;
      if (el && box) {
        const max = Math.max(box.clientWidth - PEEK_W, 0);
        const x = Math.min(Math.max(at.current.x - PEEK_W / 2, 0), max);
        const y = at.current.y - PEEK_H / 2;
        el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [previewOn]);

  // Grow the row fill from whichever edge the pointer crossed
  const setFillOrigin = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--fill-origin', e.clientY - r.top < r.height / 2 ? 'top' : 'bottom');
  };

  /* Masthead: retracts on the way down, returns the moment you scroll up.
     The 6px deadband stops trackpad jitter from flickering it. */
  const lastY = useRef(0);
  useEffect(() => {
    let ticking = false;
    const read = () => {
      ticking = false;
      const y = document.documentElement.scrollTop;
      if (y <= 80) setNavHidden(false);
      else if (y > lastY.current + 6) setNavHidden(true);
      else if (y < lastY.current - 6) setNavHidden(false);
      setNavScrolled(y > 8);
      lastY.current = y;
    };
    // one read per frame at most — scroll fires far faster than we can paint
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  useEffect(() => {
    const anchor = pendingAnchor.current;
    pendingAnchor.current = null;
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeSuiteId]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen, isTyping]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setSimAccelerator(null);
      setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (activeSuiteId) return undefined;
    const measure = () => {
      const el = tabRefs.current[TABS.findIndex((t) => t.id === activeTab)];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    // fonts land after first paint and change the tab widths
    const t = setTimeout(measure, 250);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [activeTab, activeSuiteId]);

  // The sheet owns the viewport while it is open
  useEffect(() => {
    if (!menuOpen && !simAccelerator) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen, simAccelerator]);

  const activeSuite = useMemo(() => {
    return SUITES.find((s) => s.id === activeSuiteId) || null;
  }, [activeSuiteId]);

  const filteredSuites = useMemo(() => {
    return SUITES.filter((s) => {
      const matchesTab =
        activeTab === 'ALL' ||
        (activeTab === 'FOUNDATION' && s.type === 'foundation') ||
        (activeTab === 'INDUSTRY' && s.type === 'industry');

      const matchesSearch =
        !searchQuery.trim() ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  /* Which panel of the reel is showing. Must stay below `filteredSuites` —
     reading it any earlier is a temporal dead zone, and because the ternary
     short-circuits while nothing is hovered, the crash only surfaces on the
     first hover rather than on mount. */
  const peekIndex = previewSuite
    ? Math.max(
        0,
        filteredSuites.findIndex((s) => s.id === previewSuite.id)
      )
    : 0;

  /* The reel's nine panels only change when the filter does. Built here and
     held, so dragging the ROI slider — which re-renders this component up to
     once a frame — never rebuilds nine cards and their images along with it. */
  const peekPanels = useMemo(
    () =>
      filteredSuites.map((s) => (
        <div key={s.id} style={{ height: PEEK_H }}>
          <div className="h-[150px] overflow-hidden">
            <img
              src={s.imageUrl}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[142px] px-5 py-4">
            <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-teal">
              {s.number}
            </span>
            <p className="mt-1.5 truncate text-[14px] font-extrabold leading-[1.2] tracking-[-0.02em] text-ig-ink">
              {s.name}
            </p>
            <p className="mt-2.5 clamp-3 border-t border-ig-ink/10 pt-2.5 text-[11.5px] leading-[1.45] text-ig-muted">
              {s.businessImpact}
            </p>
          </div>
        </div>
      )),
    [filteredSuites]
  );

  const runSimulation = (acc) => {
    setSimAccelerator(acc);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 1200);
    setTimeout(() => setSimStep(3), 2800);
  };

  const estimatedSavings = useMemo(() => {
    const baseSavingsPerEmp = 320;
    return (companyEmployees * baseSavingsPerEmp).toLocaleString();
  }, [companyEmployees]);

  // The figure tracks the handle directly — no count-up, nothing to wait for
  const nudgeEmployees = (delta) =>
    setCompanyEmployees((n) => Math.min(10000, Math.max(50, n + delta)));

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse =
        "Ignitho AI delivers pre-built, multi-agent AI accelerators that automate complex business workflows securely. Would you like to schedule an executive briefing with our leadership team?";

      const q = query.toLowerCase();
      if (q.includes('roi') || q.includes('cost') || q.includes('save')) {
        botResponse =
          'On average, Ignitho AI reduces routine operational overhead by 60% to 80% and cuts AI cloud API spending by up to 40% via CostPilot routing';
      } else if (
        q.includes('security') ||
        q.includes('hipaa') ||
        q.includes('compliance') ||
        q.includes('fda')
      ) {
        botResponse =
          'Ignitho AI is ISO 27001 certified and SOC2 Type II compliant. Our Fortress security firewall prevents data leaks, prompt attacks, and PII violations automatically';
      } else if (q.includes('deploy') || q.includes('time') || q.includes('fast')) {
        botResponse =
          'Because Ignitho AI relies on modular, pre-built accelerators, deployment takes days rather than custom multi-month software engineering cycles';
      }

      setIsTyping(false);
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  const goHome = useCallback(() => {
    setActiveSuiteId(null);
  }, []);

  const goTo = useCallback(
    (id) => {
        if (activeSuiteId) {
        pendingAnchor.current = id;
        setActiveSuiteId(null);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [activeSuiteId]
  );

  const jumpToTab = (tabId) => {
    setActiveTab(tabId);
    goTo('suites-catalog');
  };

  const openSuite = useCallback((id) => setActiveSuiteId(id), []);

  /* Nine static links over data that never changes — built once for the life
     of the page rather than on every keystroke and every slider frame.
     Declared here, below `openSuite`: a useMemo factory runs during render,
     so anything it closes over has to already exist. */
  const footerDirectory = useMemo(
    () =>
      SUITES.map((suite) => (
        <button
          key={suite.id}
          onClick={() => openSuite(suite.id)}
          className="group flex items-baseline gap-3.5 border-b border-white/10 py-2 text-left"
        >
          <span className="font-mono text-[11px] font-bold text-ig-lavender/40 transition-colors duration-300 group-hover:text-ig-teal-ring">
            {suite.number}
          </span>
          <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ig-lavender/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
            {suite.name}
          </span>
        </button>
      )),
    [openSuite]
  );

  const navAction = (label) =>
    label === 'Overview'
      ? goHome
      : label === 'ROI Calculator'
        ? () => goTo('roi-calculator')
        : () => goTo('suites-catalog');

  const sliderPct = ((companyEmployees - 50) / 9950) * 100;

  return (
    <div className="relative min-h-screen bg-ig-paper font-sans text-ig-text">
      {/* ===================================================================== */}
      {/* MASTHEAD                                                              */}
      {/* ===================================================================== */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
          navHidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* A plain white bar, balanced in three: wordmark left, destinations
            optically centred, one action right. It carries a hairline at rest
            and lifts onto a soft shadow once the page has moved under it. */}
        <nav
          className={`relative border-b border-ig-ink/10 bg-white transition-shadow duration-500 ease-out ${
            navScrolled ? 'shadow-[0_16px_36px_-30px_rgba(22,6,58,0.95)]' : 'shadow-none'
          }`}
        >
          <div
            className={`${SHELL} flex h-[72px] items-center justify-between gap-6 md:h-[84px]`}
          >
            <button
              onClick={goHome}
              className="flex shrink-0 items-baseline gap-1.5"
              aria-label="Ignitho AI"
            >
              <span className="text-[21px] font-black tracking-[-0.03em] text-ig-ink md:text-[24px]">
                Ignitho
              </span>
              <span className="serif-accent text-[25px] leading-none text-ig-purple md:text-[29px]">
                AI
              </span>
            </button>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
              {NAV_LINKS.map((label) => (
                <button
                  key={label}
                  onClick={navAction(label)}
                  className="group relative py-2 text-[15px] font-medium tracking-[-0.01em] text-ig-muted transition-colors duration-300 hover:text-ig-ink"
                >
                  {label}
                  {/* wipes in from the left, out to the right */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-ig-purple transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100"
                  />
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <span aria-hidden="true" className="hidden h-5 w-px bg-ig-ink/12 lg:block" />

              {/* below lg the action lives in the menu sheet, so the bar keeps
                  to a wordmark and one control */}
              <div className="hidden lg:block">
                <TealButton className="!px-6 !py-3.5 !text-[13.5px]">
                  <span className="whitespace-nowrap">Schedule Executive Briefing</span>
                </TealButton>
              </div>

              <div className="lg:hidden">
                <SwapButton
                  onClick={() => setMenuOpen(true)}
                  aria-expanded={menuOpen}
                  aria-label="Menu"
                  variant="ink"
                  className="h-11 w-11"
                >
                  <Menu className="h-4 w-4" strokeWidth={2.4} />
                </SwapButton>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* MENU — a full sheet over the page, not a dropdown                     */}
      {/* ===================================================================== */}
      <div
        className={`sheet fixed inset-0 z-[70] ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div className="sheet-panel dots-inv relative isolate h-full w-full overflow-y-auto bg-ig-violet text-white">
          <div className="flex h-[76px] items-center justify-between gap-5 px-5 md:h-[92px] md:px-8">
            <button onClick={goHome} className="flex items-baseline gap-2" aria-label="Ignitho AI">
              <span className="text-[19px] font-black tracking-[-0.02em] md:text-[22px]">
                Ignitho
              </span>
              <span className="serif-accent text-[23px] md:text-[27px]">AI</span>
            </button>
            <SwapButton
              onClick={() => setMenuOpen(false)}
              variant="light"
              className="px-7 py-4 text-[14px] font-semibold"
            >
              <X className="h-4 w-4" strokeWidth={2.4} />
              Close
            </SwapButton>
          </div>

          <div className="mx-auto grid w-full max-w-[1360px] grid-cols-12 gap-x-10 gap-y-14 px-5 pb-16 pt-10 md:px-8 md:pt-16">
            {/* primary destinations, set large */}
            <nav className="col-span-12 lg:col-span-7">
              {NAV_LINKS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => {
                    setMenuOpen(false);
                    navAction(label)();
                  }}
                  style={{ animationDelay: `${180 + i * 70}ms` }}
                  className="sheet-item group flex w-full items-center justify-between gap-6 border-b border-white/15 py-6 text-left first:border-t md:py-8"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] font-bold tracking-[0.055em] text-white/35 transition-colors duration-300 group-hover:text-ig-teal-ring">
                      0{i + 1}
                    </span>
                    <span className="font-extrabold leading-[0.98] tracking-[-0.035em] text-[clamp(30px,4.4vw,56px)] transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {label}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-6 w-6 shrink-0 text-white/30 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ig-teal-ring md:h-8 md:w-8"
                    strokeWidth={1.8}
                  />
                </button>
              ))}
            </nav>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div
                style={{ animationDelay: '720ms' }}
                className="sheet-item flex flex-wrap items-center gap-x-5 gap-y-3"
              >
                <TealButton onClick={() => setMenuOpen(false)}>
                  Schedule Executive Briefing
                  <ArrowRight className="h-3.5 w-3.5" />
                </TealButton>
              </div>

              <div
                style={{ animationDelay: '780ms' }}
                className="sheet-item mt-9 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-6"
              >
                {CERTS.map((cert) => (
                  <span
                    key={cert}
                    className="font-mono text-[11px] font-bold tracking-[0.055em] text-white/40"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!activeSuite ? (
        <>
          {/* ================================================================= */}
          {/* 01 — HERO · FLAVOUR A (dark violet→blue)                          */}
          {/* ================================================================= */}
          <section
            id="overview"
            className="aurora relative overflow-hidden pb-20 pt-[104px] md:pb-28 md:pt-[136px]"
          >
            <HeroStage />

            <div className={SHELL}>
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/15 py-4">
                  {/* the eyebrow — sky, per the brand's rule for dark surfaces */}
                  <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-sky md:text-[11px]">
                    Transforming Ignitho into an AI-First Enterprise Partner
                  </span>
                  <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-lavender/45 md:text-[11px]">
                    Enterprise AI Platform
                  </span>
                </div>

                {/* the display block — type is the hero image */}
                <Reveal className="pt-12 md:pt-20">
                  <h1 className="font-extrabold leading-[0.9] tracking-[-0.045em] text-[clamp(38px,7.3vw,106px)] text-white">
                    <span className="line-mask">
                      <span>Workflow-Driven</span>
                    </span>
                    <span className="line-mask">
                      <span style={{ transitionDelay: '90ms' }}>
                        AI Solutions{' '}
                        {/* headline stays white on dark; the serif italic and
                            the outlined word carry the accent, not colour */}
                        <span className="serif-accent font-normal text-white">Delivering</span>
                      </span>
                    </span>
                    <span className="line-mask">
                      <span style={{ transitionDelay: '180ms' }}>
                        <span className="stroke-lilac">Measurable</span> Enterprise ROI
                      </span>
                    </span>
                  </h1>
                </Reveal>

                <div className="mt-12 grid grid-cols-12 items-end gap-x-10 gap-y-10 border-t border-white/15 pt-10 md:mt-16">
                  <Reveal className="col-span-12 lg:col-span-6">
                    <p className="max-w-xl text-[17px] leading-[1.45] tracking-[-0.01em] text-ig-lavender/75 md:text-[21px]">
                      Move away from unguided prompt chats.{' '}
                      <span className="serif-accent text-white">Ignitho AI</span> delivers
                      pre-built, domain-specific AI accelerators that automate complex business
                      operations safely and repeatably
                    </p>
                  </Reveal>

                  <Reveal delay={120} className="col-span-12 lg:col-span-5 lg:col-start-8">
                    <div className="flex flex-wrap gap-3 lg:justify-end">
                      <TealButton>
                        Schedule Executive Briefing
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </TealButton>
                      <SwapButton
                        onClick={() => goTo('suites-catalog')}
                        variant="light"
                        className="px-6 py-3.5 text-[13px] font-semibold"
                      >
                        9 Core Suites
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </SwapButton>
                    </div>
                  </Reveal>
                </div>

                {/* Ruled entry cells — outlined numerals fill solid on hover */}
                <Reveal
                  delay={180}
                  className="mt-14 grid grid-cols-1 border-t border-white/20 sm:grid-cols-3 md:mt-16"
                >
                  {HERO_CELLS.map((cell) => (
                    <button
                      key={cell.id}
                      onClick={() => jumpToTab(cell.id)}
                      className="group flex items-center justify-between gap-5 border-b border-white/12 py-7 text-left transition-colors duration-300 sm:border-b-0 sm:border-r sm:border-white/12 sm:px-7 sm:last:border-r-0 sm:first:pl-0 sm:last:pr-0"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="stroke-paper stroke-hover-paper font-mono text-[46px] font-bold leading-none tracking-[-0.05em] transition-colors duration-300 md:text-[58px]">
                          {cell.n}
                        </span>
                        <span className="max-w-[13ch] font-mono text-[11.5px] font-bold leading-[1.5] tracking-[0.05em] text-ig-lavender/70 transition-colors duration-300 group-hover:text-white">
                          {cell.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-white/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ig-teal-ring"
                        strokeWidth={2.2}
                      />
                    </button>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* 02 — PILLARS · FLAVOUR B (lavender tint)                          */}
          {/* ================================================================= */}
          <section id="pillars" className="bg-b dots relative pt-16 md:pt-24">
            <div className={SHELL}>
              <Cross className="-top-11 left-1 md:left-3" />
              <Cross className="-top-11 right-1 md:right-3" />

              <Reveal className="plate relative flex flex-col gap-6 border-b border-ig-ink/15 pb-7 md:flex-row md:items-end md:justify-between">
                <div>
                  <Kicker index="02">Strategic Pillars</Kicker>
                  <h2 className="mt-7 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(30px,5vw,62px)] text-ig-ink">
                    <span className="block">Why Corporate Stakeholders</span>
                    <span className="serif-accent block font-normal text-ig-purple">
                      Choose Ignitho AI
                    </span>
                  </h2>
                </div>
                <span className="shrink-0 font-mono text-[11px] font-bold tracking-[0.07em] text-ig-muted">
                  04 / 04
                </span>
              </Reveal>
            </div>

            {/* Each card pins a little lower than the last, so they deal
                themselves into a stack as you scroll.

                A sticky element cannot travel past the bottom of its container,
                and the last card's own bottom edge IS that bottom — so it had
                exactly zero travel and never pinned at all, which is why it
                alone dropped straight past the deck. The padding below gives it
                a dwell like the others. It is the section's former bottom
                padding, moved inside the container and lengthened: the same
                space, now doing work instead of sitting empty. */}
            <div className={`${SHELL} mt-8 md:mt-10`}>
              {/* the padding belongs on THIS box — a sticky element is
                  constrained by its containing block's padding box, and this
                  div, not the shell, is the cards' containing block */}
              <div className="relative pb-28 md:pb-[220px]">
                {PILLARS.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="stack-item" style={{ '--i': i }}>
                      {/* No min-height and no `justify-between`: the card is
                          exactly as tall as its two columns need, so there is
                          no gap left in the middle to push content apart. */}
                      <article
                        className={`relative overflow-hidden rounded-[24px] p-8 text-white md:p-12 ${pillar.bg}`}
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -bottom-14 right-2 select-none font-mono text-[150px] font-bold leading-none text-white/[0.07] md:-bottom-20 md:right-8 md:text-[230px]"
                        >
                          {pillar.n}
                        </span>

                        <div className="relative grid grid-cols-12 gap-x-10 gap-y-7">
                          {/* left — the name of the pillar */}
                          <div className="col-span-12 flex flex-col md:col-span-6">
                            <span className="font-mono text-[11px] font-bold tracking-[0.07em] text-white/45">
                              {pillar.n}
                            </span>
                            {/* the heading absorbs the slack, so the mark below
                                sits at the foot of the column — level with the
                                target line opposite — while `mt-8` still
                                guarantees a gap when there is no slack */}
                            {/* Two lines' worth of height, always. The titles
                                run 14–20 characters, so some wrap and some do
                                not — and an unequal card height means the deck
                                cannot line up, which reads as a gap between
                                cards. `1.9em` is exactly two lines at this
                                leading, so the reservation costs nothing on the
                                titles that do wrap. */}
                            <h3 className="mt-5 min-h-[1.9em] flex-1 font-extrabold leading-[0.95] tracking-[-0.032em] text-[clamp(32px,4.6vw,62px)]">
                              {pillar.title}
                            </h3>
                            <Icon
                              className="mt-8 hidden h-12 w-12 shrink-0 text-white/30 md:block"
                              strokeWidth={1.2}
                            />
                          </div>

                          {/* right — what it does, and the number it aims at */}
                          <div className="col-span-12 flex flex-col md:col-span-5 md:col-start-8">
                            <p className="flex-1 text-[17px] leading-[1.5] text-white/70 md:text-[21px]">
                              {pillar.body}
                            </p>
                            <span className="mt-7 flex items-center gap-3 border-t border-white/15 pt-6 font-mono text-[11.5px] font-bold tracking-[0.055em] text-ig-teal-ring">
                              <Icon
                                className="h-4 w-4 shrink-0 text-white/55 md:hidden"
                                strokeWidth={2}
                              />
                              {pillar.target}
                            </span>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* 03 — THE FIGURE · FLAVOUR C (near-white)                          */}
          {/* ================================================================= */}
          <section id="roi-calculator" className="bg-c dots relative py-24 md:py-32">
            <div className={SHELL}>
              <Cross className="-top-11 left-1 md:left-3" />
              <Cross className="-top-11 right-1 md:right-3" />

              <div className="relative">
                <Reveal className="plate border-b border-ig-ink/15 pb-9">
                  <Kicker index="03">Interactive Enterprise Savings Calculator</Kicker>
                  <h2 className="mt-7 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(28px,4.6vw,58px)] text-ig-ink">
                    <span className="block">Estimate Your Annual</span>
                    <span className="serif-accent block font-normal text-ig-purple">
                      Operating Cost Savings
                    </span>
                  </h2>
                </Reveal>

                <div className="mt-12 grid grid-cols-12 items-start gap-x-10 gap-y-10 md:mt-16">
                  {/* ---- the control, first in reading order and unmistakably a control ---- */}
                  <Reveal className="order-1 col-span-12 lg:col-span-5">
                    <div className="rounded-[20px] bg-white p-6 shadow-[0_18px_50px_-26px_rgba(22,6,58,0.5)] ring-1 ring-inset ring-ig-ink/8 md:p-8">
                      <p className="text-[14px] font-semibold leading-[1.55] text-ig-text md:text-[15px]">
                        Adjust your company employee count to project Ignitho AI automation impact:
                      </p>

                      {/* explicit readout + steppers, so it works without discovering the drag */}
                      <div className="mt-7 flex items-center justify-between gap-4">
                        <button
                          onClick={() => nudgeEmployees(-50)}
                          aria-label="Fewer employees"
                          disabled={companyEmployees <= 50}
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ig-ink text-white transition-colors duration-300 hover:bg-ig-violet-600 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                          <Minus className="h-4 w-4" strokeWidth={2.6} />
                        </button>

                        <span className="min-w-0 text-center">
                          <span className="tnum block text-[30px] font-extrabold leading-none tracking-[-0.035em] text-ig-ink md:text-[36px]">
                            {companyEmployees.toLocaleString()}
                          </span>
                          <span className="mt-1.5 block font-mono text-[11px] font-bold tracking-[0.06em] text-ig-muted">
                            Employees
                          </span>
                        </span>

                        <button
                          onClick={() => nudgeEmployees(50)}
                          aria-label="More employees"
                          disabled={companyEmployees >= 10000}
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ig-ink text-white transition-colors duration-300 hover:bg-ig-violet-600 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                          <Plus className="h-4 w-4" strokeWidth={2.6} />
                        </button>
                      </div>

                      {/* the drag track */}
                      <div className="relative mt-8">
                        <div className="h-1.5 w-full rounded-full bg-ig-ink/12">
                          <div
                            className="h-1.5 rounded-full bg-ig-teal"
                            style={{ width: `${sliderPct}%` }}
                          />
                        </div>

                        <input
                          type="range"
                          min="50"
                          max="10000"
                          step="1"
                          value={companyEmployees}
                          onChange={(e) => setCompanyEmployees(Number(e.target.value))}
                          aria-label="Employees"
                          aria-valuetext={`${companyEmployees.toLocaleString()} Employees`}
                          className="ig-range absolute inset-x-0 -top-[10px]"
                        />
                      </div>

                      <div className="mt-5 flex items-center justify-between font-mono text-[11px] font-bold tracking-[0.055em] text-ig-muted">
                        <span>50</span>
                        <span className="flex items-center gap-1.5 text-ig-purple">
                          <MoveHorizontal className="h-3.5 w-3.5" strokeWidth={2.4} />
                          Drag
                        </span>
                        <span>10,000</span>
                      </div>
                    </div>
                  </Reveal>

                  {/* ---- the result ---- */}
                  <div className="plate order-2 col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-2">
                    <span className="font-mono text-[11px] font-bold tracking-[0.03em] text-ig-muted">
                      Estimated Annual ROI
                    </span>
                    <div className="mt-4 flex items-start gap-2 md:gap-3">
                      <span className="mt-[0.42em] font-mono text-[clamp(20px,2.6vw,38px)] font-bold leading-none text-ig-teal">
                        $
                      </span>
                      <span className="tnum block font-extrabold leading-[0.84] tracking-[-0.05em] text-[clamp(40px,7vw,104px)] text-ig-ink">
                        {estimatedSavings}
                      </span>
                    </div>
                    <p className="mt-6 border-t border-ig-ink/15 pt-5 font-mono text-[11.5px] tracking-[0.055em] text-ig-purple">
                      Based on 60% routine workflow reduction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* 04 — CATALOG · FLAVOUR B (lavender tint)                          */}
          {/* ================================================================= */}
          <section id="suites-catalog" className="bg-b relative py-24 md:py-32">
            <div className={SHELL}>
              <Reveal className="mx-auto max-w-4xl text-center">
                <span className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-[11px] font-bold tracking-[0.055em] text-ig-purple shadow-[0_10px_30px_-18px_rgba(22,6,58,0.6)]">
                  Enterprise Catalog
                </span>
                <h2 className="mt-8 font-extrabold leading-[1.02] tracking-[-0.035em] text-[clamp(32px,4.8vw,64px)] text-ig-ink">
                  Our 9 Core{' '}
                  <span className="serif-accent font-normal text-ig-purple">
                    Enterprise AI Suites
                  </span>
                </h2>
              </Reveal>

              {/* Segmented control — the indicator measures each tab and glides */}
              <Reveal delay={80} className="mt-11 flex justify-center">
                <div className="relative inline-flex w-full max-w-full flex-wrap justify-center gap-1 rounded-[28px] bg-white p-1.5 shadow-[0_18px_50px_-30px_rgba(22,6,58,0.7)] sm:w-auto sm:flex-nowrap sm:rounded-full">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1.5 top-1.5 hidden rounded-full bg-ig-violet transition-all duration-500 ease-out sm:block"
                    style={{ left: `${indicator.left}px`, width: `${indicator.width}px` }}
                  />
                  {TABS.map((tab, i) => {
                    const on = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        ref={(el) => (tabRefs.current[i] = el)}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative z-10 whitespace-nowrap rounded-full px-5 py-3 text-[13px] font-semibold transition-colors duration-300 sm:px-7 sm:py-3.5 ${
                          on
                            ? 'bg-ig-violet text-white sm:bg-transparent'
                            : 'text-ig-muted hover:text-ig-ink'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </Reveal>

              {/* Search sits with the thing it filters, not up in the hero */}
              <Reveal delay={120} className="mx-auto mt-5 flex max-w-2xl items-stretch rounded-full bg-white shadow-[0_18px_50px_-32px_rgba(22,6,58,0.8)] ring-1 ring-inset ring-ig-ink/8 transition-shadow duration-300 focus-within:ring-2 focus-within:ring-ig-teal">
                <span className="grid w-[54px] shrink-0 place-items-center text-ig-purple">
                  <Search className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                <input
                  type="text"
                  placeholder="Search capabilities (e.g. Data Cleaning, Proposals, Invoices, Clinical Trials)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-4 pr-4 text-[13.5px] tracking-[-0.01em] text-ig-text outline-none placeholder:text-ig-muted/65 md:text-[14.5px]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear"
                    className="mr-2 grid w-10 shrink-0 place-items-center text-ig-muted transition-colors hover:text-ig-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </Reveal>

              {/* One fixed home for the view switch, so it never jumps or
                  disappears when you change views */}
              <Reveal delay={160} className="mt-8 flex justify-end">
                <ViewToggle view={view} setView={setView} />
              </Reveal>
            </div>

            {filteredSuites.length === 0 ? (
              <div className={`${SHELL} mt-14`}>
                <div className="flex flex-col items-center gap-4 border border-dashed border-ig-ink/25 py-24 text-center">
                  <Search className="h-5 w-5 text-ig-divider" />
                  <p className="font-mono text-[11px] tracking-[0.055em] text-ig-muted">
                    0 results for “{searchQuery}”
                  </p>
                  <SwapButton
                    onClick={() => setSearchQuery('')}
                    variant="ink"
                    className="px-6 py-3 text-[12.5px] font-semibold"
                  >
                    Clear
                  </SwapButton>
                </div>
              </div>
            ) : view === 'grid' ? (
              /* ---------- GRID: a plain responsive grid on the page's own
                   vertical scroll. No horizontal track, so no snapping, no
                   progress bar and no arrows to discover — you just scroll.

                   The card is cut down to what earns a place at this size: the
                   image, what the suite is, and the number it aims at. The
                   executive summary and the three outcomes belong on the suite
                   page, which is one click away, and at nine cards abreast they
                   were the whole reason the old card ran past 700px tall. ---- */
              <div className={`${SHELL} mt-10`}>
                <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSuites.map((suite, i) => {
                    const Icon = suite.icon;
                    const block = BLOCKS[i % BLOCKS.length];
                    return (
                      <Reveal key={suite.id} delay={Math.min(i * 45, 260)}>
                        {/* the whole card is the control — an arrow chip reads
                            as the affordance without a full-width pill's height */}
                        <button
                          onClick={() => openSuite(suite.id)}
                          className="group flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-white text-left shadow-[0_10px_36px_-26px_rgba(22,6,58,0.45)] transition-all duration-[400ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-32px_rgba(22,6,58,0.55)]"
                        >
                          <span className="relative block h-[108px] overflow-hidden">
                            <img
                              src={suite.imageUrl}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,7,34,0.5)_0%,rgba(13,7,34,0.1)_46%,rgba(13,7,34,0.72)_100%)]"
                            />
                            <span
                              className={`absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full text-white ${block}`}
                            >
                              <Icon className="h-4 w-4" strokeWidth={2} />
                            </span>
                            <span className="absolute right-4 top-4 rounded-full bg-white/12 px-2.5 py-1 font-mono text-[10.5px] font-bold text-white/85">
                              {suite.number}
                            </span>
                            <span className="absolute inset-x-4 bottom-3 block truncate text-[11px] font-medium text-white/75">
                              {suite.type === 'foundation'
                                ? 'Universal Foundation Platform'
                                : 'Industry Vertical Suite'}
                            </span>
                          </span>

                          {/* The type carries the card now, not the picture.
                              Each block is clamped to a fixed number of lines,
                              so every card in a row lands on the same height
                              without a min-height guess. */}
                          <span className="flex flex-1 flex-col p-6">
                            <span className="clamp-2 text-[19px] font-extrabold leading-[1.15] tracking-[-0.022em] text-ig-ink">
                              {suite.name}
                            </span>
                            <span className="serif-accent clamp-2 mt-2 text-[16px] leading-[1.25] text-ig-purple">
                              {suite.tagline}
                            </span>
                            <span className="clamp-2 mt-3 text-[12.5px] leading-[1.6] text-ig-muted">
                              {suite.executiveSummary}
                            </span>

                            <span className="mt-auto flex items-end justify-between gap-4 border-t border-ig-ink/10 pt-4">
                              <span className="min-w-0">
                                <span className="block font-mono text-[10.5px] font-bold tracking-[0.05em] text-ig-muted">
                                  Target ROI
                                </span>
                                {/* no `block` — `.clamp-2` owns display, and the
                                    two would fight on equal specificity */}
                                <span className="clamp-2 mt-1 text-[13px] font-semibold leading-[1.4] text-ig-ink">
                                  {suite.businessImpact}
                                </span>
                              </span>
                              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ig-ink/15 text-ig-ink transition-colors duration-300 group-hover:border-ig-teal-ring group-hover:bg-ig-teal group-hover:text-white">
                                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                              </span>
                            </span>
                          </span>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ---------- INDEX: ruled rows that fill with the brand gradient ---------- */
              <div className={`${SHELL} mt-10`}>

                {/* The list carries a preview card that trails the pointer */}
                {/* no move/leave handlers — the window-level pointer drives it,
                    so the list behaves the same whether you move or scroll */}
                <div ref={listRef} className="relative">
                  {filteredSuites.map((suite, i) => (
                    <Reveal key={suite.id} delay={Math.min(i * 45, 260)}>
                      {/* `data-suite-id` is the handle syncPeek hit-tests for.
                          `row-on` is the lit state — a class rather than
                          :hover, so scrolling a row under the cursor lights it
                          exactly as moving onto it does. The semantic classes
                          below let one CSS rule per part carry that state. */}
                      <button
                        onClick={() => openSuite(suite.id)}
                        data-suite-id={suite.id}
                        onFocus={() => setPreviewOn(false)}
                        className={`row relative block w-full overflow-hidden border-b border-ig-ink/15 text-left ${
                          hoverId === suite.id ? 'row-on' : ''
                        }`}
                      >
                        <span
                          className={`row-fill pointer-events-none absolute inset-0 ${ROW_FILL}`}
                        />

                        <span className="row-ink relative flex items-center gap-5 px-5 py-7 transition-colors duration-300 md:gap-9 md:px-8 md:py-8">
                          <span className="row-num font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider transition-colors duration-300">
                            {suite.number}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="row-name block truncate text-[19px] font-extrabold tracking-[-0.025em] text-ig-ink transition-colors duration-300 md:text-[28px]">
                              {suite.name}
                            </span>
                            <span className="row-tag serif-accent mt-1 block truncate text-[15px] text-ig-purple transition-colors duration-300 md:text-[18px]">
                              {suite.tagline}
                            </span>
                          </span>

                          <span className="row-cta grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ig-ink/20 text-ig-ink transition-colors duration-300">
                            <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                          </span>
                        </span>
                      </button>
                    </Reveal>
                  ))}

                  {previewSuite && (
                    <div
                      ref={previewRef}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 z-30 hidden will-change-transform lg:block"
                    >
                      <div className={`peek ${previewOn ? 'is-on' : ''}`}>
                        {/* Fixed shell clipping one tall reel. Every suite is
                            already rendered inside it, so changing rows moves
                            a single transform and nothing re-mounts. */}
                        <div
                          className="w-[300px] overflow-hidden rounded-[18px] bg-white shadow-[0_34px_80px_-34px_rgba(22,6,58,0.75)]"
                          style={{ height: PEEK_H }}
                        >
                          <div
                            className="peek-reel"
                            style={{ transform: `translate3d(0, ${-peekIndex * PEEK_H}px, 0)` }}
                          >
                            {peekPanels}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        /* =================================================================== */
        /* SUITE DOSSIER                                                       */
        /* =================================================================== */
        <main>
          {/* masthead · FLAVOUR A */}
          <section
            className="aurora relative overflow-hidden pb-16 pt-[104px] md:pb-20 md:pt-[136px]"
          >
            <HeroStage />

            <div className={SHELL}>
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 py-4">
                  <button
                    onClick={goHome}
                    className="group flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-sky transition-colors duration-300 hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to All Suites
                  </button>
                  <span className="border border-ig-teal-ring/40 bg-ig-teal/15 px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-teal-ring">
                    {activeSuite.type === 'foundation'
                      ? 'Universal Foundation Platform'
                      : 'Industry Vertical Suite'}
                  </span>
                </div>

                <div className="grid grid-cols-12 items-end gap-x-10 pt-12 md:pt-20">
                  <div className="col-span-12 lg:col-span-9">
                    <h1 className="font-extrabold leading-[0.93] tracking-[-0.042em] text-[clamp(32px,5.6vw,78px)] text-white">
                      {activeSuite.name}
                    </h1>
                    <p className="serif-accent mt-7 max-w-2xl text-[22px] leading-[1.2] text-ig-lavender/85 md:text-[32px]">
                      {activeSuite.tagline}
                    </p>
                  </div>
                  <div className="col-span-12 mt-10 lg:col-span-3 lg:mt-0 lg:text-right">
                    <span
                      aria-hidden="true"
                      className="stroke-lilac block select-none font-mono text-[96px] font-bold leading-[0.8] md:text-[150px]"
                    >
                      {activeSuite.number}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </section>
          {/* spread · FLAVOUR B */}
          <section className="bg-b dots relative py-20 md:py-28">
            <div className={SHELL}>
              <div className="relative grid grid-cols-12 gap-x-10 gap-y-16">
                <Reveal className="col-span-12 lg:col-span-7">
                  <p className="plate whitespace-pre-line text-[20px] leading-[1.4] tracking-[-0.018em] text-ig-text md:text-[27px]">
                    {activeSuite.executiveSummary}
                  </p>

                  <div className="mt-12 bg-ig-ink px-7 py-7 text-white md:px-9 md:py-8">
                    <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-ig-teal-ring">
                      Target Business Impact
                    </span>
                    <p className="mt-4 text-[17px] font-bold leading-[1.3] tracking-[-0.02em] md:text-[21px]">
                      {activeSuite.businessImpact}
                    </p>
                  </div>

                  <ul className="plate mt-14">
                    {activeSuite.outcomes.map((b, idx) => (
                      <li
                        key={b}
                        className="flex items-start gap-5 border-t border-ig-ink/15 py-6 last:border-b"
                      >
                        <span className="mt-1 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <Check className="mt-1 h-4 w-4 shrink-0 text-ig-teal" strokeWidth={3} />
                        <span className="text-[15px] leading-[1.6] text-ig-text md:text-[17px]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={120} className="col-span-12 lg:col-span-4 lg:col-start-9">
                  <div className="lg:sticky lg:top-28">
                    <div className="border border-ig-ink/12 bg-white">
                      {/* three flat segments, not a blended bar */}
                      <span className="flex h-[4px] w-full">
                        <span className="flex-1 bg-ig-violet" />
                        <span className="flex-1 bg-ig-purple" />
                        <span className="flex-1 bg-ig-teal" />
                      </span>
                      <div className="h-40 overflow-hidden">
                        <img
                          src={activeSuite.imageUrl}
                          alt={activeSuite.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover grayscale"
                        />
                      </div>

                      <div className="p-7">
                        <span className="font-mono text-[11.5px] font-bold tracking-[0.06em] text-ig-divider">
                          Sub-Domains:
                        </span>
                        <div className="mt-5">
                          {activeSuite.subDomains.map((sub, idx) => (
                            <div
                              key={sub}
                              className="flex items-center gap-3.5 border-t border-ig-ink/10 py-3.5 first:border-t-0 first:pt-0"
                            >
                              <span className="font-mono text-[11px] font-bold text-ig-teal">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <span className="text-[14px] font-bold tracking-[-0.01em] text-ig-ink">
                                {sub}
                              </span>
                            </div>
                          ))}
                        </div>

                        <TealButton className="mt-7 w-full">
                          Schedule Executive Briefing
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </TealButton>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
          {/* accelerators · FLAVOUR C */}
          <section className="bg-c dots relative py-20 md:py-28">
            <div className={SHELL}>
              <Reveal className="plate relative flex flex-col gap-6 border-b border-ig-ink/15 pb-9 md:flex-row md:items-end md:justify-between">
                <div>
                  <Kicker index="05">Embedded AI Accelerators</Kicker>
                  <h2 className="mt-7 font-extrabold leading-[0.95] tracking-[-0.038em] text-[clamp(30px,4.6vw,58px)] text-ig-ink">
                    <span className="block">Available Agents</span>
                    <span className="serif-accent block font-normal text-ig-purple">
                      ({activeSuite.accelerators.length})
                    </span>
                  </h2>
                </div>
                <p className="font-mono text-[11px] tracking-[0.05em] text-ig-muted md:pb-2">
                  Click "Test Live Agent" to simulate execution
                </p>
              </Reveal>

              <div className="plate relative">
                {activeSuite.accelerators.map((acc, idx) => (
                  <Reveal key={acc.name} delay={Math.min(idx * 55, 260)}>
                    <div
                      onMouseEnter={setFillOrigin}
                      onMouseLeave={setFillOrigin}
                      className="group relative overflow-hidden border-b border-ig-ink/15"
                    >
                      <span
                        className={`row-fill pointer-events-none absolute inset-0 ${ROW_FILL}`}
                      />

                      <div className="relative grid grid-cols-12 items-center gap-x-8 gap-y-5 py-8 transition-colors duration-300 group-hover:text-white">
                        <div className="col-span-12 flex items-start gap-5 md:col-span-4">
                          <span className="mt-1.5 font-mono text-[11px] font-bold tracking-[0.055em] text-ig-divider transition-colors duration-300 group-hover:text-ig-teal-ring">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.025em] text-ig-ink transition-colors duration-300 group-hover:text-white md:text-[24px]">
                              {acc.name}
                            </h3>
                            <span className="serif-accent mt-1 block text-[16px] text-ig-purple transition-colors duration-300 group-hover:text-ig-sky">
                              {acc.type}
                            </span>
                          </div>
                        </div>

                        <p className="col-span-12 text-[13.5px] leading-[1.6] text-ig-muted transition-colors duration-300 group-hover:text-white/65 md:col-span-5 md:text-[14.5px]">
                          {acc.desc}
                        </p>

                        <div className="col-span-12 flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                          <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-bold tracking-[0.035em] text-ig-teal transition-colors duration-300 group-hover:text-ig-teal-ring">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            Governed DAG Ready
                          </span>
                          <SwapButton
                            onClick={() => runSimulation(acc)}
                            variant="ink"
                            className="shrink-0 px-5 py-3 text-[12.5px] font-semibold"
                          >
                            <Play className="h-3 w-3 fill-current" />
                            Test Agent
                          </SwapButton>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ===================================================================== */}
      {/* AGENT SIMULATOR                                                       */}
      {/* ===================================================================== */}
      {simAccelerator && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ig-ink/88 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSimAccelerator(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pop-c relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border-2 border-ig-ink bg-ig-paper"
          >
            <div className="flex items-center justify-between border-b border-ig-ink/15 px-6 py-4">
              <span className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.06em] text-ig-ink">
                <Cpu className="h-3.5 w-3.5 text-ig-purple" strokeWidth={2.4} />
                Live Agent Pipeline Simulator
              </span>
              <button
                onClick={() => setSimAccelerator(null)}
                aria-label="Close"
                className="text-ig-muted transition-colors hover:text-ig-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-[30px] font-extrabold leading-none tracking-[-0.035em] text-ig-ink md:text-[40px]">
                {simAccelerator.name}
              </h3>
              <p className="serif-accent mt-2 max-w-lg text-[17px] leading-[1.3] text-ig-purple">
                {simAccelerator.desc}
              </p>

              {/* pipeline */}
              <div className="mt-8 flex items-stretch">
                {[
                  { label: 'Input Ingestion', node: 'Node 1', step: 1 },
                  { label: 'Agent Execution', node: 'Node 2', step: 2 },
                  { label: 'Enterprise Outcome', node: 'Node 3', step: 3 }
                ].map((n, i) => {
                  const reached = simStep >= n.step;
                  const running = simStep === n.step && n.step === 2;
                  const done = reached && !running;
                  return (
                    <React.Fragment key={n.node}>
                      {i > 0 && (
                        <div className="relative mt-8 h-px w-4 shrink-0 self-start bg-ig-divider md:w-8">
                          <span
                            className={`absolute left-0 top-0 h-px bg-ig-teal transition-all duration-700 ease-out ${
                              reached ? 'w-full' : 'w-0'
                            }`}
                          />
                        </div>
                      )}
                      <div
                        className={`flex-1 border p-4 transition-colors duration-500 ${
                          running
                            ? 'border-ig-ink bg-ig-ink text-white'
                            : reached
                              ? 'border-ig-teal bg-ig-teal/10 text-ig-ink'
                              : 'border-ig-ink/20 text-ig-muted'
                        }`}
                      >
                        <span className="block font-mono text-[11.5px] font-bold tracking-[0.055em] opacity-50">
                          {n.node}
                        </span>
                        <span
                          className={`mt-1.5 block text-[13px] font-extrabold leading-tight tracking-[-0.01em] ${
                            reached ? '' : 'opacity-45'
                          }`}
                        >
                          {n.label}
                        </span>
                        <span className="mt-3 flex h-4 items-center">
                          {running && <Activity className="h-4 w-4 animate-spin" />}
                          {done && <Check className="h-4 w-4 text-ig-teal" strokeWidth={3} />}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* stream — the one place a true console reads right */}
              <div className="mt-8 bg-ig-console p-4 font-mono text-[11.5px] leading-relaxed">
                <div className="mb-2.5 flex items-center gap-2 border-b border-white/10 pb-2 text-white/35">
                  <Terminal className="h-3.5 w-3.5" />
                  <span className="tracking-[0.055em]">Execution Status Stream</span>
                </div>
                <div className="text-white/45">
                  [00:00.10] Initializing agent payload context...
                </div>
                {simStep >= 2 && (
                  <div className="msg-in text-white/75">
                    [00:01.20] Executing domain rules &amp; policy guardrails...
                  </div>
                )}
                {simStep === 3 && (
                  <div className="msg-in font-bold text-ig-teal-ring">
                    [00:02.50] Status 200 OK: Generated outcome verified successfully
                  </div>
                )}
              </div>

              <div className="mt-7 flex justify-end">
                <TealButton onClick={() => setSimAccelerator(null)}>Close Tester</TealButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* EXECUTIVE ASSISTANT                                                   */}
      {/* ===================================================================== */}
      <div className="fixed bottom-5 right-5 z-[55] md:bottom-7 md:right-7">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="group flex items-center gap-3 rounded-full bg-ig-ink py-3.5 pl-5 pr-6 text-white shadow-[0_16px_36px_-18px_rgba(22,6,58,0.7)] transition-colors duration-300 hover:bg-ig-violet-500"
          >
            <span className="relative">
              <Bot className="h-4 w-4" strokeWidth={2} />
              <span className="absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-ig-sky" />
            </span>
            <span className="font-mono text-[11.5px] font-bold tracking-[0.05em]">
              Ask Ignitho AI
            </span>
          </button>
        ) : (
          /* `overflow-hidden` is what makes the radius real — without it the
             header rule and the scroll area square the corners back off */
          <div className="pop-br flex h-[calc(100vh_-_7rem)] max-h-[520px] w-[calc(100vw_-_2.5rem)] max-w-[370px] flex-col overflow-hidden rounded-[22px] border border-ig-sky/25 bg-ig-console text-white shadow-[0_28px_64px_-28px_rgba(3,3,3,0.75)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <h4 className="text-[13px] font-extrabold tracking-[-0.01em]">
                  Ignitho AI Executive Assistant
                </h4>
                <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.05em] text-ig-sky">
                  <span className="h-1.5 w-1.5 rounded-full bg-ig-sky" />
                  Online • Governed AI
                </span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                aria-label="Minimize"
                className="text-white/45 transition-colors hover:text-white"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`msg-in flex gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ig-sky/30 text-ig-sky">
                      <Bot className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'rounded-br-md bg-ig-teal text-white'
                        : 'rounded-bl-md border border-white/10 bg-white/[0.05] text-white/80'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="msg-in flex items-center gap-2.5">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ig-sky/30 text-ig-sky">
                    <Bot className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-3">
                    <span className="dot-1 h-1.5 w-1.5 rounded-full bg-ig-sky" />
                    <span className="dot-2 h-1.5 w-1.5 rounded-full bg-ig-sky" />
                    <span className="dot-3 h-1.5 w-1.5 rounded-full bg-ig-sky" />
                  </span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-3 py-2.5">
              {["What's the ROI?", 'HIPAA Compliance?', 'Deployment Time?'].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="rounded-full border border-ig-sky/25 px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.03em] text-ig-sky transition-colors duration-300 hover:border-ig-teal-ring hover:bg-ig-teal hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                type="text"
                placeholder="Ask about Ignitho AI ROI, security, or deployment..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 font-mono text-[11px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-ig-teal-ring"
              />
              <button
                onClick={() => handleSendMessage()}
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ig-teal text-white transition-colors duration-300 hover:bg-ig-teal-hover"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* CLOSING CTA + COLOPHON · FLAVOUR A (the bottom bookend)               */}
      {/* ===================================================================== */}
      {/* The closing bookend, on the same ground as the hero rather than a flat
          dark band. Body copy moves to lavender with it: low-alpha white reads
          grey and lifeless over this gradient, which is the whole reason the
          brand specifies a tinted colour for it. */}
      <footer className="aurora dots-inv relative pt-16 md:pt-20">
        <div className={SHELL}>
          <div className="relative">
            {/* the closing statement */}
            <Reveal className="grid grid-cols-12 items-end gap-x-10 gap-y-8 pb-11">
              <div className="col-span-12 lg:col-span-8">
                <span className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-[11px] font-bold tracking-[0.055em] text-ig-lavender/80">
                  Ignitho AI Platform
                </span>
                <h2 className="mt-6 max-w-[17ch] font-extrabold leading-[0.98] tracking-[-0.04em] text-[clamp(28px,4.2vw,52px)] text-white">
                  Transforming enterprise IT through{' '}
                  <span className="serif-accent font-normal text-ig-sky">
                    workflow-driven AI accelerators
                  </span>
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:pb-3 lg:text-right">
                <TealButton className="w-full sm:w-auto">
                  Schedule Executive Briefing
                  <ArrowRight className="h-3.5 w-3.5" />
                </TealButton>
              </div>
            </Reveal>

            {/* the directory */}
            <Reveal className="grid grid-cols-12 gap-x-10 gap-y-9 border-t border-white/15 py-11">
              <div className="col-span-12 lg:col-span-6">
                <span className="block font-mono text-[11px] font-bold tracking-[0.03em] text-ig-lavender/45">
                  Enterprise Catalog
                </span>
                <div className="mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {footerDirectory}
                </div>
              </div>

              <div className="col-span-6 lg:col-span-3">
                <span className="block font-mono text-[11px] font-bold tracking-[0.03em] text-ig-lavender/45">
                  Menu
                </span>
                <div className="mt-4 flex flex-col items-start gap-3">
                  {NAV_LINKS.map((label) => (
                    <button
                      key={label}
                      onClick={navAction(label)}
                      className="group relative text-[15px] font-semibold text-ig-lavender/75 transition-colors duration-300 hover:text-white"
                    >
                      {label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-ig-teal-ring transition-all duration-300 group-hover:w-full" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-6 lg:col-span-3">
                <span className="block font-mono text-[11px] font-bold tracking-[0.03em] text-ig-lavender/45">
                  Compliance
                </span>
                <div className="mt-4 flex flex-col gap-3">
                  {CERTS.map((cert) => (
                    <span
                      key={cert}
                      className="flex items-center gap-2.5 text-[13.5px] font-medium text-ig-lavender/70"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-ig-teal-ring" strokeWidth={3} />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* the wordmark, set edge to edge, as the closing image */}
        <div aria-hidden="true" className="overflow-hidden border-t border-white/15 px-5 pt-7 md:px-8">
          <span className="stroke-paper block select-none whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.05em] text-[clamp(34px,7.5vw,112px)] opacity-25">
            Ignitho AI
          </span>
        </div>

        <div className={`${SHELL} py-5`}>
          <p className="text-center font-mono text-[11px] tracking-[0.055em] text-ig-lavender/45">
            © 2026 Ignitho Technologies. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

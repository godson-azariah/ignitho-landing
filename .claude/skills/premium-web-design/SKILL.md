---
name: premium-web-design
description: The single combined design skill (Anthropic frontend-design + Impeccable + Taste + UI/UX Pro Max + design-anti-slop + anti-slop-design + design-taste-frontend + design-taste + Emil Kowalski apple-design/animate). Use it for any web page, section, component or motion work to produce premium, corporate, non-templated design.
---

# Premium Web Design

One process, one slop checklist, one set of rules. Merged from eleven sources and reconciled for this
project. Where sources disagreed, one rule was chosen and the reason is given in a short clause.
Full originals live in `references/` (see the last section for when to open which).

## 0. Project context (read first)

- **Site:** Ignitho's FRIEND landing site. React 19 + Vite. Tailwind via CDN plus hand-written CSS in
  `src/styles/*.css` (tokens in `base.css`, e.g. `--ink`, `--purple`, `--violet-800`, `--indigo`,
  `--lavender`, `--paper`, `--teal`, `--ease-out`). Deps: `gsap`, `lucide-react`. Checks:
  `npm run lint`, `npm run build`, `npm run check`.
- **Brand palette:** ink `#16063A`, purple `#7A00C2`, violet-800 `#2C0A78`, indigo `#4A2FD4`,
  lavender `#D6CDEE`, paper `#FBF9FF`. Teal `#00A274` is for actions only (CTAs, focus, live state).
- **Font:** Outfit, the user's choice. Keep it. Sans-only: no serif, script or "curly" faces, no mono
  labels. Outfit has no true italic, so never rely on italic for emphasis (it would be faux-slanted).
- **Taste target:** top-tier "billion-dollar corporate" (Stripe, Linear, Vercel, Google DeepMind
  register): clean, well structured, premium, calm confidence. Not playful, not childish, not
  agency-experimental. The user hates anything that looks AI-generated.
- **Hard constraint:** never use Higgsfield, for images, video or anything else.
- **The user's brief always overrides every generic rule below**, including the slop list. Honor
  pinned fonts, colours and structures even when a rule here warns against them.
- Section backgrounds no longer follow a forced dark/lavender/white alternation; any clean,
  professional sequence from the brand family is allowed.
- Show screenshots as proof when proposing or finishing visual work; keep research token-lean.
- If the older project skill `corporate-web-design` is also loaded, its site specifics still apply;
  this skill governs process and the quality bar.

## 1. Decision priority

1. The user's explicit words in this conversation.
2. Project context above (brand, font, stack, bans).
3. Accessibility and the quality floor (section 11). Never traded away for looks.
4. This skill's rules.
5. Generic taste. Redirecting a clear brief toward your own taste is failure (Impeccable).

## 2. Process

Brief -> direction -> token plan -> review plan against slop tells -> build -> screenshot
self-critique -> polish. Never ship the first version as final, but verify in bounded passes, not an
open loop.

### 2.0 Classify the job (30 seconds)

- **Surface mode** (from the surface, not the product): *Persuade* (landing, marketing: this site),
  *Operate* (app UI, dashboards, forms), *Read* (docs, articles), *Experience* (showcase). A tool's
  landing page is still Persuade.
- **Work mode:**
  - *Refine* preserves identity, behaviour, copy and everything outside scope. Ask before replacing
    factual copy or adding claims.
  - *Redesign* keeps product truth, content, IA, URLs and function, but treats the old look as
    evidence and anti-reference. Never split the difference into polish on a discarded look.
  - *New surface* inherits the site's existing tokens and components unless told otherwise.
- **Depth by stakes:** real customer-facing section = full process. Throwaway exploration = short
  path, but name the defaults you fell back on.
- **Never silently change:** routes/slugs, anchor IDs, primary nav labels, form field names/order,
  the logo/wordmark, legal or consent copy, analytics hooks.

### 2.1 Brief (pre-generation)

Write a one-line **Design Read** before any code:
> "Reading this as: <surface> for <audience>, with a <vibe> language, leaning toward <family>."

Then fill five axes (from design-anti-slop's pre-gen brief). Missing answers are where slop comes from:
1. **Claim:** the single most specific true thing this section must say (verb + real product noun +
   something a competitor could not copy-paste).
2. **Asset:** the real thing shown (product screenshot, real UI state, real data, real logo).
3. **Typography:** role of each size/weight step in this section.
4. **Colour:** which brand tokens, where the one accent moment is.
5. **Avoid:** 2-3 category habits this section will deliberately not do.

Ground it in the subject: FRIEND's own vocabulary, workflows and outputs are where distinct choices
come from, not "AI SaaS" category habits. If the brief is genuinely ambiguous, ask **one** question,
never a list; if you can infer confidently, declare and proceed.

**Dials** (taste-skill), for this site: `DESIGN_VARIANCE 5-6`, `MOTION_INTENSITY 4-5`,
`VISUAL_DENSITY 3-4`. Corporate premium sits between "Linear-clean" and "premium brand"; higher
variance reads agency, lower reads template.

### 2.2 Direction

- List 2-3 directions wide, not deep (layout concept, type treatment, one signature move each).
  Pick one and say why in one line. With the user online and stakes high, let them pick.
- **Category audit:** list what AI/SaaS/enterprise-AI landing pages always do; forbid 2-3 of those
  habits for this piece.
- **Spend boldness in one place.** Name the single memorable element (a scale contrast, a precise
  product visual, a composition break). Everything around it stays quiet and disciplined.
  *Reconciled:* anti-slop-design wants "one decision a committee would reject"; for this user that
  means one confident, well-crafted move, never chaos or whimsy.
- **Device budget:** at most 5 built devices per page (1 signature + 2 supporting + 2 optional),
  and at most 2-3 craft techniques per page. Each must answer a line of the brief.
- **Share shot:** name the frame someone would screenshot. No share shot, rethink.

### 2.3 Token plan

Write it down before building (compact, not a document):
- **Colour:** 4-6 named tokens from the brand palette with their roles (surface, text, muted,
  brand, accent-action, rule).
- **Type:** Outfit roles and a scale (see section 4).
- **Layout:** one-sentence concept plus a tiny ASCII wireframe; alignment rule (left-aligned by
  default for corporate reading; centre only with a reason).
- **Shape + elevation:** the radius rule and the elevation ladder (section 6).
- **Motion:** which moment moves and why, using the easing/duration tokens (section 8).
- **Principles:** 2-3 lines on what makes this piece specific.

Extend existing tokens in `src/styles`; never fork a parallel system.

### 2.4 Review the plan against slop (before code)

- **Sameness test:** would this plan look at home on any similar brief? Work a similar prompt in
  your head; if you arrive at the same place, revise that part and say what changed and why.
- **Category-reflex check**, two altitudes: (1) could someone guess the look from "AI platform"
  alone? (2) could they guess it from "AI platform that avoids the obvious"? Rework until neither.
- **Ceiling gate:** executed flawlessly with what is actually available, is this a 9/10? If not, go
  back to 2.2 (at most twice), then ship the best available.
- Run the plan through section 3. Fix at the deepest broken layer first.

### 2.5 Build

- Production-grade, exact values, real content. Build interaction and visuals together; motion is not
  a layer added afterwards.
- Watch CSS specificity: section-level and element-level selectors silently cancel each other
  (padding/margin between sections is the usual victim). Prefer one owner per property.
- Declare the `<768px` collapse for every multi-column layout in the same component.
- Check `package.json` before importing anything; do not add a library for something CSS can do.

### 2.6 Screenshot self-critique (bounded)

- Render and screenshot desktop (~1440px) and mobile (~390px) together in one batched round. Look
  eyes-first at the renders before reading source.
- Critique as a fresh reviewer against a frozen rubric: hierarchy, spacing rhythm, typography,
  colour discipline, specificity of content, motion, slop tells, a11y floor. Do not move the bar
  mid-review.
- Rank fixes by layer: **conceptual (claim, asset) > structural (composition) > visual (tokens)**.
  A beautiful palette on a hollow claim is still slop. A clean audit is a valid result; do not pad.
- Fix everything found in one batch, confirm with **at most one more round**, then stop.
  *Reconciled:* anti-slop-design runs up to 8 critic rounds; Impeccable's bounded passes win because
  the user is token-conscious and extra rounds mostly re-polish.
- Keep a do-not-regress list of fixed defects and re-check it in the confirm round.
- For code reviews, report as one markdown table: `| Before | After | Why |`.

### 2.7 Polish

- **Subtraction pass:** for every element ask "does the page get worse without it?" No concrete
  answer, remove it. Before leaving the house, remove one accessory.
- **Defaults double pass:** interrogate visual habits and copy habits separately; each instance is
  either a justified choice or gone.
- **Hand-write** the load-bearing copy: headline, primary CTA, empty and error states.
- Run the pre-flight (section 12).

## 3. AI slop tells (consolidated)

Match and refuse. Each item is a default, not a choice; the brief can still ask for one. Gates in
*italics* say when it is not slop.

**Conceptual (fix first; these have no tasteful variant)**
- Aspirational-empty headline: "Build the future of work", "The all-in-one platform for X",
  "Scale without limits", "Where teams do their best work".
- Section genericity: security/integrations/pricing sections that any competitor could paste.
- Abstract demo in place of the real product (glowing orb, 3D clay, lorem-data dashboard).
- No point of view: never says what it is not, whom it is not for, or what it replaces.
- Fake specificity: "3x faster", "10,000+ teams", "99.99%", "48k" with no source.
- Missing functional states: only the resting screenshot state was designed.

**Structural**
- Canonical SaaS hero: centred H1 + subhead + two CTAs + logo strip + abstract visual.
  *Centering is fine with a real product asset directly below and one primary CTA.*
- Three-box feature grid: icon in a rounded square + two-word title + one filler line.
  *Fine when items are genuinely peer-level, each with a real screenshot or specific claim.*
- Identical card grids; uniform-everything page (same padding, radius, shadow, height, rhythm).
- Bento of placeholders; empty bento cells; all-white text-only bento tiles.
  *Fine when every tile carries real content and one tile dominates.*
- Hero-metric template: big number, small label, supporting stats, gradient accent.
- Logo soup: 5-8 faded logos, "Trusted by", placeholder brands. *2-4 real logos with context are fine.*
- Stock testimonial carousel with invented quotes and avatars.
- Decorative chart with no axes, question or source; four-KPI row chosen because four fit.
- Split header: big headline left, tiny explainer paragraph floating top-right.
- Zigzag image/text rows three or more times in a row; the same layout family reused across sections.
- Eyebrow above every section; numbered section markers (`01 / 02 / 03`, `001 · Capabilities`)
  when the content is not a real sequence; "Step 1 / Stage 1 / Phase 01" labels.
- Hero clutter: tagline under CTAs, trust micro-strip, pricing teaser, version badge (`BETA`,
  `v2.0`), decorative text strip (`DESIGN · BUILD · SHIP`), scroll cue ("Scroll to explore").
- Nested cards; generic sidebars named after template inventory rather than user tasks.
- Two marquees on one page; long lists as `divide-y` rows with a hairline under every row.

**Visual**
- Default violet-to-blue gradient washes, purple glows, neon outer glows. *This brand is genuinely
  violet, so violet is allowed; the tell is gradient-as-decoration and glow-as-emphasis.*
- Gradient text (`background-clip: text`) on headlines.
- Single-weight typography with no scale tension; one accent word coloured or bolded in a headline.
- Tracked-out ALL-CAPS micro labels; monospace used for small labels and meta strings.
- `rounded-2xl` on everything; cards at 24-40px radius; one radius regardless of hierarchy.
- The same soft grey `shadow-sm`/`rgba(0,0,0,.1)` under every card; 1px border + wide (16px+)
  blur shadow on the same element ("ghost card").
- Side-stripe accent borders (`border-left` > 1px coloured) on cards, callouts, list items.
- Random gradient blobs and radial glows behind the H1. *Fine when the shape visualises the product.*
- Glassmorphic cards on a purple backdrop; glass stacked on glass.
- AI "3D clay" renders; hand-drawn/sketchy SVG scenes; `feTurbulence` paper grain as decoration;
  `repeating-linear-gradient` stripe backgrounds; decorative crosshair/hairline grids.
- Div-built fake product UI (fake terminal, fake task list) with fake version footers.
- Icon soup: identical 24px outline icons stamped in 48px rounded squares.
- Decorative status dots before nav items, badges or rows.
- Pills or tags overlaid on photos; decorative photo credits; locale/time/weather strips.
- Warm cream + serif + terracotta; near-black + acid green; broadsheet hairline layout: the three
  current AI "looks". Pure `#000`/`#fff`; oversaturated accents; custom cursors.

**Copy**
- Em dashes (U+2014) or en dashes (U+2013) anywhere visible. Zero. Use commas, colons, periods,
  parentheses or a hyphen.
- Verb slop: seamless(ly), empower, revolutionize, unlock, effortless(ly), transform, supercharge,
  elevate, streamline, unleash, next-gen, world-class, cutting-edge, game-changing, robust.
- Adjective stacks with no nouns ("powerful, intuitive, scalable").
- "Not just X, it's Y", "X theater", "actually X"; performative-craftsman labels ("Field notes",
  "Quietly trusted by", "On our desks"); micro-meta sentences under headings.
- Middle-dot chains ("A · B · C · D"); "WORD, spaced em dash, fragment" labels; `→` appended to every link.
- Generic names (John Doe, Sarah Chen), startup-slop brand names (Acme, Nexus), fake-perfect numbers.
- Two CTAs with the same intent ("Get in touch" and "Let's talk"); CTA labels that wrap.

**Motion**
- Fade-and-slide-up on every section and every card; everything staggered.
- Infinite loops (pulse, float, shimmer) on informational content.
- `transition: all`; `ease-in` on UI; entrances from `scale(0)`; popovers scaling from centre.
- Scroll-jacking or pinned sequences without a narrative reason; parallax on everything.
- Animation on keyboard-triggered or high-frequency actions.
- "Motion claimed, motion missing" or half-built motion (cut-off triggers, jumpy entrances).

## 4. Typography

- **Outfit only.** Hierarchy comes from size + weight + tracking + leading as a set, not colour.
  (*Reconciled:* taste-skill discourages Inter and lists Outfit as a good default; Apple prefers
  system fonts; the user's choice wins.)
- **Scale:** marketing ratio 1.25-1.333 between steps; Operate/UI 1.125-1.2. Body 16-18px, never
  below 14px for anything readable, 12px only for legal/meta.
- **Display:** `clamp()` with max about 4.5-6rem; line-height 1.05-1.15; tracking -0.02em to
  -0.035em (floor -0.04em). Weight 500-600 reads corporate; 700+ only for short, large lines.
- **Body:** weight 400, line-height 1.5-1.6, measure 60-75ch (cap at 80). Small text gets slightly
  positive tracking; body stays at 0. Tracking is size-specific, never one global value.
- **Headings:** `text-wrap: balance`; prose `text-wrap: pretty`. Hero headline at most 2 lines on
  desktop; a 4-line hero is a font-size error.
- **Emphasis:** default none. If needed, a weight shift within Outfit. No coloured accent word, no
  gradient word, no second family, no italic.
- **Labels:** sentence case, no wide tracking. Numbers in stats use `font-variant-numeric: tabular-nums`.
- Use `rem` so user font-size settings scale the layout. Self-host or preload fonts with
  `font-display: swap`; confirm the font actually loaded in screenshots.

## 5. Colour

- **Roles, locked across the whole page:** ink for text and dark blocks, paper/paper-2 for surfaces,
  lavender for quiet tinted surfaces, purple/violet/indigo for brand moments, teal only for
  actions. Never introduce a third hue family (no blue CTA in section 7, no amber badge).
  (*Reconciled:* taste's "one accent" becomes "one action colour (teal) + one brand family (violet)".)
- **Gradients:** at most one load-bearing brand gradient per view, built from two brand tokens that
  mean something, surrounded by calm neutrals. Never on text, never as a wash behind everything.
- Tint neutrals and shadows toward the brand hue (e.g. `rgb(22 6 58 / 0.08)`), never pure black.
  No pure `#000`/`#fff`; ink and paper already satisfy this.
- Grey text on a coloured surface looks washed out: use a darker or lighter shade of that surface's
  own hue.
- **Contrast (verify, do not eyeball):** body and UI text >= 4.5:1; large text (>= 24px, or
  >= 18.7px bold) and UI boundaries/focus rings >= 3:1. Muted text on lavender is the usual failure.
- **Teal note:** white on `#00A274` is about 3.3:1, so it passes only as large text. For normal-size
  button labels use a darker teal fill that reaches 4.5:1 or ink text on teal (about 5.7:1). Never
  use teal for small body text or links on paper.
- **Theme:** light-led page. Dark ink blocks are allowed as deliberate anchors (e.g. a product band,
  the closing CTA), never a mechanical alternation. Dual dark/light mode is not required for this
  site (brand-controlled marketing page, office-light desktop audience) unless the user asks.
  (*Reconciled:* taste wants dual-mode by default; the scene justification applies here.)

## 6. Layout, spacing, shape

- **Spacing:** 4/8px scale; vary it for rhythm (tight inside groups, generous between groups).
  Section padding for this density about 96-160px desktop, 64-96px mobile. Equal padding everywhere
  is the uniform-everything tell.
- **Grid:** CSS Grid for 2D, flex for 1D, no percentage calc math. Contain content at one max-width
  used site-wide. Prefer asymmetric splits (5/7, 4/8, 1fr 2fr) over 50/50 for text + asset.
- **Hierarchy:** decide the 3-4 most important moments per page (hero moment, anchor proof, closing
  CTA) and let them break rhythm with size, height or surface. Everything else recedes.
- **Variety:** at least 4 layout families across 8 sections; never 3 consecutive image/text splits;
  one marquee max; bento cell count equals item count, with one dominant tile.
- **Content shape per Persuade section:** headline <= 8 words, sub <= 25 words, one visual or one
  CTA. More than 5 list items needs a better component (grouped columns, tabs, featured-plus-rest).
- **Hero:** fits the first viewport (`min-height: 100dvh` at most, never `100vh`/`h-screen`), top
  padding <= about 6rem, max 4 text elements (optional label, headline, sub <= 20 words, CTAs:
  1 primary + at most 1 secondary). Logos and proof go in the section below, not inside the hero.
- **Nav:** one line on desktop, 64-72px tall (80px max); wayfinding answers where am I, where can I
  go, how do I get back.
- **Radius (one documented rule, applied everywhere):** e.g. buttons pill, inputs 8px, cards
  12-16px max, media 12-16px or square. Radius signals role, not mood.
- **Cards:** only when elevation communicates real hierarchy; otherwise group with space or a single
  rule. Never nested cards. One divider convention per list.
- **Elevation ladder:** 0 flat in-flow, 1 subtle raised card, 2 popover/menu, 3 modal, 4 dragging.
  Real shadows only for things that float; border OR shadow, never both as decoration.
- **Glass:** only for chrome floating over moving content (sticky nav), blur 12-24px, one layer,
  solid fallback under `prefers-reduced-transparency`. Replace hard 1px header borders with a soft
  scroll-edge fade where content meets floating chrome.
- **z-index:** a named scale (base, sticky, dropdown, overlay, modal, toast, tooltip) as tokens;
  never 999/9999.

## 7. Components and interaction states

- Every interactive element ships all relevant states: **default, hover, focus-visible, active,
  disabled, loading, error, success** (plus empty for anything that fetches). Hover is not focus.
- **Focus:** never `outline: none` without a `:focus-visible` replacement: 2-3px ring, 2px offset,
  >= 3:1 against neighbours, consistent everywhere (teal ring token).
- **Press:** respond on pointer-down. `:active { transform: scale(0.97) }` at 100-160ms ease-out.
- **Hover:** gate motion behind `@media (hover: hover) and (pointer: fine)`; subtle colour or 1-2px
  lift, never scale jumps on large cards.
- **Buttons:** verb + object, 1-3 words, one line at desktop, one label per intent across nav, hero
  and footer. Touch targets >= 44x44px with >= 8px spacing.
- **Forms:** visible label above input, never placeholder-as-label; helper text in markup; validate
  on blur; error below the field wired with `aria-describedby`; say what went wrong and how to fix.
- **Loading:** skeletons shaped like the final layout over spinners; optimistic updates only for
  low-stakes actions.
- **Overlays:** native `<dialog>` + `inert`, the Popover API, anchor positioning or a portal; never an
  absolutely positioned dropdown clipped by `overflow: hidden`. Modals centred; popovers originate
  from their trigger.
- **Destructive actions:** undo beats confirmation; confirm only the irreversible.
- **Keyboard:** logical tab order, skip link, roving tabindex for tab/radio groups, Escape closes.
- **Icons:** the project already uses `lucide-react`, so keep one family with one stroke width.
  Icons are functional (nav, status, inline); never decorative stamps in feature grids; no
  hand-drawn icon paths; icon-only buttons get `aria-label`. (*Reconciled:* taste discourages Lucide
  but allows it when the project already depends on it; the tell is the soup, not the library.)
- **Logo:** clicking it on the home page scrolls to top (existing behaviour; keep).

## 8. Motion

### 8.1 Gate: should it move at all?
| Frequency | Decision |
| --- | --- |
| 100+ times a day, keyboard-initiated | Never animate |
| Tens of times (hover, list navigation) | Near-imperceptible or nothing |
| Occasional (menus, modals, drawers, toasts) | Standard UI motion |
| Rare (page load, first reveal, success) | The delight budget lives here |

Name the purpose in one word: feedback, spatial consistency, state change, preventing a jarring
change, explanation. "Looks cool" on a frequent element means no. Data people are reading does
not move for style.

### 8.2 The marketing-page motion budget
- **One orchestrated moment** (the hero load sequence or one signature reveal) lands better than
  scattered effects. *Reconciled:* frontend-design says entrances on every section read as AI;
  taste says "motion claimed, motion shown". Result: one hero sequence plus restrained reveals on a
  few key sections, never on every card and never on body copy blocks by reflex.
- Reveals: opacity + 8-24px translate (or a `clip-path: inset()` wipe for media), `once: true`,
  trigger when about 20-30% visible, stagger 30-80ms between siblings, max about 5 staggered items.
- No infinite loops on informational content. Ambient motion only if it encodes real state.
- Never block interaction while something animates.

### 8.3 Tool: cheapest that works
CSS transition (hover, press, toggles) > CSS `@starting-style` (entry on mount) > CSS animation
(predetermined, stays smooth under load) > WAAPI (`element.animate`) > GSAP (already installed:
use for ScrollTrigger scrubbing/pinning and timelines). Do not add Motion/Framer for a fade.

### 8.4 Properties
- Animate `transform` and `opacity`; `clip-path` and small `filter: blur()` (< 20px) when measured
  smooth. Never `width/height/top/left/margin/padding` (accordion height is the one tolerated case).
- Never `transition: all`; name properties. Never enter from `scale(0)`: use `scale(0.95)` +
  `opacity: 0`. `transform-origin` at the trigger for popovers/menus/tooltips; modals stay centred.
- Prefer `translateY(100%)`-style percentages over pixel guesses. Do not drive children's transforms
  through a CSS variable on the parent (restyles every child); set `transform` on the element.
- `will-change` only on elements about to animate.

### 8.5 Easing and duration tokens (one set, site-wide)
```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);   /* enter/exit, UI response (default) */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement/morph */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* sheets, drawers */
```
Enter/exit: ease-out. Moving on screen: ease-in-out. Hover/colour: `ease`. Constant (marquee,
progress): linear. **Never ease-in on UI.** In GSAP, register `CustomEase` with the same beziers
(or use `expo.out` consistently); do not mix ad-hoc curves. Reuse the existing `--ease-out` token.

| Element | Duration |
| --- | --- |
| Press feedback | 100-160ms |
| Tooltip, small popover | 125-200ms |
| Dropdown, select | 150-250ms |
| Modal, drawer | 200-500ms |
| Marketing reveal / hero sequence | 500-900ms total per element, sequence under about 1.2s |

UI stays under 300ms. Exits are faster than entrances.

### 8.6 Springs and Apple-style physics
- Use springs for anything the user can grab, drag, flick or interrupt. Default critically damped
  (damping 1.0, response 0.3-0.4s, i.e. `bounce: 0`); add bounce (damping about 0.8, bounce
  0.1-0.3) only when a gesture carried momentum. No bounce on menus or reveals: corporate, not playful.
- **Interruptible always:** start new motion from the current on-screen value, never the target;
  never lock input during a transition. Transitions (not keyframes) for anything triggered rapidly.
- **Spatial consistency:** exit along the entry path; things emerge from their source.
- **Direct manipulation:** 1:1 tracking with pointer capture, respect the grab offset, about 10px
  hysteresis before committing a direction, rubber-band at edges instead of hard stops, hand off
  release velocity, project momentum to pick the snap point.
- Hint in the direction of travel; intermediate frames should point at the outcome.

### 8.7 Scroll
- Never `window.addEventListener('scroll')` or scroll values in React state. Use
  IntersectionObserver, GSAP ScrollTrigger, or CSS scroll-driven animations.
- Pinned sequences: `start: "top top"`, pin the wrapper, scrub the inner track, only with a real
  narrative reason. Clean up in React effects with `gsap.context()` and `ctx.revert()`.
- No scroll-velocity skew, no whole-page colour-temperature shifts, no giant background words: these
  are agency moves, not corporate ones.

### 8.8 Reduced motion and comfort
- `prefers-reduced-motion: reduce`: fewer and gentler, not zero. Keep opacity/colour crossfades,
  drop translate/scale/parallax/pins/loops. Ship the fallback with the animation, not later.
- Respect `prefers-reduced-transparency` (solid surfaces) and `prefers-contrast: more`.
- Avoid full-viewport moving backgrounds, slow looping oscillations, abrupt brightness jumps.
- Feel-check: play at 2-5x duration, step frame by frame in DevTools, look again later with fresh eyes.

## 9. Imagery and visual assets

- **Real first:** actual FRIEND product screenshots/UI states, real brand assets from `public/`,
  real customer logos. A precise coded preview is acceptable only when it is a faithful mini-version
  of the real product with realistic data, not generic rectangles.
- **Code-drawn artwork** (globe, device frames, scene illustrations) is allowed when it is precise,
  geometric and tied to what the product does (e.g. markers that mean real locations). Never
  sketchy, doodled, clay-3D or decorative blobs with no referent.
- **Generated imagery:** only with tools the user has approved. **Never Higgsfield.** If no
  approved source exists, leave labelled slots (`<!-- TODO: hero product shot, 1600x1000 -->`) and
  list them for the user; do not fill gaps with fake UI or hand-rolled illustration.
- No stock-feel diverse-team-at-laptop photos, no AI 3D clay, no pills overlaid on images, no fake
  photo credits.
- **Logos:** real SVGs, logo-only (no category labels under them), consistent treatment (full
  colour or one mono tone), 2-4 with context beat 8 without. Invented brand names get no fake logos.
- **Performance:** WebP/AVIF, explicit width/height or aspect-ratio (CLS < 0.1), lazy-load below the
  fold, preload the hero image, meaningful `alt` (decorative images `alt=""`).

## 10. Copywriting

- Words exist to make the page easier to understand and act on. Write from the buyer's side in plain
  language: name things by what users get, not how the system is built.
- **Headlines:** the most specific true claim (verb + concrete noun + a differentiator). "Send
  invoices in 10 seconds" beats "Simplify your workflow". Sentence case. <= 8 words for sections.
- **Body:** nouns and verbs first; cut adjectives and adverbs, keep only what survives. One register
  per page (confident corporate), no mixing of terminal-speak, poetry and hype.
- **CTAs:** say exactly what happens ("Book a demo", "See how it works"); the same action keeps the
  same name through the flow; one label per intent.
- **Numbers and proof:** only sourced figures; otherwise a true qualitative claim. Testimonials only
  if real: one at full size, <= 3 lines, name + role + company, link to source when possible.
- **Point of view:** include one position a competitor would not state.
- **Errors and empty states:** what happened + how to fix, no apologies, no vagueness; empty states
  invite the first action.
- **Punctuation:** zero em/en dashes; middle dot at most once per line; typographic quotes or none.
- **Refinement mode:** keep existing factual copy; ask before rewriting claims.
- **Copy self-audit before shipping:** reread every visible string (headlines, labels, alt text,
  footer). Rewrite anything grammatically off, with unclear referents, cute-but-wrong, or
  "LLM trying to sound thoughtful". Boring and clear beats clever and odd.

## 11. Accessibility and quality floor (never announced, always met)

- Contrast per section 5; visible focus everywhere; full keyboard operation; skip link; semantic
  landmarks and heading order; icon-only controls labelled; no information by colour alone.
- Reduced motion (and transparency/contrast preferences) respected.
- Responsive from 320px up with no horizontal scroll; zoom never disabled; test headline overflow at
  every breakpoint (long words + big clamp + narrow grid is the classic break).
- Touch targets >= 44px; hover never the only path to information.
- Core Web Vitals plausible: LCP < 2.5s, INP < 200ms, CLS < 0.1. Heavy art lazy-loaded; grain or
  noise (if ever used) only on a fixed `pointer-events: none` layer at <= 0.05 opacity.
- UI/UX Pro Max priority when trading off: accessibility > touch/interaction > performance > style
  fit > layout/responsive > type/colour > animation > forms > navigation > charts.
- Console clean, fonts loaded, every referenced asset exists.

## 12. Pre-flight (every box answered: ticked, fixed, or N/A with a 3-word reason)

**Direction**
- [ ] Surface mode, work mode, Design Read and dials stated; brief axes (claim, asset, type,
      colour, avoid) answered.
- [ ] Sameness test and category-reflex check passed; one signature move named; boldness spent once.
- [ ] Brand locks held: Outfit only, violet family for brand, teal for actions only, no new hue.

**Slop (mechanical where possible)**
- [ ] Zero U+2014/U+2013 in visible text: `rg -n "[\x{2013}\x{2014}]" src index.html`.
- [ ] No `transition: all`, `scale(0)`, `ease-in` on UI, `outline: none` without focus-visible:
      `rg -n "transition:\s*all|scale\(0\)|outline:\s*none" src`.
- [ ] Eyebrow/tracked-caps labels <= ceil(sections / 3); no numbered markers unless a real sequence.
- [ ] No gradient text, glow, side-stripe border, ghost card, 24px+ card radius, blobs, fake UI divs.
- [ ] No three-box icon grid, logo soup, hero-metric template, split header, 3+ zigzags, 2 marquees.
- [ ] No invented numbers, names, testimonials or logos; no verb slop; no duplicate CTA intent.

**Layout and type**
- [ ] Hero fits the viewport: headline <= 2 lines, sub <= 20 words, <= 4 text elements, CTA visible.
- [ ] Nav one line, <= 80px. >= 4 layout families; clear hierarchy moments; no uniform rhythm.
- [ ] One radius rule and one elevation ladder, applied everywhere; no nested cards.
- [ ] Type scale ratio held; display tracking negative, body 0; measure <= 75ch; balanced headings.
- [ ] Every multi-column layout collapses explicitly below 768px; `dvh` not `vh`.

**States, motion, access**
- [ ] All interactive states designed, including focus-visible, disabled, loading, error.
- [ ] Every animation justified in one word; tokens used; UI < 300ms; exits faster; reduced-motion
      fallback shipped; no scroll listeners; GSAP contexts reverted on unmount.
- [ ] Contrast measured (body 4.5:1, large/UI 3:1; teal labels checked); keyboard pass done.
- [ ] Images real or labelled slots; nothing from Higgsfield; dimensions reserved; alt text written.

**Proof**
- [ ] `npm run lint`, `npm run build`, `npm run check` pass; console clean.
- [ ] Desktop and mobile screenshots reviewed in one batched round, fixes applied, at most one
      confirm round; screenshots shown to the user.
- [ ] Copy self-audit done; subtraction pass done.

## 13. References (open on demand, not by default)

All files in `references/` are verbatim copies with a one-line origin comment. Sources: see
`ATTRIBUTION.md`.

| Open this | When |
| --- | --- |
| `anthropic-frontend-design.md` | Direction-setting for a new surface; the two-pass plan/review method and the current AI-look calibration list. |
| `impeccable.md` | Choosing between refine/redesign, surface modes, bounded verification; command vocabulary (polish, distill, quieter, bolder, clarify, harden). |
| `taste-skill.md` | Full dial tables, redesign protocol (audit, preservation, modernisation levers), hero/bento/eyebrow rules, GSAP sticky-stack and horizontal-pan skeletons, full 60-box pre-flight. |
| `design-taste-frontend.md` | Same content as `taste-skill.md` (vendored copy); open only to confirm upstream wording. |
| `design-taste.md` | Compact synthesis of Emil + Impeccable + taste; routing table by surface mode. |
| `design-taste-anti-slop.md` | Exact wording of the absolute bans and production-test tells when a borderline case needs checking. |
| `design-taste-core-rules.md` | Serif pool, premium-consumer palette ban, content-density alternatives for long lists and spec sheets. |
| `design-taste-motion.md` | Deep motion craft: clip-path recipes, gestures, Sonner principles, performance caveats, debugging. |
| `design-taste-interaction-states.md` | Focus rings, dialog/inert, Popover API, anchor positioning, roving tabindex code. |
| `design-taste-pre-flight.md` | Before/After/Why review format, motion review table, Operate/Read addenda for app-like surfaces. |
| `design-anti-slop.md` | Audit vs pre-gen vs polish modes, stake calibration, remediation-by-layer rule. |
| `design-anti-slop-visual.md` / `-structural.md` / `-conceptual.md` | Per-pattern signal, root cause, "when it's not slop" gate and tasteful variant (V1-V9, S1-S9, C1-C7). |
| `anti-slop-design.md` | Discover/Define/Deliver protocol, device budget, concept ceiling gate, regression invariants, subtraction pass. |
| `anti-slop-design-craft.md` | (Chinese) craft cookbook: optical tracking, asymmetric splits, breakout elements, texture limits, overused-effect anti-patterns. Most techniques are too loud for this brand; borrow only the restrained ones. |
| `ui-ux-pro-max.md` | The 10-category priority table and UX rule domains. Its search script and data are not installed here; do not try to run it. |
| `emil-animate.md` | Building any new animation: the gate, tool choice, property rules, curve/duration tables, never-ship list, output format. |
| `emil-apple-design.md` | Gesture, drag, sheet or spring work; interruptibility, velocity handoff, momentum projection, rubber-banding, materials, Apple's eight design principles. |

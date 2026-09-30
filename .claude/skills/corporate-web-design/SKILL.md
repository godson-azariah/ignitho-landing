---
name: corporate-web-design
description: Design and build clean, premium, corporate web pages (Awwwards-level, in the style of Stripe, Linear, Vercel, Google Labs, DeepMind) with restrained scroll reveals. Use whenever creating or restyling a page, section, hero, card grid, or animation for this site.
---

# Corporate Web Design

A system for clean, perfectly aligned, premium corporate pages with subtle, purposeful motion.
Every value here was measured from the live reference sites. Screenshots and raw data are in
`design-research/DESIGN-RESEARCH.md`.

**Non-negotiables:** sans-serif only (no script, serif or decorative fonts). Everything snaps to the grid.
Neutrals do 95% of the work and one accent color does the rest. Motion is felt, not noticed.

## 1. Before you build
1. Read the existing tokens and styles in `src/` and reuse them. Add tokens instead of hardcoding values.
2. Stack: React 19 + Vite with **no animation library**. Use CSS plus one IntersectionObserver
   (see `references/motion.md`). Add GSAP or Lenis only if the user asks.
3. Content must render with JS disabled or during SSR (`npm run check`). Hidden-until-reveal
   styles apply only after JS adds `html.reveal-ready`.

## 2. Typography
Choose one family: **Inter / Inter Display** or **Geist** (both OFL). Premium sites run big headlines at
**regular or medium weight**, not bold.

| Token | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| display (hero) | `clamp(48px, 6.2vw, 96px)` | 500 | 1.02 | -0.035em |
| h2 (section) | `clamp(36px, 4.2vw, 60px)` | 500 | 1.06 | -0.03em |
| h3 (card) | `clamp(20px, 1.6vw, 24px)` | 500 | 1.25 | -0.01em |
| statement | `clamp(28px, 3.2vw, 44px)` | 400 | 1.2 | -0.02em |
| body-lg (subline) | 19–20px | 400 | 1.5 | 0 |
| body | 16–17px | 400 | 1.6 | 0 |
| eyebrow / label | 13px | 500 | 1.2 | +0.06em, uppercase |

- Keep headline measure at 18 characters per line or less where possible, cap sublines at `max-width: 60ch` (about 560–640px), and cap statement text at about 900px.
- Body text is grey (about 60% ink), not full black. Headlines are full ink.
- Stripe-style two-tone headline: first clause in ink, the rest in muted grey, all in one `<h1>`.

## 3. Grid and spacing
- 8px base. Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160`.
- Container: `max-width: 1240px`. Gutters `clamp(20px, 4vw, 48px)`. Use a 12-column grid with 24px gap (32px on desktop).
- **Section padding: `clamp(80px, 10vw, 128px)` top and bottom**, kept constant across the page (Linear's rhythm).
  Hero: `min-height: min(100svh, 960px)` with content optically centered (slightly above true center).
- Vertical rhythm inside a section:
  eyebrow → 16px → heading → 20–24px → subline → 32–40px → CTAs → 64–96px → visual or grid.
- Cards: padding 32px (40px desktop), radius 20–24px (large media) or 12–16px (small), 1px hairline border at `ink / 8%`.
- Alignment: pick **left-aligned** (Stripe, Linear, Vercel) or **centered** (Google Labs, Attio, Scale) per section and never mix within a section.
  Left edges of the logo, heading, grid and footer must share one vertical line.

## 4. Color
```css
--bg: #FFFFFF;            /* or warm off-white #F4F2EE (Google Labs feel) */
--bg-subtle: #F6F6F4;
--ink: #0A0A0B;
--ink-2: #5B5B63;         /* body text */
--ink-3: #8E8E96;         /* captions, muted headline half */
--line: rgb(10 10 11 / 0.08);
--dark: #0B0C0E;          /* one contrast band, e.g. video or CTA */
--accent: <brand color>;  /* CTAs, focus rings and key highlights only */
```
Use at most one dark band per page, plus the footer. No gradients on text. One soft gradient or glow per page, used as atmosphere.

## 5. Components
- **Buttons:** primary is solid ink or accent. Secondary is an outline in `--line` or a ghost. Same height (44–48px) and side by side with a 12px gap.
  Pick one shape for the whole site: pill (`999px`, Google feel) or `8px` (Stripe or Vercel feel).
- **Nav:** 64–72px tall, logo left, links centered or left, CTA right. It turns sticky with `backdrop-filter: blur(12px)` and a hairline once scrolled past 8px.
- **Logo strip:** directly under the hero, greyscale at 60% opacity, aligned to the grid. It may marquee slowly (40–60s linear loop) and pauses on hover.
- **Feature grid:** 3 columns (desktop), 2 (tablet), 1 (mobile). Icon 20–24px in line style (lucide), then an h3 and 2–3 lines of body.
- **Stats:** large numerals at display size and weight 500, with a label underneath at 14px `--ink-2`.
- **Media:** real product UI or one abstract visual. No stock-photo collages. Frame it with a radius and a hairline border.

## 6. Motion (details and code in `references/motion.md`)
| Use | Duration | Easing |
|---|---|---|
| Hover, press, color | 150–200ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| UI (menus, tabs, accordions) | 250–300ms | `cubic-bezier(0.25, 1, 0.5, 1)` |
| Scroll reveal | 700–800ms | `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) |
| Hero intro, image unmask | 900–1200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Clip wipes | 900ms | `cubic-bezier(0.77, 0, 0.175, 1)` |

Allowed reveal patterns, choosing one per element:
1. **Fade-up:** opacity 0→1 with translateY 24px→0. This is the default for text and cards.
2. **Line mask:** each headline line slides up from `translateY(100%)` inside `overflow: hidden`. Use it for the hero h1 only.
3. **Clip unmask:** media goes from `clip-path: inset(6% round 24px)` to `inset(0 round 24px)` while the image scales 1.06→1.
4. **Stagger:** siblings get 80ms steps (60ms for more than 6 items), capping the total at 480ms.
5. **Count-up:** stats count up once, over 1.2s, with ease-out.

Rules:
- Animate only `opacity`, `transform` and `clip-path`. Never animate layout properties.
- Reveal **once** (unobserve after the first time). Trigger when 15% of the element is in view with `rootMargin: 0px 0px -10% 0px`.
- Translate 16–32px at most. No bounce, springs, rotation or blur-in on text, and parallax no more than 8%.
- The hero sequence runs on load: nav at 0ms, eyebrow at 100ms, h1 lines from 150ms in 80ms steps, subline at 450ms, CTAs at 550ms, visual at 650ms.
- `prefers-reduced-motion: reduce` shows everything immediately with no transforms.

## 7. Quality check before calling it done
- [ ] Only one sans family is loaded, headlines use weight 400–500 with negative tracking, and no serif or script fonts appear anywhere.
- [ ] All sections use the same vertical padding token, and left edges line up from the nav to the footer.
- [ ] One accent color, appearing only on CTAs, links and focus.
- [ ] No horizontal scroll at 360px, and tap targets are at least 44px.
- [ ] Every reveal fires once, nothing stays invisible with JS off, and reduced motion is respected.
- [ ] Text contrast is at least 4.5:1 and focus rings are visible.
- [ ] `npm run lint`, `npm run build` and `npm run check` all pass.

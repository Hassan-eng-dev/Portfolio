---
name: Hassan Adel Portfolio
description: A graphic designer's portfolio — vivid blue accent, editorial serif display, flat surfaces with a glow reserved for hero moments.
colors:
  brand-signal-blue: "#2563eb"
  brand-signal-blue-light: "#60a5fa"
  brand-signal-blue-pale: "#93c5fd"
  brand-signal-blue-tint: "#eff6ff"
  ink-charcoal: "#16181d"
  ink-muted: "#5b616e"
  ink-faint: "#a6aab3"
  ink-hairline: "#e8e9eb"
  surface-white: "#ffffff"
  surface-muted: "#f6f6f7"
typography:
  display:
    fontFamily: "Fraunces, serif"
    fontSize: "5rem"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, serif"
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  pill: "9999px"
spacing:
  sm: "1.5rem"
  md: "2.5rem"
  lg: "5rem"
  xl: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.ink-charcoal}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-charcoal}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  card-project:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-charcoal}"
    rounded: "{rounded.lg}"
---

# Design System: Hassan Adel Portfolio

## 1. Overview

**Creative North Star: "The Bold Blueprint"**

The public site is a structural, confident document, not a decorative one. A
near-black ink (`#16181d`) carries almost all the type and hairline structure;
one vivid signal blue (`#2563eb`) is the single deliberate accent — a
availability badge, a CTA glow, a gradient sliver inside a headline. Fraunces,
a warm high-contrast serif, does the emotional heavy lifting in display type;
Inter carries everything functional (body copy, labels, nav) so the pairing
reads as considered contrast, not two similar sans faces competing.

This system explicitly rejects the generic SaaS/AI-template look: no gradient
text used decoratively across headlines, no tiny uppercase eyebrow label
stacked above every section, no numbered 01/02/03 scaffolding used purely for
rhythm, no identical icon+heading+text card grids, no hero-metric stat-block
cliché, no glassmorphism, no ghost-card shadows (thin border stacked with a
wide soft drop-shadow), no cards rounded past 24px.

**Key Characteristics:**
- One accent, used rarely and with intent — never sprinkled evenly.
- Flat surfaces at rest; the blue glow shadow marks only the primary CTA and
  hero-level moments.
- Serif display headlines carry personality; everything else is quiet Inter.
- Motion (via `motion-v`) choreographs entrances per-section rather than
  applying one uniform reveal everywhere.

## 2. Colors

A near-monochrome ink-on-white system with one vivid, rationed accent.

### Primary
- **Signal Blue** (#2563eb): The one deliberate accent. CTA backgrounds' glow
  shadow, active states, link hover, the gradient sliver inside `.text-gradient`
  headlines, category badges.

### Neutral
- **Charcoal Ink** (#16181d): Primary text, headline color, primary button
  fill.
- **Muted Ink** (#5b616e): Secondary body copy, supporting paragraph text.
- **Faint Ink** (#a6aab3): Placeholder-level and least-important text.
- **Hairline** (#e8e9eb): Borders, dividers, card outlines.
- **Surface White** (#ffffff): Page and card background.
- **Surface Muted** (#f6f6f7): Section backgrounds that need to sit visually
  behind the white cards above them (stats blocks, process section).

### Named Rules
**The One Voice Rule.** Signal Blue appears on at most one element per
viewport at a time — a badge, a CTA glow, a single gradient headline. It is
never a section background, never a card fill, never repeated across a grid.

## 3. Typography

**Display Font:** Fraunces (serif)
**Body Font:** Inter (sans-serif)

**Character:** A warm, high-contrast editorial serif against a quiet
geometric-humanist sans — contrast-pairing, not two similar faces. The serif
only appears at display/headline sizes; Inter carries every functional size.

### Hierarchy
- **Display** (500, 5rem / `clamp` on hero, 1.02 line-height, -0.02em):
  the one big statement per page — hero headline only.
- **Headline** (500, 2.5rem–3.5rem, 1.2 line-height, -0.01em): section
  titles ("Selected work", "How I work").
- **Body** (400, 1.125rem, 1.6 line-height): supporting paragraphs, capped
  conceptually around 65–75ch.
- **Label** (500, 0.875rem, 1.5 line-height): buttons, nav links, badges.

### Named Rules
**The Serif-Only-At-Scale Rule.** Fraunces never appears below headline size;
body and UI text is always Inter, so the serif reads as a deliberate
statement rather than default body type.

## 4. Elevation

Flat-by-default. Cards and containers sit on a 1px hairline border
(`--color-border`, #e8e9eb) with no ambient shadow at rest. The signal-blue
glow shadow is reserved for hero-level and primary-CTA moments — it is a
spotlight, not a general card treatment.

### Shadow Vocabulary
- **glow** (`0 0 0 1px rgba(37,99,235,0.35), 0 24px 48px -16px rgba(37,99,235,0.45)`):
  primary CTA hover/press states.
- **glow-lg** (`0 0 0 1px rgba(37,99,235,0.3), 0 40px 80px -24px rgba(37,99,235,0.5)`):
  hero-level media (the illustrated avatar, a hero video), used sparingly.
- **card** (`0 1px 2px rgba(11,13,18,0.04), 0 16px 32px -20px rgba(11,13,18,0.18)`):
  neutral ink-tinted lift for elements that need to visually separate from a
  busy background — never combined with a visible border on the same edge.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat and bordered at rest. A shadow
only appears as a deliberate spotlight (hero media, primary CTA), never as
ambient card decoration layered on top of a border.

## 5. Components

### Buttons
- **Shape:** full pill (`border-radius: 9999px`).
- **Primary:** charcoal ink fill (#16181d), white text, 14px/24px padding,
  scales up (1.05) and lifts (-2px) on hover with a spring transition.
- **Secondary / Ghost:** transparent fill, 1px hairline border, ink text;
  border tints toward Signal Blue's pale step (#93c5fd) on hover.

### Cards / Containers
- **Corner Style:** 1rem–1.5rem radius (16–24px), never higher.
- **Background:** surface white.
- **Shadow Strategy:** flat with hairline border at rest (see Elevation); no
  ambient shadow stacked with the border.
- **Border:** 1px hairline (#e8e9eb), brand-blue-pale (#93c5fd) on hover for
  interactive cards.

### Navigation / Marquee
- Category marquee: continuous horizontal ticker, pauses on hover, respects
  `prefers-reduced-motion` by disabling the animation entirely.

### Hero Media
- Large illustrated/video media sits opposite the hero copy in a two-column
  layout that flips per section (image-right on the primary hero, can flip
  left-right for secondary hero-style sections) — full-bleed within its
  column, rounded at the `lg` radius, no card border since it's the visual
  anchor rather than a content container.

## 6. Do's and Don'ts

### Do:
- **Do** ration Signal Blue (#2563eb) to one element per viewport — badge, CTA
  glow, or one gradient headline, never more.
- **Do** keep Fraunces exclusively at display/headline sizes; Inter for
  everything else.
- **Do** keep cards flat with a hairline border at rest; add the glow shadow
  only to hero media and primary CTAs.
- **Do** give every section entrance its own motion shape (staggered list vs.
  single fade vs. scale-in for media) rather than one repeated reveal.
- **Do** cap card/container radius at 24px (`rounded-2xl` / 1.5rem).

### Don't:
- **Don't** use gradient text as decoration outside the one sanctioned
  `.text-gradient` headline use.
- **Don't** stack a tiny uppercase eyebrow label above every section — it is
  the generic-AI-template tell this brand explicitly avoids.
- **Don't** use numbered 01/02/03 scaffolding purely for visual rhythm; only
  when the content is a genuine, ordered sequence.
- **Don't** stack a visible 1px border together with a wide soft drop-shadow
  on the same card (the "ghost-card" pattern) — pick flat-with-border or
  glow-shadow, never both.
- **Don't** round cards or media past 24px (1.5rem).
- **Don't** touch the `primary`/`ink` admin token system — it is frozen so the
  dashboard renders unchanged while this public-site system evolves.

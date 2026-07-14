# Product

## Register

brand

## Users

Prospective clients and studios browsing Hassan Adel's portfolio to evaluate
him for branding, illustration, print, digital and packaging work. They land
from a shared link or search, skim the hero and featured work fast, and
decide within seconds whether the craft level matches what they need. A
smaller, secondary audience is Hassan himself, signed into `/admin` to manage
projects — a product-register surface, kept visually separate (see the
`primary`/`ink` vs `brand` token split in `tailwind.config.ts`).

## Product Purpose

A single-designer portfolio site: gallery of published projects, about/contact
pages, and an admin dashboard for managing that gallery. Success looks like a
visitor leaving convinced of Hassan's range and precision, and reaching out
via the contact form or a project's case study.

## Brand Personality

Bold, refined, playful. Confident visual statements executed with polish —
strong typographic moves, a vivid blue accent used deliberately, motion that
feels considered rather than decorative — with room for a bit of wit and
personality rather than corporate neutrality.

## Anti-references

Generic SaaS/AI-template look: gradient text, tiny uppercase eyebrow labels
above every section, numbered 01/02/03 scaffolding used just for rhythm,
identical icon+heading+text card grids, the "hero metric" stat-block cliché,
glassmorphism as decoration, ghost-card shadows (thin border + wide soft
drop-shadow stacked together), over-rounded cards (24px+ radii).

## Design Principles

- Show, don't tell — let the work and craft carry the page, not marketing copy.
- Every section earns its motion; entrances should fit what they reveal, not
  apply one uniform reflex everywhere.
- One vivid accent (brand blue) used with intent, not sprinkled evenly.
- Confident typography over decorative filler — a strong display face
  (Fraunces) doing the emotional work.
- Admin stays untouched: the `primary`/`ink` token system is legacy and
  intentionally frozen so the dashboard doesn't regress while the public site
  evolves.

## Accessibility & Inclusion

No formal WCAG level specified. Maintain body text contrast ≥4.5:1, respect
`prefers-reduced-motion` (already wired via global CSS and per-component
checks), and keep interactive targets keyboard-reachable.

<!--
  THESIS: Pricing as an honest rate sheet, not a SaaS tier grid — the page
  owns "clarity as craft" and refuses the identical-card, badge-ribbon template.
  OWN-WORLD: Bold Blueprint's own vocabulary only — Fraunces for names and
  numbers, Inter for body/labels, one rationed signal-blue accent on the
  featured row and its CTA, flat hairline-bordered surfaces, no new tokens.
  STORY: A prospective client scans three ways to work together, sees exactly
  what's included and what it costs, and either books a tier or asks for a
  custom quote — no guesswork, nothing hidden.
  FIRST VIEWPORT: Fraunces headline + one-line subhead over a quiet aurora
  wash; a single bordered rate-sheet card begins immediately below it.
  FORM: Tiered packages built as an editorial rate sheet — full-width rows
  divided by hairlines, not boxed side-by-side cards — assigned structure
  from a self-ranked list of pricing layouts for this product; emphasis on
  the featured row comes from tint and scale, never a "Most popular" ribbon.
-->
<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('pricing.seoTitle'),
  description: () => t('pricing.seoDescription'),
})
</script>

<template>
  <div>
    <PagesPricingHero />
    <PagesPricingTiersSection />
    <PagesPricingAddOnsSection />
    <PagesPricingProcessSection />
    <PagesPricingFaqSection />
    <PagesPricingClosingCta />
  </div>
</template>

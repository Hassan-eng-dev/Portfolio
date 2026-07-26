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
import { motion, stagger } from "motion-v";

const { t } = useI18n();

useSeoMeta({
  title: () => t('pricing.seoTitle'),
  description: () => t('pricing.seoDescription'),
});

const tiers = computed(() => [
  {
    key: "starter",
    name: t('pricing.tiers.starter.name'),
    tagline: t('pricing.tiers.starter.tagline'),
    period: t('pricing.tiers.starter.period'),
    cta: t('pricing.tiers.starter.cta'),
    price: "1,800",
    featured: false,
    includes: [
      t('pricing.tiers.starter.includes.item1'),
      t('pricing.tiers.starter.includes.item2'),
      t('pricing.tiers.starter.includes.item3'),
      t('pricing.tiers.starter.includes.item4'),
    ],
  },
  {
    key: "system",
    name: t('pricing.tiers.system.name'),
    tagline: t('pricing.tiers.system.tagline'),
    period: t('pricing.tiers.system.period'),
    cta: t('pricing.tiers.system.cta'),
    featuredLabel: t('pricing.tiers.system.featuredLabel'),
    price: "4,500",
    featured: true,
    includes: [
      t('pricing.tiers.system.includes.item1'),
      t('pricing.tiers.system.includes.item2'),
      t('pricing.tiers.system.includes.item3'),
      t('pricing.tiers.system.includes.item4'),
      t('pricing.tiers.system.includes.item5'),
    ],
  },
  {
    key: "partner",
    name: t('pricing.tiers.partner.name'),
    tagline: t('pricing.tiers.partner.tagline'),
    period: t('pricing.tiers.partner.period'),
    cta: t('pricing.tiers.partner.cta'),
    price: "2,200",
    featured: false,
    includes: [
      t('pricing.tiers.partner.includes.item1'),
      t('pricing.tiers.partner.includes.item2'),
      t('pricing.tiers.partner.includes.item3'),
      t('pricing.tiers.partner.includes.item4'),
    ],
  },
]);

const addOns = computed(() => [
  { label: t('pricing.addOns.item1.label'), price: "150" },
  { label: t('pricing.addOns.item2.label'), price: "300" },
  { label: t('pricing.addOns.item3.label'), price: "250" },
  { label: t('pricing.addOns.item4.label'), price: "350" },
]);

const process = computed(() => [
  { title: t('pricing.process.discovery.title'), body: t('pricing.process.discovery.body') },
  { title: t('pricing.process.proposal.title'), body: t('pricing.process.proposal.body') },
  { title: t('pricing.process.feedback.title'), body: t('pricing.process.feedback.body') },
  { title: t('pricing.process.delivery.title'), body: t('pricing.process.delivery.body') },
]);

const faqs = computed(() => [
  { q: t('pricing.faq.q1.q'), a: t('pricing.faq.q1.a') },
  { q: t('pricing.faq.q2.q'), a: t('pricing.faq.q2.a') },
  { q: t('pricing.faq.q3.q'), a: t('pricing.faq.q3.a') },
  { q: t('pricing.faq.q4.q'), a: t('pricing.faq.q4.a') },
]);

const openFaqIndex = ref<number | null>(null);
function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? null : index;
}

const staggerContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.08) } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-ink-100 dark:border-ink-800">
      <div class="aurora-field opacity-60">
        <div class="aurora-blob left-1/2 top-[-25%] h-[24rem] w-[24rem] -translate-x-1/2 animate-aurora bg-brand-400" />
      </div>

      <div class="relative mx-auto max-w-content px-6 py-20 text-center sm:px-10 sm:py-28">
        <motion.p
          class="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }"
        >
          {{ t('pricing.eyebrow') }}
        </motion.p>
        <motion.h1
          class="mx-auto mt-3 max-w-2xl text-balance font-display text-4xl leading-tight text-ink-900 sm:text-5xl dark:text-white"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }"
        >
          {{ t('pricing.heading') }}
        </motion.h1>
        <motion.p
          class="mx-auto mt-5 max-w-xl text-lg text-ink-600 dark:text-ink-300"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }"
        >
          {{ t('pricing.subheading') }}
        </motion.p>
      </div>
    </section>

    <section class="mx-auto max-w-content px-6 py-20 sm:px-10">
      <motion.h2
        class="font-display text-2xl text-ink-900 sm:text-3xl dark:text-white"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
      >
        {{ t('pricing.tiersHeading') }}
      </motion.h2>

      <motion.div
        class="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-950/40"
        :variants="staggerContainer"
        initial="hidden"
        :whileInView="'show'"
        :viewport="{ once: true, margin: '-80px' }"
      >
        <motion.div
          v-for="tier in tiers"
          :key="tier.key"
          :variants="staggerItem"
          class="grid gap-6 border-t border-ink-100 p-8 first:border-t-0 dark:border-ink-800 sm:grid-cols-[1.3fr_1fr] sm:items-center sm:p-10"
          :class="tier.featured ? 'bg-brand-50/70 dark:bg-brand-500/10' : ''"
        >
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="font-display text-2xl text-ink-900 dark:text-white">{{ tier.name }}</h3>
              <span
                v-if="tier.featured"
                class="rounded-full bg-brand-600 px-2.5 py-1 text-xs font-medium text-white"
              >
                {{ tier.featuredLabel }}
              </span>
            </div>
            <p class="mt-2 text-ink-600 dark:text-ink-300">{{ tier.tagline }}</p>
            <ul class="mt-5 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              <li v-for="item in tier.includes" :key="item" class="flex items-start gap-2">
                <svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="flex flex-col items-start gap-4 sm:items-end sm:text-end">
            <div>
              <p class="flex items-baseline gap-1 font-display text-4xl text-ink-900 dark:text-white">
                <span>$</span>
                <span class="tabular-nums">{{ tier.price }}</span>
              </p>
              <p class="mt-1 text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">{{ tier.period }}</p>
            </div>

            <NuxtLinkLocale v-slot="{ navigate, href }" to="/contact" custom>
              <motion.a
                :href="href"
                class="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors"
                :class="tier.featured
                  ? 'bg-brand-600 text-white shadow-glow'
                  : 'border border-ink-200 text-ink-900 hover:border-brand-300 dark:border-ink-700 dark:text-white dark:hover:border-brand-700'"
                :whileHover="{ scale: 1.05 }"
                :whilePress="{ scale: 0.96 }"
                :transition="{ type: 'spring', stiffness: 380, damping: 24 }"
                @click="navigate"
              >
                {{ tier.cta }}
              </motion.a>
            </NuxtLinkLocale>
          </div>
        </motion.div>
      </motion.div>

      <p class="mt-6 text-sm text-ink-400 dark:text-ink-500">{{ t('pricing.priceNote') }}</p>
    </section>

    <section class="border-t border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/60">
      <div class="mx-auto max-w-content px-6 py-20 sm:px-10">
        <motion.h2
          class="font-display text-2xl text-ink-900 sm:text-3xl dark:text-white"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
        >
          {{ t('pricing.addOnsHeading') }}
        </motion.h2>
        <motion.p
          class="mt-2 text-ink-600 dark:text-ink-300"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
        >
          {{ t('pricing.addOnsSubtitle') }}
        </motion.p>

        <motion.div
          class="mt-8 flex flex-wrap gap-3"
          :variants="staggerContainer"
          initial="hidden"
          :whileInView="'show'"
          :viewport="{ once: true, margin: '-80px' }"
        >
          <motion.div
            v-for="addon in addOns"
            :key="addon.label"
            :variants="staggerItem"
            class="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-300"
          >
            <span>{{ addon.label }}</span>
            <span class="text-ink-300 dark:text-ink-600">&middot;</span>
            <span class="tabular-nums">${{ addon.price }}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <section class="mx-auto max-w-content px-6 py-20 sm:px-10">
      <motion.h2
        class="font-display text-2xl text-ink-900 sm:text-3xl dark:text-white"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
      >
        {{ t('pricing.processHeading') }}
      </motion.h2>

      <motion.div
        class="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        :variants="staggerContainer"
        initial="hidden"
        :whileInView="'show'"
        :viewport="{ once: true, margin: '-80px' }"
      >
        <motion.div v-for="(step, index) in process" :key="step.title" :variants="staggerItem">
          <span class="font-display text-3xl text-brand-600 dark:text-brand-400">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="mt-3 font-display text-lg text-ink-900 dark:text-white">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{{ step.body }}</p>
        </motion.div>
      </motion.div>
    </section>

    <section class="border-t border-ink-100 dark:border-ink-800">
      <div class="mx-auto max-w-content px-6 py-20 sm:px-10">
        <motion.h2
          class="font-display text-2xl text-ink-900 sm:text-3xl dark:text-white"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
        >
          {{ t('pricing.faqHeading') }}
        </motion.h2>

        <motion.div
          class="mt-8 divide-y divide-ink-100 border-y border-ink-100 dark:divide-ink-800 dark:border-ink-800"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
        >
          <div v-for="(item, index) in faqs" :key="item.q">
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 py-5 text-start"
              :aria-expanded="openFaqIndex === index"
              :aria-controls="`faq-panel-${index}`"
              @click="toggleFaq(index)"
            >
              <span class="font-display text-lg text-ink-900 dark:text-white">{{ item.q }}</span>
              <svg
                viewBox="0 0 24 24"
                class="h-5 w-5 shrink-0 text-ink-400 transition-transform duration-300 dark:text-ink-500"
                :class="openFaqIndex === index ? 'rotate-45' : ''"
                fill="none"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
              </svg>
            </button>
            <div
              :id="`faq-panel-${index}`"
              class="grid transition-[grid-template-rows] duration-300 ease-out"
              :class="openFaqIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <p class="pb-5 text-ink-600 dark:text-ink-300">{{ item.a }}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section class="border-t border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/60">
      <div class="mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-16 text-center sm:px-10">
        <h2 class="font-display text-2xl text-ink-900 dark:text-white">{{ t('pricing.closingHeading') }}</h2>
        <p class="max-w-md text-ink-600 dark:text-ink-300">{{ t('pricing.closingBody') }}</p>
        <NuxtLinkLocale v-slot="{ navigate, href }" to="/contact" custom>
          <motion.a
            :href="href"
            class="mt-2 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-ink-900"
            :whileHover="{ scale: 1.05, y: -2 }"
            :whilePress="{ scale: 0.96 }"
            :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
            @click="navigate"
          >
            {{ t('pricing.closingCta') }}
          </motion.a>
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>

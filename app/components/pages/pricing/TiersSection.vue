<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

const { t } = useI18n()

const tiers = computed(() => [
  {
    key: 'starter',
    name: t('pricing.tiers.starter.name'),
    tagline: t('pricing.tiers.starter.tagline'),
    period: t('pricing.tiers.starter.period'),
    cta: t('pricing.tiers.starter.cta'),
    price: '1,800',
    featured: false,
    includes: [
      t('pricing.tiers.starter.includes.item1'),
      t('pricing.tiers.starter.includes.item2'),
      t('pricing.tiers.starter.includes.item3'),
      t('pricing.tiers.starter.includes.item4'),
    ],
  },
  {
    key: 'system',
    name: t('pricing.tiers.system.name'),
    tagline: t('pricing.tiers.system.tagline'),
    period: t('pricing.tiers.system.period'),
    cta: t('pricing.tiers.system.cta'),
    featuredLabel: t('pricing.tiers.system.featuredLabel'),
    price: '4,500',
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
    key: 'partner',
    name: t('pricing.tiers.partner.name'),
    tagline: t('pricing.tiers.partner.tagline'),
    period: t('pricing.tiers.partner.period'),
    cta: t('pricing.tiers.partner.cta'),
    price: '2,200',
    featured: false,
    includes: [
      t('pricing.tiers.partner.includes.item1'),
      t('pricing.tiers.partner.includes.item2'),
      t('pricing.tiers.partner.includes.item3'),
      t('pricing.tiers.partner.includes.item4'),
    ],
  },
])
</script>

<template>
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
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

const { t } = useI18n()

const addOns = computed(() => [
  { label: t('pricing.addOns.item1.label'), price: '150' },
  { label: t('pricing.addOns.item2.label'), price: '300' },
  { label: t('pricing.addOns.item3.label'), price: '250' },
  { label: t('pricing.addOns.item4.label'), price: '350' },
])
</script>

<template>
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
</template>

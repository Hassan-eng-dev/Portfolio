<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

const { t } = useI18n()

const process = computed(() => [
  { title: t('pricing.process.discovery.title'), body: t('pricing.process.discovery.body') },
  { title: t('pricing.process.proposal.title'), body: t('pricing.process.proposal.body') },
  { title: t('pricing.process.feedback.title'), body: t('pricing.process.feedback.body') },
  { title: t('pricing.process.delivery.title'), body: t('pricing.process.delivery.body') },
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
</template>

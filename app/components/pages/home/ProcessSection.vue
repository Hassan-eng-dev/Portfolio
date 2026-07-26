<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

const { t } = useI18n()

const process = computed(() => [
  { title: t('home.process.discover.title'), body: t('home.process.discover.body') },
  { title: t('home.process.design.title'), body: t('home.process.design.body') },
  { title: t('home.process.deliver.title'), body: t('home.process.deliver.body') },
])
</script>

<template>
  <section class="border-t border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/60">
    <div class="mx-auto max-w-content px-6 py-20 sm:px-10 sm:py-28">
      <motion.p
        class="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
      >
        {{ t('home.howIWork') }}
      </motion.p>
      <motion.h2
        class="mt-2 max-w-lg font-display text-3xl text-ink-900 sm:text-4xl dark:text-white"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
        :transition="{ delay: 0.1 }"
      >
        {{ t('home.processSubtitle') }}
      </motion.h2>

      <motion.div
        class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3"
        :variants="staggerContainer"
        initial="hidden"
        :whileInView="'show'"
        :viewport="{ once: true, margin: '-80px' }"
      >
        <motion.div
          v-for="(step, index) in process"
          :key="step.title"
          :variants="staggerItem"
          class="relative rounded-2xl border border-ink-100 bg-white p-8 dark:border-ink-800 dark:bg-ink-950"
          :whileHover="{
            y: -6,
            boxShadow: '0 0 0 1px rgba(37,99,235,0.35), 0 24px 48px -16px rgba(37,99,235,0.45)',
          }"
          :transition="{ type: 'spring', stiffness: 300, damping: 22 }"
        >
          <span class="font-display text-4xl text-brand-200 dark:text-brand-900">0{{ index + 1 }}</span>
          <h3 class="mt-4 font-display text-xl text-ink-900 dark:text-white">{{ step.title }}</h3>
          <p class="mt-2 text-ink-600 dark:text-ink-300">{{ step.body }}</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden border-b border-ink-100 dark:border-ink-800">
    <div class="aurora-field opacity-50">
      <div class="aurora-blob right-[-10%] top-[-20%] h-[22rem] w-[22rem] animate-aurora bg-brand-300" />
    </div>
    <motion.div
      class="relative mx-auto max-w-content px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-24"
      :initial="{ opacity: 0, y: 24 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
    >
      <p class="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">{{ t('portfolio.eyebrow') }}</p>
      <h1 class="mt-3 font-display text-4xl text-ink-900 sm:text-5xl dark:text-white">{{ t('portfolio.heading') }}</h1>
      <p class="mt-3 max-w-xl text-lg text-ink-600 dark:text-ink-300">
        {{ t('portfolio.intro') }}
      </p>
    </motion.div>
  </section>
</template>

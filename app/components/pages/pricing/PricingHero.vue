<script setup lang="ts">
import { motion } from 'motion-v'

const { t } = useI18n()
</script>

<template>
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
</template>

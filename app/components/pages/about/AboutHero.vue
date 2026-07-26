<script setup lang="ts">
import { motion } from 'motion-v'

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden border-b border-ink-100 dark:border-ink-800">
    <div class="aurora-field opacity-70">
      <div class="aurora-blob left-1/2 top-[-20%] h-[24rem] w-[24rem] -translate-x-1/2 animate-aurora bg-brand-300" />
    </div>

    <div class="relative mx-auto grid max-w-content gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <motion.div
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
      >
        <p class="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">{{ t('about.eyebrow') }}</p>
        <h1 class="mt-3 font-display text-4xl leading-tight text-ink-900 sm:text-5xl dark:text-white">
          {{ t('about.heading') }}
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-ink-600 dark:text-ink-300">
          {{ t('about.paragraph1') }}
        </p>
        <p class="mt-4 text-lg leading-relaxed text-ink-600 dark:text-ink-300">
          {{ t('about.paragraph2') }}
        </p>

        <NuxtLinkLocale v-slot="{ navigate, href }" to="/contact" custom>
          <motion.a
            :href="href"
            class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-ink-900"
            :whileHover="{ scale: 1.05, y: -2 }"
            :whilePress="{ scale: 0.96 }"
            :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
            @click="navigate"
          >
            {{ t('about.getInTouch') }}
          </motion.a>
        </NuxtLinkLocale>
      </motion.div>

      <motion.div
        class="relative mx-auto aspect-square w-full max-w-sm"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }"
      >
        <div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-800 shadow-glow-lg" />
        <div class="absolute inset-3 flex items-center justify-center rounded-[1.5rem] bg-white dark:bg-ink-950">
          <span class="font-display text-6xl text-brand-600 dark:text-brand-400">HA</span>
        </div>
        <motion.div
          class="absolute -bottom-4 -end-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-white/10"
          :animate="{ y: [0, -10, 0] }"
          :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
        >
          <span class="font-display text-lg text-ink-900 dark:text-white">{{ t('about.yearsBadge') }}</span>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>

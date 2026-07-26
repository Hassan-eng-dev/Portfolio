<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

const { t } = useI18n()

const timeline = computed(() => [
  { year: t('about.timeline.current.year'), title: t('about.timeline.current.title'), body: t('about.timeline.current.body') },
  { year: t('about.timeline.senior.year'), title: t('about.timeline.senior.title'), body: t('about.timeline.senior.body') },
  { year: t('about.timeline.early.year'), title: t('about.timeline.early.title'), body: t('about.timeline.early.body') },
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
        {{ t('about.experience') }}
      </motion.h2>

      <motion.div
        class="mt-10 space-y-8"
        :variants="staggerContainer"
        initial="hidden"
        :whileInView="'show'"
        :viewport="{ once: true, margin: '-80px' }"
      >
        <motion.div
          v-for="item in timeline"
          :key="item.title"
          :variants="staggerItem"
          class="grid gap-2 border-s-2 border-brand-200 ps-6 sm:grid-cols-[10rem_1fr] sm:gap-8 dark:border-brand-800"
        >
          <p class="text-sm font-medium text-brand-600 dark:text-brand-400">{{ item.year }}</p>
          <div>
            <h3 class="font-display text-lg text-ink-900 dark:text-white">{{ item.title }}</h3>
            <p class="mt-1 text-ink-600 dark:text-ink-300">{{ item.body }}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>

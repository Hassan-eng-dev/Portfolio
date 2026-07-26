<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

const { t } = useI18n()

const stats = computed(() => [
  { value: '40+', label: t('home.stats.projects') },
  { value: '6', label: t('home.stats.years') },
  { value: '5', label: t('home.stats.disciplines') },
  { value: '18', label: t('home.stats.clients') },
])
</script>

<template>
  <motion.section
    class="mx-auto max-w-content px-6 py-16 sm:px-10 sm:py-20"
    :variants="staggerContainer"
    initial="hidden"
    :whileInView="'show'"
    :viewport="{ once: true, margin: '-80px' }"
  >
    <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <motion.div
        v-for="stat in stats"
        :key="stat.label"
        :variants="staggerItem"
        class="rounded-2xl border border-ink-100 bg-ink-50 p-6 text-center transition-colors hover:border-brand-200 dark:border-ink-800 dark:bg-ink-900/60 dark:hover:border-brand-700"
      >
        <p class="font-display text-3xl text-brand-600 sm:text-4xl dark:text-brand-400">
          {{ stat.value }}
        </p>
        <p class="mt-1 text-sm text-ink-500 dark:text-ink-400">
          {{ stat.label }}
        </p>
      </motion.div>
    </div>
  </motion.section>
</template>

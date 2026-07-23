<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'

const { applied, toggle } = useTheme()
const { t } = useI18n()

const label = computed(() =>
  applied.value === 'dark' ? t('themeToggle.switchToLight') : t('themeToggle.switchToDark'),
)
</script>

<template>
  <button
    type="button"
    class="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50 dark:border-ink-700 dark:text-ink-300 dark:hover:border-brand-700 dark:hover:bg-brand-500/10"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <AnimatePresence mode="wait">
      <motion.svg
        v-if="applied === 'dark'"
        key="moon"
        viewBox="0 0 24 24"
        class="h-4 w-4"
        fill="none"
        aria-hidden="true"
        :initial="{ opacity: 0, rotate: -60, scale: 0.6 }"
        :animate="{ opacity: 1, rotate: 0, scale: 1 }"
        :exit="{ opacity: 0, rotate: 60, scale: 0.6 }"
        :transition="{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }"
      >
        <path
          d="M20.5 14.5a8.5 8.5 0 1 1-9-11 7 7 0 0 0 9 11Z"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </motion.svg>
      <motion.svg
        v-else
        key="sun"
        viewBox="0 0 24 24"
        class="h-4 w-4"
        fill="none"
        aria-hidden="true"
        :initial="{ opacity: 0, rotate: 60, scale: 0.6 }"
        :animate="{ opacity: 1, rotate: 0, scale: 1 }"
        :exit="{ opacity: 0, rotate: -60, scale: 0.6 }"
        :transition="{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }"
      >
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.75" />
        <path
          d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
        />
      </motion.svg>
    </AnimatePresence>
  </button>
</template>

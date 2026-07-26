<script setup lang="ts">
import { motion, stagger } from 'motion-v'
import type { Project } from '~~/shared/types/database.types'

defineProps<{
  status: 'idle' | 'pending' | 'success' | 'error'
  error: unknown
  projects: Project[] | null | undefined
  activeCategory: string | null
}>()

defineEmits<{ retry: [] }>()

const { t } = useI18n()
const categoryLabel = useCategoryLabel()

const staggerContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.06) } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}
</script>

<template>
  <div>
    <div v-if="status === 'pending'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 6" :key="n" class="animate-pulse">
        <div class="aspect-[4/5] rounded-2xl bg-ink-100 dark:bg-ink-800" />
        <div class="mt-3 h-4 w-2/3 rounded bg-ink-100 dark:bg-ink-800" />
        <div class="mt-2 h-3 w-1/3 rounded bg-ink-100 dark:bg-ink-800" />
      </div>
    </div>

    <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
      <p>{{ t('portfolio.error') }}</p>
      <button type="button" class="mt-2 font-medium underline" @click="$emit('retry')">{{ t('portfolio.tryAgain') }}</button>
    </div>

    <p v-else-if="!projects?.length" class="rounded-2xl border border-ink-100 bg-ink-50 p-8 text-center text-ink-500 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-400">
      {{ activeCategory ? t('portfolio.emptyInCategory', { category: categoryLabel(activeCategory) }) : t('portfolio.emptyDefault') }}
    </p>

    <motion.div
      v-else
      :key="activeCategory ?? 'all'"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      :variants="staggerContainer"
      initial="hidden"
      animate="show"
    >
      <motion.div v-for="project in projects" :key="project.id" :variants="staggerItem">
        <ProjectCard :project="project" />
      </motion.div>
    </motion.div>
  </div>
</template>

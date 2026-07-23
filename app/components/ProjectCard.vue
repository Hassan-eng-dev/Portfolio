<script setup lang="ts">
import { motion } from 'motion-v'
import type { Project } from '~~/shared/types/database.types'

const props = withDefaults(
  defineProps<{
    project: Project
    priority?: boolean
    aspectClass?: string
  }>(),
  { aspectClass: 'aspect-[4/5]' },
)

const { t } = useI18n()
const getCategoryLabel = useCategoryLabel()
const categoryLabel = computed(() => getCategoryLabel(props.project.category))
</script>

<template>
  <NuxtLinkLocale v-slot="{ navigate, href }" :to="`/portfolio/${project.slug}`" custom>
  <motion.a
    :href="href"
    class="group flex h-full flex-col"
    :aria-label="t('projectCard.viewProject', { title: project.title })"
    :whileHover="{ y: -6 }"
    :whilePress="{ scale: 0.98 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 22 }"
    @click="navigate"
  >
    <div
      class="relative min-h-0 overflow-hidden rounded-2xl bg-ink-50 shadow-card ring-1 ring-inset ring-ink-900/5 transition-shadow duration-500 ease-out group-hover:shadow-glow-lg dark:bg-ink-900 dark:ring-white/10"
      :class="aspectClass"
    >
      <img
        v-if="project.cover_image_url"
        :src="project.cover_image_url"
        :alt="project.title"
        :loading="priority ? 'eager' : 'lazy'"
        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      >
      <div v-else class="flex h-full w-full items-center justify-center text-ink-300 dark:text-ink-700">
        <svg viewBox="0 0 24 24" class="h-10 w-10" fill="none" aria-hidden="true">
          <path
            d="M4 16l4.5-6 3.5 4.5L15.5 10 20 16M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
      </div>

      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span
        class="absolute start-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink-800 opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100 dark:bg-ink-900/90 dark:text-ink-100"
      >
        {{ categoryLabel }}
      </span>

      <span
        class="absolute bottom-4 end-4 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-brand-600 text-white opacity-0 shadow-glow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
          <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>

    <div class="mt-4 flex shrink-0 items-start justify-between gap-3">
      <div>
        <h3 class="font-display text-lg leading-tight text-ink-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
          {{ project.title }}
        </h3>
        <p class="mt-0.5 text-sm text-ink-500 dark:text-ink-400">{{ categoryLabel }}</p>
      </div>
      <span
        class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
    </div>
  </motion.a>
  </NuxtLinkLocale>
</template>

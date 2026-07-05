<script setup lang="ts">
import type { Project } from '~~/shared/types/database.types'

defineProps<{
  project: Project
  priority?: boolean
}>()
</script>

<template>
  <NuxtLink :to="`/portfolio/${project.slug}`" class="group block" :aria-label="`View project: ${project.title}`">
    <div class="relative aspect-[4/5] overflow-hidden rounded-lg bg-ink-50">
      <img
        v-if="project.cover_image_url"
        :src="project.cover_image_url"
        :alt="project.title"
        :loading="priority ? 'eager' : 'lazy'"
        class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      >
      <div v-else class="flex h-full w-full items-center justify-center text-ink-300">
        <svg viewBox="0 0 24 24" class="h-10 w-10" fill="none" aria-hidden="true">
          <path
            d="M4 16l4.5-6 3.5 4.5L15.5 10 20 16M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
      </div>
    </div>

    <div class="mt-3 flex items-start justify-between gap-3">
      <div>
        <h3 class="font-display text-lg leading-tight text-ink-900">{{ project.title }}</h3>
        <p class="mt-0.5 text-sm capitalize text-ink-500">{{ project.category }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

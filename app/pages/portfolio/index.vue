<script setup lang="ts">
import { PROJECT_CATEGORIES } from '~~/shared/types/database.types'

const client = useSupabaseClient()
const route = useRoute()
const router = useRouter()

const activeCategory = ref<string | null>(
  typeof route.query.category === 'string' ? route.query.category : null,
)

watch(activeCategory, (value) => {
  router.replace({
    query: { ...route.query, category: value ?? undefined },
  })
})

const { data: projects, status, error, refresh } = await useAsyncData(
  'portfolio-projects',
  () => fetchPublishedProjects(client, { category: activeCategory.value }),
  { watch: [activeCategory] },
)

useSeoMeta({
  title: 'Portfolio',
  description: 'Browse the full collection of published design projects.',
})
</script>

<template>
  <div class="mx-auto max-w-content px-6 py-16 sm:px-10 sm:py-24">
    <h1 class="font-display text-3xl text-ink-900 sm:text-4xl">Portfolio</h1>
    <p class="mt-3 max-w-xl text-ink-600">Every published project, filterable by category.</p>

    <div class="mt-8">
      <CategoryFilter v-model="activeCategory" :categories="[...PROJECT_CATEGORIES]" />
    </div>

    <div class="mt-10">
      <div v-if="status === 'pending'" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 6" :key="n" class="animate-pulse">
          <div class="aspect-[4/5] rounded-lg bg-ink-100" />
          <div class="mt-3 h-4 w-2/3 rounded bg-ink-100" />
          <div class="mt-2 h-3 w-1/3 rounded bg-ink-100" />
        </div>
      </div>

      <div v-else-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p>Couldn't load the portfolio right now.</p>
        <button type="button" class="mt-2 font-medium underline" @click="refresh()">Try again</button>
      </div>

      <p v-else-if="!projects?.length" class="rounded-lg border border-ink-100 bg-ink-50 p-8 text-center text-ink-500">
        No projects found{{ activeCategory ? ` in "${activeCategory}"` : '' }}.
      </p>

      <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>
  </div>
</template>

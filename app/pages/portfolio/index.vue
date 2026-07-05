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
  description: 'Browse Hassan Adel\'s full collection of published design projects.',
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-ink-100">
      <div class="aurora-field opacity-50">
        <div class="aurora-blob right-[-10%] top-[-20%] h-[22rem] w-[22rem] animate-aurora bg-brand-300" />
      </div>
      <div class="relative mx-auto max-w-content px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-24">
        <p v-reveal class="text-sm font-medium uppercase tracking-widest text-brand-600">Portfolio</p>
        <h1 v-reveal="80" class="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">Selected work</h1>
        <p v-reveal="140" class="mt-3 max-w-xl text-lg text-ink-600">
          Every published project, filterable by category — branding, illustration, print,
          digital and packaging.
        </p>
      </div>
    </section>

    <div class="mx-auto max-w-content px-6 py-10 sm:px-10">
      <CategoryFilter v-model="activeCategory" :categories="[...PROJECT_CATEGORIES]" />

      <div class="mt-10">
        <div v-if="status === 'pending'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 6" :key="n" class="animate-pulse">
            <div class="aspect-[4/5] rounded-2xl bg-ink-100" />
            <div class="mt-3 h-4 w-2/3 rounded bg-ink-100" />
            <div class="mt-2 h-3 w-1/3 rounded bg-ink-100" />
          </div>
        </div>

        <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>Couldn't load the portfolio right now.</p>
          <button type="button" class="mt-2 font-medium underline" @click="refresh()">Try again</button>
        </div>

        <p v-else-if="!projects?.length" class="rounded-2xl border border-ink-100 bg-ink-50 p-8 text-center text-ink-500">
          No projects found{{ activeCategory ? ` in "${activeCategory}"` : '' }}.
        </p>

        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.id"
            v-reveal="(index % 3) * 80"
            :project="project"
          />
        </div>
      </div>
    </div>
  </div>
</template>

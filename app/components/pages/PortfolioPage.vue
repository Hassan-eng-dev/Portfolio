<script setup lang="ts">
import { motion, stagger } from 'motion-v'
import { PROJECT_CATEGORIES } from '~~/shared/types/database.types'

const { t } = useI18n()
const categoryLabel = useCategoryLabel()
const client = useSupabaseClient()
const route = useRoute()
const router = useRouter()

const activeCategory = ref<string | null>(
  typeof route.query.category === 'string' &&
    (PROJECT_CATEGORIES as readonly string[]).includes(route.query.category)
    ? route.query.category
    : null,
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

const staggerContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.06) } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

useSeoMeta({
  title: () => t('portfolio.seoTitle'),
  description: () => t('portfolio.seoDescription'),
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-ink-100">
      <div class="aurora-field opacity-50">
        <div class="aurora-blob right-[-10%] top-[-20%] h-[22rem] w-[22rem] animate-aurora bg-brand-300" />
      </div>
      <motion.div
        class="relative mx-auto max-w-content px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-24"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
      >
        <p class="text-sm font-medium uppercase tracking-widest text-brand-600">{{ t('portfolio.eyebrow') }}</p>
        <h1 class="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">{{ t('portfolio.heading') }}</h1>
        <p class="mt-3 max-w-xl text-lg text-ink-600">
          {{ t('portfolio.intro') }}
        </p>
      </motion.div>
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
          <p>{{ t('portfolio.error') }}</p>
          <button type="button" class="mt-2 font-medium underline" @click="refresh()">{{ t('portfolio.tryAgain') }}</button>
        </div>

        <p v-else-if="!projects?.length" class="rounded-2xl border border-ink-100 bg-ink-50 p-8 text-center text-ink-500">
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
    </div>
  </div>
</template>

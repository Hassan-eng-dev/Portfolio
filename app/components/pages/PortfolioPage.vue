<script setup lang="ts">
import { PROJECT_CATEGORIES } from '~~/shared/types/database.types'

const { t } = useI18n()
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

useSeoMeta({
  title: () => t('portfolio.seoTitle'),
  description: () => t('portfolio.seoDescription'),
})
</script>

<template>
  <div>
    <PagesPortfolioPortfolioHero />

    <div class="mx-auto max-w-content px-6 py-10 sm:px-10">
      <CategoryFilter v-model="activeCategory" :categories="[...PROJECT_CATEGORIES]" />

      <div class="mt-10">
        <PagesPortfolioProjectsGrid
          :status="status"
          :error="error"
          :projects="projects"
          :active-category="activeCategory"
          @retry="refresh()"
        />
      </div>
    </div>
  </div>
</template>

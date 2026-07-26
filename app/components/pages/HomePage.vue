<script setup lang="ts">
import { PROJECT_CATEGORIES } from '~~/shared/types/database.types'

const { t } = useI18n()

const getCategoryLabel = useCategoryLabel()
const categoryLabels = computed(() => [...PROJECT_CATEGORIES].map(getCategoryLabel))

useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription'),
})
</script>

<template>
  <div>
    <PagesHomeHeroSection />
    <PagesHomeIntroVideoSection />

    <section class="border-y border-ink-100 py-6 dark:border-ink-800">
      <Marquee :items="categoryLabels" />
    </section>

    <PagesHomeStatsSection />
    <PagesHomeFeaturedWorkSection />
    <PagesHomeProcessSection />
  </div>
</template>

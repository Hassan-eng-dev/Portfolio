<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('about.seoTitle'),
  description: () => t('about.seoDescription'),
})
</script>

<template>
  <div>
    <PagesAboutHero />
    <PagesAboutSkillsSection />
    <PagesAboutTimelineSection />
  </div>
</template>

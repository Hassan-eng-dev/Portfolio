<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('contact.seoTitle'),
  description: () => t('contact.seoDescription'),
})
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="aurora-field opacity-60">
      <div class="aurora-blob left-[-15%] top-[-10%] h-[26rem] w-[26rem] animate-aurora bg-brand-400" />
    </div>

    <div class="relative mx-auto grid max-w-content gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <PagesContactContactInfo />
      <PagesContactContactForm />
    </div>
  </div>
</template>

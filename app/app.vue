<script setup lang="ts">
const { locale, locales } = useI18n()
const localeHead = useLocaleHead()
const { init: initTheme } = useTheme()
initTheme()

useHead({
  htmlAttrs: computed(() => ({
    lang: localeHead.value.htmlAttrs?.lang ?? locale.value,
    dir:
      localeHead.value.htmlAttrs?.dir ??
      locales.value.find((l) => typeof l === 'object' && l.code === locale.value)?.dir ??
      'ltr',
  })),
  link: computed(() => localeHead.value.link ?? []),
  meta: computed(() => localeHead.value.meta ?? []),
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#6d9fd5" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

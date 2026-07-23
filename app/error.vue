<script setup lang="ts">
const props = defineProps<{
  error: { statusCode: number; statusMessage?: string }
}>()

const { t } = useI18n()

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center bg-white px-6 text-center dark:bg-ink-950">
    <p class="text-sm font-medium uppercase tracking-widest text-primary-600">
      {{ error.statusCode }}
    </p>
    <h1 class="mt-3 font-display text-3xl text-ink-900 dark:text-white">
      {{ error.statusCode === 404 ? t('error.notFound') : t('error.generic') }}
    </h1>
    <p class="mt-3 text-ink-500 dark:text-ink-400">{{ error.statusMessage }}</p>
    <button
      type="button"
      class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 dark:bg-white dark:text-ink-900"
      @click="handleClear"
    >
      {{ t('error.backToHome') }}
    </button>
  </div>
</template>

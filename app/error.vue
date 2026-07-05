<script setup lang="ts">
const props = defineProps<{
  error: { statusCode: number; statusMessage?: string }
}>()

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
    <p class="text-sm font-medium uppercase tracking-widest text-primary-600">
      {{ error.statusCode }}
    </p>
    <h1 class="mt-3 font-display text-3xl text-ink-900">
      {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
    </h1>
    <p class="mt-3 text-ink-500">{{ error.statusMessage }}</p>
    <button
      type="button"
      class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      @click="handleClear"
    >
      Back to home
    </button>
  </div>
</template>

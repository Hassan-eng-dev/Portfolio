<script setup lang="ts">
const { t } = useI18n()

const visible = ref(true)
const fading = ref(false)

function hide() {
  if (fading.value) return
  fading.value = true
  window.setTimeout(() => {
    visible.value = false
  }, 500)
}

onMounted(() => {
  // By the time onMounted runs, hydration is complete and the
  // server-rendered page is already interactive — don't wait on
  // window 'load', which stalls on network-bound media (the hero
  // video, images) and would block clicks over content that's
  // already usable. A short fixed delay just avoids a jarring flash.
  window.setTimeout(hide, 350)
})
</script>

<template>
  <div
    v-if="visible"
    data-app-preloader
    class="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ease-out dark:bg-ink-950"
    :class="fading ? 'pointer-events-none opacity-0' : 'opacity-100'"
    role="status"
    aria-live="polite"
  >
    <span class="sr-only">{{ t('preloader.loading') }}</span>
    <div class="relative h-12 w-12 motion-reduce:animate-pulse">
      <span class="absolute inset-0 rounded-full border-2 border-ink-100 dark:border-ink-800" />
      <span
        class="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-600 motion-reduce:animate-none"
      />
    </div>
  </div>
</template>

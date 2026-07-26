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
    class="fixed inset-0 z-[100] flex items-center justify-center bg-white bg-[radial-gradient(circle,theme(colors.ink.100)_26%,transparent_27%)] bg-[length:14px_14px] transition-opacity duration-500 ease-out dark:bg-ink-950 dark:bg-[radial-gradient(circle,theme(colors.ink.800)_26%,transparent_27%)]"
    :class="fading ? 'pointer-events-none opacity-0' : 'opacity-100'"
    role="status"
    aria-live="polite"
  >
    <span class="sr-only">{{ t('preloader.loading') }}</span>
    <div class="flex flex-col items-center">
      <div class="relative h-40 w-40 overflow-hidden rounded-2xl border border-ink-200 dark:border-ink-700">
        <svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
          <path
            d="M25,25 L75,25 L75,75 L25,75 Z"
            pathLength="1"
            fill="none"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-dasharray="1"
            stroke-dashoffset="1"
            class="animate-trace-combo motion-reduce:animate-none"
          />
        </svg>
        <div class="absolute inset-0 animate-pen-orbit motion-reduce:animate-none">
          <svg
            viewBox="0 0 40 40"
            class="absolute h-10 w-10 -rotate-[38deg]"
            style="top: 50%; left: 50%; margin: -35.5px 0 0 -20px; transform-origin: 20px 35.5px"
            aria-hidden="true"
          >
            <path d="M15,4 L25,4 L32,15 L20,36 L8,15 Z" class="fill-ink-700 dark:fill-ink-200" />
            <line x1="20" y1="33" x2="20" y2="14" stroke-width="1.5" class="stroke-white dark:stroke-ink-950" />
            <circle
              cx="20"
              cy="12.5"
              r="2.25"
              stroke-width="1"
              class="fill-white stroke-ink-700 dark:fill-ink-950 dark:stroke-ink-200"
            />
            <circle cx="20" cy="35.5" r="1.75" class="fill-brand-600" />
          </svg>
        </div>
      </div>
      <div class="mt-5 flex items-center justify-center gap-2.5">
        <span class="h-4 w-4 animate-swatch-pick rounded-[5px] bg-ink-300 motion-reduce:animate-none" />
        <span
          class="h-4 w-4 animate-swatch-pick rounded-[5px] bg-brand-300 motion-reduce:animate-none"
          style="animation-delay: 0.4s"
        />
        <span
          class="h-4 w-4 animate-swatch-pick rounded-[5px] bg-brand-600 motion-reduce:animate-none"
          style="animation-delay: 0.8s"
        />
      </div>
    </div>
  </div>
</template>

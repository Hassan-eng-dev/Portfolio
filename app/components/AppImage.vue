<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    loading?: 'lazy' | 'eager'
    fetchPriority?: 'high' | 'low' | 'auto'
    format?: string
    width?: string | number
    height?: string | number
    sizes?: string
    imgClass?: string
  }>(),
  {
    loading: 'lazy',
    format: 'webp',
  },
)

const loaded = ref(false)
const errored = ref(false)
</script>

<template>
  <div class="relative isolate">
    <div
      class="absolute inset-0 overflow-hidden rounded-[inherit] bg-ink-100 transition-opacity duration-700 ease-out dark:bg-ink-800"
      :class="loaded || errored ? 'pointer-events-none opacity-0' : 'opacity-100'"
      aria-hidden="true"
    >
      <!-- Two satellites orbit a still core at different speeds and directions, one in signal blue -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="relative h-16 w-16 motion-reduce:animate-none">
          <span
            class="absolute inset-0 rounded-full border border-dashed border-ink-200 motion-reduce:hidden dark:border-ink-700"
          />
          <span class="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-700 dark:bg-ink-200" />
          <div class="absolute inset-0 animate-orbit-spin motion-reduce:animate-none">
            <span class="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600" />
          </div>
          <div class="absolute inset-0 animate-orbit-spin-reverse motion-reduce:animate-none">
            <span class="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-300 dark:bg-ink-600" />
          </div>
        </div>
      </div>

      <!-- Inner highlight ring for a touch of depth -->
      <div class="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 dark:ring-white/5" />
    </div>

    <div
      v-if="errored"
      class="absolute inset-0 flex animate-fade-in items-center justify-center bg-ink-50 text-ink-300 dark:bg-ink-900 dark:text-ink-700"
    >
      <svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" aria-hidden="true">
        <path
          d="M4 16l4.5-6 3.5 4.5L15.5 10 20 16M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          stroke-width="1.5"
        />
      </svg>
    </div>

    <NuxtImg
      v-show="!errored"
      :src="src"
      :alt="alt"
      :loading="loading"
      :fetch-priority="fetchPriority"
      :format="format"
      :width="width"
      :height="height"
      :sizes="sizes"
      :class="[
        imgClass,
        'transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:transition-opacity motion-reduce:duration-300',
        loaded ? 'scale-100 opacity-100 blur-none' : 'scale-[1.04] opacity-0 blur-md',
        'motion-reduce:scale-100 motion-reduce:blur-none',
      ]"
      @load="loaded = true"
      @error="errored = true"
    />
  </div>
</template>

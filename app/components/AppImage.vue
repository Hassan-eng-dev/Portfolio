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
      <!-- Slow drifting base gradient: gives the block life before the sheen sweeps through -->
      <div
        class="absolute inset-0 animate-skeleton-drift bg-gradient-to-br from-ink-100 via-ink-200/70 to-ink-100 bg-[length:200%_200%] motion-reduce:animate-none dark:from-ink-800 dark:via-ink-700/60 dark:to-ink-800"
      />

      <!-- Diagonal glass sheen sweep -->
      <div
        class="absolute inset-0 animate-shimmer bg-gradient-to-tr from-transparent via-white/70 via-50% to-transparent bg-[length:200%_100%] motion-reduce:animate-none dark:via-white/10"
      />

      <!-- Soft placeholder glyph so the block reads as "image incoming", not just a gray tile -->
      <div class="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          class="h-9 w-9 animate-skeleton-glyph text-ink-300 motion-reduce:animate-none motion-reduce:opacity-40 dark:text-ink-600"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 16l4.5-6 3.5 4.5L15.5 10 20 16M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
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

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
  <div class="relative">
    <div
      class="absolute inset-0 overflow-hidden bg-ink-100 transition-opacity duration-500 ease-out dark:bg-ink-800"
      :class="loaded || errored ? 'pointer-events-none opacity-0' : 'opacity-100'"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent bg-[length:200%_100%] motion-reduce:animate-none dark:via-white/10"
      />
    </div>

    <div
      v-if="errored"
      class="absolute inset-0 flex items-center justify-center bg-ink-50 text-ink-300 dark:bg-ink-900 dark:text-ink-700"
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
      :class="[imgClass, 'transition-opacity duration-500 ease-out', loaded ? 'opacity-100' : 'opacity-0']"
      @load="loaded = true"
      @error="errored = true"
    />
  </div>
</template>

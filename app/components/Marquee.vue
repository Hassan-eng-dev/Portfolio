<script setup lang="ts">
defineProps<{
  items: string[]
}>()
</script>

<template>
  <div class="marquee-row group relative overflow-hidden">
    <ul class="sr-only">
      <li v-for="item in items" :key="`sr-${item}`">{{ item }}</li>
    </ul>

    <div class="marquee-track" aria-hidden="true">
      <ul
        v-for="copy in 2"
        :key="copy"
        class="flex shrink-0 items-center gap-12 pe-12 sm:gap-16 sm:pe-16"
      >
        <li
          v-for="item in items"
          :key="`${copy}-${item}`"
          class="flex items-center gap-12 whitespace-nowrap sm:gap-16"
        >
          <span
            class="text-xl font-medium tracking-tight text-ink-600 transition-colors duration-300 sm:text-2xl group-hover:text-ink-800"
          >
            {{ item }}
          </span>
          <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-200" />
        </li>
      </ul>
    </div>
  </div>
</template>

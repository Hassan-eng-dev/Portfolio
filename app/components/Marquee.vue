<script setup lang="ts">
defineProps<{
  items: string[]
}>()
</script>

<template>
  <div class="marquee-row overflow-hidden">
    <div class="marquee-track">
      <ul class="flex shrink-0 items-center gap-10 pr-10" aria-hidden="false">
        <li
          v-for="item in items"
          :key="item"
          class="flex items-center gap-10 whitespace-nowrap font-display text-2xl text-ink-300 sm:text-3xl"
        >
          {{ item }}
          <span class="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
        </li>
      </ul>
      <ul class="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
        <li
          v-for="item in items"
          :key="`dup-${item}`"
          class="flex items-center gap-10 whitespace-nowrap font-display text-2xl text-ink-300 sm:text-3xl"
        >
          {{ item }}
          <span class="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ class?: string }>(), {
  class: 'h-4 w-4',
})
</script>

<template>
  <svg :class="class" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

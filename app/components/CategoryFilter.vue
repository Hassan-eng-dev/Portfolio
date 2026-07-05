<script setup lang="ts">
const props = defineProps<{
  categories: string[]
  modelValue: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

function select(value: string | null) {
  emit('update:modelValue', value === props.modelValue ? null : value)
}
</script>

<template>
  <div class="admin-scroll -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
    <button
      type="button"
      class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150"
      :class="modelValue === null
        ? 'border-primary-600 bg-primary-600 text-white'
        : 'border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-ink-50'"
      :aria-pressed="modelValue === null"
      @click="select(null)"
    >
      All
    </button>
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors duration-150"
      :class="modelValue === category
        ? 'border-primary-600 bg-primary-600 text-white'
        : 'border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-ink-50'"
      :aria-pressed="modelValue === category"
      @click="select(category)"
    >
      {{ category }}
    </button>
  </div>
</template>

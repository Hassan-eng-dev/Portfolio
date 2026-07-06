<script setup lang="ts">
import { motion } from 'motion-v'

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
      class="relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200"
      :class="modelValue === null ? 'border-brand-600 text-white' : 'border-ink-200 text-ink-700 hover:border-brand-300 hover:bg-brand-50'"
      :aria-pressed="modelValue === null"
      @click="select(null)"
    >
      <motion.div
        v-if="modelValue === null"
        layoutId="category-pill"
        class="absolute inset-0 -z-10 rounded-full bg-brand-600 shadow-glow"
        :transition="{ type: 'spring', stiffness: 380, damping: 30 }"
      />
      <span class="relative">All work</span>
    </button>
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      class="relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors duration-200"
      :class="modelValue === category ? 'border-brand-600 text-white' : 'border-ink-200 text-ink-700 hover:border-brand-300 hover:bg-brand-50'"
      :aria-pressed="modelValue === category"
      @click="select(category)"
    >
      <motion.div
        v-if="modelValue === category"
        layoutId="category-pill"
        class="absolute inset-0 -z-10 rounded-full bg-brand-600 shadow-glow"
        :transition="{ type: 'spring', stiffness: 380, damping: 30 }"
      />
      <span class="relative">{{ category }}</span>
    </button>
  </div>
</template>

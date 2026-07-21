<script setup lang="ts">
import { PROJECT_CATEGORIES } from '~~/shared/types/database.types'
import type { ProjectWithImages } from '~~/shared/types/database.types'
import type { GalleryItem } from '~/components/ImageUploader.vue'

const props = defineProps<{
  initial?: ProjectWithImages | null
  submitting?: boolean
  submitLabel?: string
}>()

const emit = defineEmits<{
  submit: [
    payload: {
      title: string
      description: string
      category: string
      tags: string[]
      published: boolean
      sortOrder: number
      coverUrl: string | null
      images: { url: string; altText: string }[]
    },
  ]
}>()

const { t } = useI18n()

const title = ref(props.initial?.title ?? '')
const description = ref(props.initial?.description ?? '')
const category = ref(props.initial?.category ?? PROJECT_CATEGORIES[0])
const published = ref(props.initial?.published ?? false)
const sortOrder = ref(props.initial?.sort_order ?? 0)
const coverUrl = ref<string | null>(props.initial?.cover_image_url ?? null)
const tagInput = ref('')
const tags = ref<string[]>(props.initial?.tags ?? [])

const images = ref<GalleryItem[]>(
  (props.initial?.project_images ?? []).map((image) => ({
    id: image.id,
    url: image.image_url,
    altText: image.alt_text ?? '',
    path: null,
  })),
)

function addTag() {
  const value = tagInput.value.trim().replace(/,$/, '')
  if (value && !tags.value.includes(value)) tags.value.push(value)
  tagInput.value = ''
}

function onTagKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault()
    addTag()
  } else if (event.key === 'Backspace' && !tagInput.value) {
    tags.value.pop()
  }
}

function removeTag(tag: string) {
  tags.value = tags.value.filter((t) => t !== tag)
}

const titleError = computed(() => (!title.value.trim() ? t('admin.form.titleRequired') : null))
const categoryError = computed(() => (!category.value ? t('admin.form.categoryRequired') : null))
const touched = ref(false)

function onSubmit() {
  touched.value = true
  if (titleError.value || categoryError.value) return

  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim(),
    category: category.value,
    tags: tags.value,
    published: published.value,
    sortOrder: Number(sortOrder.value) || 0,
    coverUrl: coverUrl.value,
    images: images.value.map((image) => ({ url: image.url, altText: image.altText })),
  })
}
</script>

<template>
  <form class="space-y-8" @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="title" class="block text-sm font-medium text-ink-800">{{ t('admin.form.title') }}</label>
        <input
          id="title"
          v-model="title"
          type="text"
          required
          class="mt-2 block w-full rounded-lg border border-ink-200 px-4 py-3 text-ink-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
        <p v-if="touched && titleError" class="mt-1 text-sm text-red-600">{{ titleError }}</p>
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-ink-800">{{ t('admin.form.category') }}</label>
        <select
          id="category"
          v-model="category"
          class="mt-2 block w-full rounded-lg border border-ink-200 px-4 py-3 text-ink-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
          <option v-for="c in PROJECT_CATEGORIES" :key="c" :value="c">{{ t(`categories.${c}`) }}</option>
        </select>
      </div>

      <div>
        <label for="sort-order" class="block text-sm font-medium text-ink-800">{{ t('admin.form.sortOrder') }}</label>
        <input
          id="sort-order"
          v-model="sortOrder"
          type="number"
          class="mt-2 block w-full rounded-lg border border-ink-200 px-4 py-3 text-ink-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
        <p class="mt-1 text-sm text-ink-400">{{ t('admin.form.sortOrderHelper') }}</p>
      </div>

      <div class="sm:col-span-2">
        <label for="description" class="block text-sm font-medium text-ink-800">{{ t('admin.form.description') }}</label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          class="mt-2 block w-full resize-none rounded-lg border border-ink-200 px-4 py-3 text-ink-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        />
      </div>

      <div class="sm:col-span-2">
        <label for="tags" class="block text-sm font-medium text-ink-800">{{ t('admin.form.tags') }}</label>
        <div class="mt-2 flex flex-wrap gap-2 rounded-lg border border-ink-200 p-2 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/30">
          <span
            v-for="tag in tags"
            :key="tag"
            class="flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-700"
          >
            {{ tag }}
            <button type="button" :aria-label="t('admin.form.removeTag')" @click="removeTag(tag)">
              <svg viewBox="0 0 24 24" class="h-3 w-3" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </span>
          <input
            id="tags"
            v-model="tagInput"
            type="text"
            :placeholder="t('admin.form.tagsPlaceholder')"
            class="min-w-[10rem] flex-1 border-none px-1 py-1 text-sm text-ink-900 focus:outline-none focus:ring-0"
            @keydown="onTagKeydown"
            @blur="addTag"
          >
        </div>
      </div>

      <div class="sm:col-span-2 flex items-center gap-3">
        <input
          id="published"
          v-model="published"
          type="checkbox"
          class="h-5 w-5 rounded border-ink-300 text-primary-600 focus:ring-primary-500/30"
        >
        <label for="published" class="text-sm font-medium text-ink-800">{{ t('admin.form.published') }}</label>
      </div>
    </div>

    <div>
      <span class="block text-sm font-medium text-ink-800">{{ t('admin.form.images') }}</span>
      <p class="mt-1 text-sm text-ink-400">{{ t('admin.form.imagesHelper') }}</p>
      <div class="mt-3">
        <ImageUploader v-model="images" v-model:cover-url="coverUrl" />
      </div>
    </div>

    <div class="flex items-center gap-4 border-t border-ink-100 pt-6">
      <button
        type="submit"
        :disabled="submitting"
        class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          v-if="submitting"
          class="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity="0.25" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        {{ submitting ? t('admin.form.saving') : (submitLabel ?? t('admin.form.save')) }}
      </button>
      <slot name="extra-actions" />
    </div>
  </form>
</template>

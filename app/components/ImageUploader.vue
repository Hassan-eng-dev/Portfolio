<script setup lang="ts">
export interface GalleryItem {
  id: string
  url: string
  altText: string
  path: string | null
}

const props = defineProps<{
  modelValue: GalleryItem[]
  coverUrl: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: GalleryItem[]]
  'update:coverUrl': [value: string | null]
}>()

const client = useSupabaseClient()
const uploadStore = useUploadStore()

const isDragOver = ref(false)
const dragFromIndex = ref<number | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}

async function handleFiles(fileList: FileList | File[]) {
  const files = Array.from(fileList).filter((file) => file.type.startsWith('image/'))
  if (files.length === 0) return

  const queued = uploadStore.addFiles(files)

  for (const item of queued) {
    uploadStore.updateItem(item.id, { status: 'uploading' })
    try {
      const { url, path } = await uploadProjectImage(client, item.file, (progress) => {
        uploadStore.updateItem(item.id, { progress })
      })
      uploadStore.updateItem(item.id, { status: 'done', url, path })

      const next = [...props.modelValue, { id: item.id, url, altText: '', path }]
      emit('update:modelValue', next)
      if (!props.coverUrl) emit('update:coverUrl', url)

      uploadStore.removeItem(item.id)
    } catch (err) {
      uploadStore.updateItem(item.id, {
        status: 'error',
        error: err instanceof Error ? err.message : 'Upload failed',
      })
    }
  }
}

function onDrop(event: DragEvent) {
  isDragOver.value = false
  if (event.dataTransfer?.files) handleFiles(event.dataTransfer.files)
}

function onFileInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) handleFiles(target.files)
  target.value = ''
}

async function removeItem(item: GalleryItem) {
  emit('update:modelValue', props.modelValue.filter((i) => i.id !== item.id))
  if (item.url === props.coverUrl) {
    const fallback = props.modelValue.find((i) => i.id !== item.id)
    emit('update:coverUrl', fallback?.url ?? null)
  }
  if (item.path) {
    try {
      await deleteProjectImageFile(client, item.path)
    } catch {
      // Non-fatal: the file may already be gone or shared; the DB
      // reference is already removed from modelValue above.
    }
  }
}

function retryUpload(id: string) {
  const item = uploadStore.items.find((i) => i.id === id)
  if (item) handleFiles([item.file])
  uploadStore.removeItem(id)
}

function setCover(item: GalleryItem) {
  emit('update:coverUrl', item.url)
}

function updateAltText(item: GalleryItem, value: string) {
  emit(
    'update:modelValue',
    props.modelValue.map((i) => (i.id === item.id ? { ...i, altText: value } : i)),
  )
}

function onDragStart(index: number) {
  dragFromIndex.value = index
}

function onDropReorder(index: number) {
  if (dragFromIndex.value === null || dragFromIndex.value === index) return
  const items = [...props.modelValue]
  const [moved] = items.splice(dragFromIndex.value, 1)
  if (!moved) return
  items.splice(index, 0, moved)
  emit('update:modelValue', items)
  dragFromIndex.value = null
}
</script>

<template>
  <div>
    <div
      class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors"
      :class="isDragOver ? 'border-primary-500 bg-primary-50' : 'border-ink-200 hover:border-ink-300'"
      role="button"
      tabindex="0"
      aria-label="Upload images"
      @click="openFilePicker"
      @keydown.enter="openFilePicker"
      @keydown.space.prevent="openFilePicker"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="onDrop"
    >
      <svg viewBox="0 0 24 24" class="h-8 w-8 text-ink-300" fill="none" aria-hidden="true">
        <path d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="mt-3 text-sm font-medium text-ink-700">
        Drag and drop images here, or click to browse
      </p>
      <p class="mt-1 text-xs text-ink-400">PNG, JPG, WebP up to a few MB each</p>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        class="sr-only"
        @change="onFileInputChange"
      >
    </div>

    <ul v-if="uploadStore.items.length" class="mt-4 space-y-2">
      <li
        v-for="item in uploadStore.items"
        :key="item.id"
        class="flex items-center gap-3 rounded-lg border border-ink-100 p-3"
      >
        <img :src="item.previewUrl" alt="" class="h-12 w-12 rounded object-cover">
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm text-ink-700">{{ item.file.name }}</p>
          <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              class="h-full rounded-full bg-primary-500 transition-all duration-200"
              :class="item.status === 'error' ? 'bg-red-500' : ''"
              :style="{ width: `${item.status === 'error' ? 100 : item.progress}%` }"
            />
          </div>
          <p v-if="item.status === 'error'" class="mt-1 text-xs text-red-600">{{ item.error }}</p>
        </div>
        <button
          v-if="item.status === 'error'"
          type="button"
          class="shrink-0 text-xs font-medium text-primary-700 hover:underline"
          @click="retryUpload(item.id)"
        >
          Retry
        </button>
        <span v-else class="shrink-0 text-xs text-ink-400">Uploading…</span>
      </li>
    </ul>

    <div
      v-if="modelValue.length"
      class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
    >
      <div
        v-for="(item, index) in modelValue"
        :key="item.id"
        class="group relative rounded-lg border border-ink-100 p-2"
        draggable="true"
        @dragstart="onDragStart(index)"
        @dragover.prevent
        @drop.prevent="onDropReorder(index)"
      >
        <div class="relative aspect-square overflow-hidden rounded">
          <img :src="item.url" :alt="item.altText" class="h-full w-full object-cover">
          <span
            v-if="item.url === coverUrl"
            class="absolute left-1.5 top-1.5 rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-medium text-white"
          >
            Cover
          </span>
        </div>
        <input
          :value="item.altText"
          type="text"
          placeholder="Alt text"
          class="mt-2 w-full rounded border border-ink-200 px-2 py-1 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
          @input="updateAltText(item, ($event.target as HTMLInputElement).value)"
        >
        <div class="mt-2 flex items-center justify-between">
          <button
            type="button"
            class="text-xs font-medium text-ink-500 hover:text-primary-700"
            :disabled="item.url === coverUrl"
            @click="setCover(item)"
          >
            Set as cover
          </button>
          <button
            type="button"
            class="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-400 hover:bg-red-50 hover:text-red-600"
            aria-label="Remove image"
            @click="removeItem(item)"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <span
          class="pointer-events-none absolute right-1.5 top-1.5 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          Drag to reorder
        </span>
      </div>
    </div>
  </div>
</template>

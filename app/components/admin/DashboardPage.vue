<script setup lang="ts">
const client = useSupabaseClient()
const { t } = useI18n()

const { data: projects, status, error, refresh } = await useAsyncData('admin-projects', () =>
  fetchAllProjectsAdmin(client),
)

const togglingId = ref<string | null>(null)
const deletingId = ref<string | null>(null)
const categoryLabel = useCategoryLabel()

const orderedProjects = ref(projects.value ?? [])
watch(projects, (value) => {
  orderedProjects.value = value ?? []
})

const dragFromIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
const reordering = ref(false)
const reorderError = ref<string | null>(null)

function onDragStart(index: number) {
  dragFromIndex.value = index
}

function onDragEnter(index: number) {
  dragOverIndex.value = index
}

async function onDropReorder(index: number) {
  dragOverIndex.value = null
  const fromIndex = dragFromIndex.value
  dragFromIndex.value = null
  if (fromIndex === null || fromIndex === index) return

  const previous = orderedProjects.value
  const next = [...previous]
  const [moved] = next.splice(fromIndex, 1)
  if (!moved) return
  next.splice(index, 0, moved)
  orderedProjects.value = next

  reordering.value = true
  reorderError.value = null
  try {
    await reorderProjects(client, next.map((project) => project.id))
    await refresh()
  } catch {
    orderedProjects.value = previous
    reorderError.value = t('admin.dashboard.reorderError')
  } finally {
    reordering.value = false
  }
}

async function onTogglePublish(id: string, current: boolean) {
  togglingId.value = id
  try {
    await togglePublished(client, id, !current)
    await refresh()
  } finally {
    togglingId.value = null
  }
}

async function onDelete(id: string, title: string) {
  if (!confirm(t('admin.common.confirmDeleteProject', { title }))) return
  deletingId.value = id
  try {
    await deleteProject(client, id)
    await refresh()
  } finally {
    deletingId.value = null
  }
}

useSeoMeta({ title: () => t('admin.dashboard.seoTitle') })
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl text-ink-900">{{ t('admin.dashboard.heading') }}</h1>
        <p class="mt-1 text-sm text-ink-500">{{ t('admin.dashboard.subtitle') }}</p>
      </div>
      <NuxtLinkLocale
        to="/admin/projects/new"
        class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        </svg>
        {{ t('admin.dashboard.newProject') }}
      </NuxtLinkLocale>
    </div>

    <div v-if="status === 'pending'" class="mt-8 space-y-3">
      <div v-for="n in 4" :key="n" class="h-20 animate-pulse rounded-lg bg-ink-100" />
    </div>

    <p v-else-if="error" class="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {{ t('admin.dashboard.error') }}
    </p>

    <div v-else-if="!orderedProjects.length" class="mt-8 rounded-lg border border-ink-100 bg-surface p-10 text-center text-ink-500">
      {{ t('admin.dashboard.empty') }}
      <NuxtLinkLocale to="/admin/projects/new" class="font-medium text-primary-700 hover:underline">
        {{ t('admin.dashboard.createFirst') }}
      </NuxtLinkLocale>
    </div>

    <template v-else>
      <p class="mt-6 text-sm text-ink-400">{{ t('admin.dashboard.reorderHint') }}</p>
      <p v-if="reorderError" role="alert" class="mt-2 text-sm text-red-600">{{ reorderError }}</p>

      <ul class="mt-2 divide-y divide-ink-100 rounded-lg border border-ink-100 bg-surface">
        <li
          v-for="(project, index) in orderedProjects"
          :key="project.id"
          class="flex flex-col gap-4 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between"
          :class="dragOverIndex === index ? 'bg-primary-50' : ''"
          @dragover.prevent
          @dragenter.prevent="onDragEnter(index)"
          @drop.prevent="onDropReorder(index)"
        >
          <div class="flex items-center gap-4">
            <button
              type="button"
              draggable="true"
              class="hidden shrink-0 cursor-grab touch-none items-center justify-center rounded p-1 text-ink-300 hover:text-ink-500 active:cursor-grabbing sm:flex"
              :class="{ 'opacity-50': reordering }"
              :disabled="reordering"
              :aria-label="t('admin.dashboard.dragToReorder')"
              @dragstart="onDragStart(index)"
              @dragend="dragOverIndex = null"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
                <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
              </svg>
            </button>

            <div class="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-ink-50">
              <img
                v-if="project.cover_image_url"
                :src="project.cover_image_url"
                :alt="project.title"
                class="h-full w-full object-cover"
              >
            </div>
            <div>
              <p class="font-medium text-ink-900">{{ project.title }}</p>
              <p class="text-sm text-ink-500">{{ categoryLabel(project.category) }}</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
              :class="project.published
                ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                : 'bg-ink-100 text-ink-600 hover:bg-ink-200'"
              :disabled="togglingId === project.id"
              @click="onTogglePublish(project.id, project.published)"
            >
              <span class="h-1.5 w-1.5 rounded-full" :class="project.published ? 'bg-primary-600' : 'bg-ink-400'" />
              {{ project.published ? t('admin.dashboard.published') : t('admin.dashboard.draft') }}
            </button>

            <NuxtLinkLocale
              :to="`/admin/projects/${project.id}/edit`"
              class="text-sm font-medium text-ink-600 hover:text-ink-900"
            >
              {{ t('admin.dashboard.edit') }}
            </NuxtLinkLocale>

            <button
              type="button"
              :disabled="deletingId === project.id"
              class="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
              @click="onDelete(project.id, project.title)"
            >
              {{ t('admin.dashboard.delete') }}
            </button>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

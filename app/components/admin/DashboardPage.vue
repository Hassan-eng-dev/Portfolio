<script setup lang="ts">
const client = useSupabaseClient()

const { data: projects, status, error, refresh } = await useAsyncData('admin-projects', () =>
  fetchAllProjectsAdmin(client),
)

const togglingId = ref<string | null>(null)
const deletingId = ref<string | null>(null)

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
  if (!confirm(`Delete "${title}"? This can't be undone.`)) return
  deletingId.value = id
  try {
    await deleteProject(client, id)
    await refresh()
  } finally {
    deletingId.value = null
  }
}

useSeoMeta({ title: 'Dashboard' })
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl text-ink-900">Projects</h1>
        <p class="mt-1 text-sm text-ink-500">Manage published and draft work.</p>
      </div>
      <NuxtLink
        to="/admin/projects/new"
        class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        </svg>
        New project
      </NuxtLink>
    </div>

    <div v-if="status === 'pending'" class="mt-8 space-y-3">
      <div v-for="n in 4" :key="n" class="h-20 animate-pulse rounded-lg bg-ink-100" />
    </div>

    <p v-else-if="error" class="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      Couldn't load projects.
    </p>

    <div v-else-if="!projects?.length" class="mt-8 rounded-lg border border-ink-100 bg-surface p-10 text-center text-ink-500">
      No projects yet.
      <NuxtLink to="/admin/projects/new" class="font-medium text-primary-700 hover:underline">
        Create your first one
      </NuxtLink>
    </div>

    <ul v-else class="mt-8 divide-y divide-ink-100 rounded-lg border border-ink-100 bg-surface">
      <li
        v-for="project in projects"
        :key="project.id"
        class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-center gap-4">
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
            <p class="text-sm capitalize text-ink-500">{{ project.category }}</p>
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
            {{ project.published ? 'Published' : 'Draft' }}
          </button>

          <NuxtLink
            :to="`/admin/projects/${project.id}/edit`"
            class="text-sm font-medium text-ink-600 hover:text-ink-900"
          >
            Edit
          </NuxtLink>

          <button
            type="button"
            :disabled="deletingId === project.id"
            class="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
            @click="onDelete(project.id, project.title)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

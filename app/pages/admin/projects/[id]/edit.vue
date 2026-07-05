<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const client = useSupabaseClient()
const id = route.params.id as string

const { data: project, status, error } = await useAsyncData(`admin-project-${id}`, () =>
  fetchProjectByIdAdmin(client, id),
)

const submitting = ref(false)
const deleting = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit(payload: {
  title: string
  description: string
  category: string
  tags: string[]
  published: boolean
  sortOrder: number
  coverUrl: string | null
  images: { url: string; altText: string }[]
}) {
  submitting.value = true
  errorMessage.value = null

  try {
    await updateProject(client, id, {
      title: payload.title,
      description: payload.description,
      category: payload.category,
      tags: payload.tags,
      published: payload.published,
      sort_order: payload.sortOrder,
      cover_image_url: payload.coverUrl,
    })

    await replaceProjectImages(
      client,
      id,
      payload.images.map((image, index) => ({
        image_url: image.url,
        alt_text: image.altText || null,
        sort_order: index,
      })),
    )

    await router.push('/admin')
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Something went wrong.'
  } finally {
    submitting.value = false
  }
}

async function onDelete() {
  if (!project.value) return
  if (!confirm(`Delete "${project.value.title}"? This can't be undone.`)) return

  deleting.value = true
  try {
    await deleteProject(client, id)
    await router.push('/admin')
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Failed to delete project.'
  } finally {
    deleting.value = false
  }
}

useSeoMeta({ title: () => project.value?.title ?? 'Edit project' })
</script>

<template>
  <div>
    <NuxtLink to="/admin" class="text-sm font-medium text-ink-500 hover:text-ink-900">
      &larr; Back to dashboard
    </NuxtLink>

    <div v-if="status === 'pending'" class="mt-6 animate-pulse space-y-4">
      <div class="h-8 w-1/3 rounded bg-ink-100" />
      <div class="h-48 rounded bg-ink-100" />
    </div>

    <p v-else-if="error || !project" class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      Couldn't load this project.
    </p>

    <template v-else>
      <h1 class="mt-3 font-display text-2xl text-ink-900">Edit project</h1>

      <p v-if="errorMessage" role="alert" class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <div class="mt-8">
        <AdminProjectForm :initial="project" :submitting="submitting" submit-label="Save changes" @submit="onSubmit">
          <template #extra-actions>
            <button
              type="button"
              :disabled="deleting"
              class="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
              @click="onDelete"
            >
              {{ deleting ? 'Deleting…' : 'Delete project' }}
            </button>
          </template>
        </AdminProjectForm>
      </div>
    </template>
  </div>
</template>

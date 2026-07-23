<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

const router = useRouter()
const client = useSupabaseClient()
const localePath = useLocalePath()
const { t } = useI18n()

const { data: project, status, error } = await useAsyncData(`admin-project-${props.id}`, () =>
  fetchProjectByIdAdmin(client, props.id),
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
  coverUrl: string | null
  images: { url: string; altText: string }[]
}) {
  submitting.value = true
  errorMessage.value = null

  try {
    await updateProject(client, props.id, {
      title: payload.title,
      description: payload.description,
      category: payload.category,
      tags: payload.tags,
      published: payload.published,
      cover_image_url: payload.coverUrl,
    })

    await replaceProjectImages(
      client,
      props.id,
      payload.images.map((image, index) => ({
        image_url: image.url,
        alt_text: image.altText || null,
        sort_order: index,
      })),
    )

    await router.push(localePath('/admin'))
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : t('admin.common.genericError')
  } finally {
    submitting.value = false
  }
}

async function onDelete() {
  if (!project.value) return
  if (!confirm(t('admin.common.confirmDeleteProject', { title: project.value.title }))) return

  deleting.value = true
  try {
    await deleteProject(client, props.id)
    await router.push(localePath('/admin'))
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : t('admin.editProject.deleteError')
  } finally {
    deleting.value = false
  }
}

useSeoMeta({ title: () => project.value?.title ?? t('admin.editProject.seoFallbackTitle') })
</script>

<template>
  <div>
    <NuxtLinkLocale to="/admin" class="text-sm font-medium text-ink-500 hover:text-ink-900">
      <span class="inline-block rtl:scale-x-[-1]">&larr;</span> {{ t('admin.common.backToDashboard') }}
    </NuxtLinkLocale>

    <div v-if="status === 'pending'" class="mt-6 animate-pulse space-y-4">
      <div class="h-8 w-1/3 rounded bg-ink-100" />
      <div class="h-48 rounded bg-ink-100" />
    </div>

    <p v-else-if="error || !project" class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {{ t('admin.editProject.loadError') }}
    </p>

    <template v-else>
      <h1 class="mt-3 font-display text-2xl text-ink-900">{{ t('admin.editProject.heading') }}</h1>

      <p v-if="errorMessage" role="alert" class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <div class="mt-8">
        <AdminProjectForm :initial="project" :submitting="submitting" :submit-label="t('admin.editProject.submitLabel')" @submit="onSubmit">
          <template #extra-actions>
            <button
              type="button"
              :disabled="deleting"
              class="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
              @click="onDelete"
            >
              {{ deleting ? t('admin.editProject.deleting') : t('admin.editProject.deleteProject') }}
            </button>
          </template>
        </AdminProjectForm>
      </div>
    </template>
  </div>
</template>

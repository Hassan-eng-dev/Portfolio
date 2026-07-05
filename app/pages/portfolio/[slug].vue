<script setup lang="ts">
const route = useRoute()
const client = useSupabaseClient()
const slug = route.params.slug as string

const { data: project, status, error } = await useAsyncData(`project-${slug}`, () =>
  fetchProjectBySlug(client, slug),
)

if (status.value !== 'pending' && !project.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: () => project.value?.title ?? 'Project',
  description: () => project.value?.description?.slice(0, 160),
})
</script>

<template>
  <div class="mx-auto max-w-content px-6 py-16 sm:px-10 sm:py-24">
    <div v-if="status === 'pending'" class="animate-pulse space-y-6">
      <div class="h-10 w-2/3 rounded bg-ink-100" />
      <div class="aspect-[16/9] rounded-lg bg-ink-100" />
    </div>

    <p v-else-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      Couldn't load this project right now.
    </p>

    <template v-else-if="project">
      <NuxtLink to="/portfolio" class="inline-flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M11 18l-6-6 6-6M5 12h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Back to portfolio
      </NuxtLink>

      <header class="mt-6 max-w-2xl">
        <p class="text-sm font-medium uppercase tracking-widest text-primary-600">{{ project.category }}</p>
        <h1 class="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">{{ project.title }}</h1>
        <p v-if="project.description" class="mt-5 text-lg leading-relaxed text-ink-600">
          {{ project.description }}
        </p>
        <ul v-if="project.tags?.length" class="mt-5 flex flex-wrap gap-2">
          <li
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600"
          >
            {{ tag }}
          </li>
        </ul>
      </header>

      <div class="mt-12">
        <img
          v-if="project.cover_image_url"
          :src="project.cover_image_url"
          :alt="project.title"
          class="w-full rounded-lg object-cover"
        >
      </div>

      <div v-if="project.project_images?.length" class="mt-8">
        <ProjectGallery :images="project.project_images" />
      </div>
    </template>
  </div>
</template>

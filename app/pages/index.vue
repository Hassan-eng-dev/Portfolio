<script setup lang="ts">
const client = useSupabaseClient()

const { data: projects, status, error } = await useAsyncData('featured-projects', () =>
  fetchFeaturedProjects(client, 6),
)

useSeoMeta({
  title: 'Home',
  description: 'Selected graphic design work — branding, illustration, print, digital and packaging.',
})
</script>

<template>
  <div>
    <section class="mx-auto max-w-content px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24">
      <p class="text-sm font-medium uppercase tracking-widest text-primary-600">Graphic Design Studio</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl leading-tight text-ink-900 sm:text-6xl">
        Visual identities and design work that make ideas legible.
      </h1>
      <p class="mt-6 max-w-xl text-lg text-ink-600">
        A selection of branding, illustration, print, digital and packaging projects.
      </p>
      <NuxtLink
        to="/portfolio"
        class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      >
        View full portfolio
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </NuxtLink>
    </section>

    <section class="mx-auto max-w-content px-6 pb-24 sm:px-10">
      <div class="mb-8 flex items-baseline justify-between">
        <h2 class="font-display text-2xl text-ink-900">Selected work</h2>
        <NuxtLink to="/portfolio" class="text-sm font-medium text-ink-500 hover:text-ink-900">
          See all
        </NuxtLink>
      </div>

      <div v-if="status === 'pending'" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 6" :key="n" class="animate-pulse">
          <div class="aspect-[4/5] rounded-lg bg-ink-100" />
          <div class="mt-3 h-4 w-2/3 rounded bg-ink-100" />
          <div class="mt-2 h-3 w-1/3 rounded bg-ink-100" />
        </div>
      </div>

      <p v-else-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Couldn't load projects right now. Please refresh the page.
      </p>

      <p v-else-if="!projects?.length" class="rounded-lg border border-ink-100 bg-ink-50 p-8 text-center text-ink-500">
        No published work yet — check back soon.
      </p>

      <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          :priority="index < 3"
        />
      </div>
    </section>
  </div>
</template>

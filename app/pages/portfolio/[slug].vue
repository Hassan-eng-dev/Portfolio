<script setup lang="ts">
import { motion } from 'motion-v'

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
  <div>
    <div v-if="status === 'pending'" class="mx-auto max-w-content animate-pulse space-y-6 px-6 py-16 sm:px-10 sm:py-24">
      <div class="h-10 w-2/3 rounded bg-ink-100" />
      <div class="aspect-[16/9] rounded-2xl bg-ink-100" />
    </div>

    <p v-else-if="error" class="mx-auto max-w-content rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      Couldn't load this project right now.
    </p>

    <template v-else-if="project">
      <section class="relative overflow-hidden border-b border-ink-100">
        <div class="aurora-field opacity-40">
          <div class="aurora-blob left-1/2 top-[-25%] h-[22rem] w-[22rem] -translate-x-1/2 animate-aurora bg-brand-300" />
        </div>

        <motion.div
          class="relative mx-auto max-w-content px-6 pb-14 pt-16 sm:px-10 sm:pb-20 sm:pt-24"
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
        >
          <NuxtLink to="/portfolio" class="inline-flex items-center gap-1 text-sm font-medium text-ink-500 transition-colors hover:text-brand-700">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M11 18l-6-6 6-6M5 12h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Back to portfolio
          </NuxtLink>

          <header class="mt-6 max-w-2xl">
            <p class="text-sm font-medium uppercase tracking-widest text-brand-600">{{ project.category }}</p>
            <h1 class="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">{{ project.title }}</h1>
            <p v-if="project.description" class="mt-5 text-lg leading-relaxed text-ink-600">
              {{ project.description }}
            </p>
            <ul v-if="project.tags?.length" class="mt-6 flex flex-wrap gap-2">
              <li
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-ink-200 px-3 py-1 text-xs font-medium text-ink-600"
              >
                {{ tag }}
              </li>
            </ul>
          </header>
        </motion.div>
      </section>

      <div class="mx-auto max-w-content px-6 py-12 sm:px-10 sm:py-16">
        <motion.div
          class="overflow-hidden rounded-3xl shadow-glow-lg"
          :initial="{ opacity: 0, scale: 0.97 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
        >
          <img
            v-if="project.cover_image_url"
            :src="project.cover_image_url"
            :alt="project.title"
            class="w-full object-cover"
          >
        </motion.div>

        <div v-if="project.project_images?.length" class="mt-10">
          <ProjectGallery :images="project.project_images" />
        </div>

        <motion.div
          class="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-ink-100 bg-surface-muted p-10 text-center sm:flex-row sm:justify-between sm:text-left"
          :initial="{ opacity: 0, y: 24 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
          :transition="{ duration: 0.5 }"
        >
          <div>
            <p class="text-sm font-medium uppercase tracking-widest text-brand-600">Like what you see?</p>
            <h2 class="mt-2 font-display text-2xl text-ink-900">Let's create your next project.</h2>
          </div>
          <NuxtLink v-slot="{ navigate, href }" to="/contact" custom>
            <motion.a
              :href="href"
              class="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white shadow-glow"
              :whileHover="{ scale: 1.05, y: -2 }"
              :whilePress="{ scale: 0.96 }"
              :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
              @click="navigate"
            >
              Start a project
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </motion.a>
          </NuxtLink>
        </motion.div>
      </div>
    </template>
  </div>
</template>

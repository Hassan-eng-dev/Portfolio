<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

const { t } = useI18n()
const client = useSupabaseClient()

const {
  data: projects,
  status,
  error,
} = await useAsyncData('featured-projects', () => fetchFeaturedProjects(client, 6))

const bentoAspect = (index: number) =>
  index === 0 ? 'aspect-[4/5] sm:aspect-auto sm:flex-1' : 'aspect-[4/5]'
const bentoSpan = (index: number) => (index === 0 ? 'sm:col-span-2 sm:row-span-2' : '')
</script>

<template>
  <section class="mx-auto max-w-content px-6 pb-24 sm:px-10">
    <motion.div
      class="mb-10 flex items-baseline justify-between"
      :initial="{ opacity: 0, y: 16 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :viewport="{ once: true, margin: '-80px' }"
      :transition="{ duration: 0.5 }"
    >
      <div>
        <p class="text-sm font-medium uppercase tracking-widest text-brand-600">
          {{ t('home.portfolioEyebrow') }}
        </p>
        <h2 class="mt-2 font-display text-3xl text-ink-900 sm:text-4xl dark:text-white">
          {{ t('home.selectedWork') }}
        </h2>
      </div>
      <NuxtLinkLocale
        to="/portfolio"
        class="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700 dark:text-ink-400 dark:hover:text-brand-400"
      >
        {{ t('home.seeAll') }}
        <IconsArrowRightIcon
          class="h-4 w-4 transition-transform rtl:scale-x-[-1] group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        />
      </NuxtLinkLocale>
    </motion.div>

    <div
      v-if="status === 'pending'"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div v-for="n in 6" :key="n" class="animate-pulse">
        <div class="aspect-[4/5] rounded-2xl bg-ink-100 dark:bg-ink-800" />
        <div class="mt-3 h-4 w-2/3 rounded bg-ink-100 dark:bg-ink-800" />
        <div class="mt-2 h-3 w-1/3 rounded bg-ink-100 dark:bg-ink-800" />
      </div>
    </div>

    <p
      v-else-if="error"
      class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
    >
      {{ t('home.projectsError') }}
    </p>

    <p
      v-else-if="!projects?.length"
      class="rounded-2xl border border-ink-100 bg-ink-50 p-8 text-center text-ink-500 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-400"
    >
      {{ t('home.projectsEmpty') }}
    </p>

    <motion.div
      v-else
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-[16rem] lg:grid-cols-3"
      :variants="staggerContainer"
      initial="hidden"
      :whileInView="'show'"
      :viewport="{ once: true, margin: '-80px' }"
    >
      <motion.div
        v-for="(project, index) in projects"
        :key="project.id"
        :variants="staggerItem"
        :class="bentoSpan(index)"
      >
        <ProjectCard
          :project="project"
          :priority="index < 3"
          :aspect-class="bentoAspect(index)"
        />
      </motion.div>
    </motion.div>
  </section>
</template>

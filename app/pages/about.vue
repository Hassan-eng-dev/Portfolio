<script setup lang="ts">
import { motion, stagger } from 'motion-v'

const skills = [
  'Brand Identity',
  'Illustration',
  'Editorial & Print',
  'Digital Design',
  'Packaging',
  'Art Direction',
]

const timeline = [
  { year: '2025 — Now', title: 'Independent Designer', body: 'Partnering directly with founders and studios on branding and visual systems.' },
  { year: '2022 — 2025', title: 'Senior Graphic Designer', body: 'Led identity and packaging work for a range of consumer brands.' },
  { year: '2019 — 2022', title: 'Graphic Designer', body: 'Built a foundation across print, digital and illustration work.' },
]

const staggerContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.08) } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

useSeoMeta({
  title: 'About',
  description: 'Hassan Adel — graphic designer. Background, process and the kind of work I take on.',
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-ink-100">
      <div class="aurora-field opacity-70">
        <div class="aurora-blob left-1/2 top-[-20%] h-[24rem] w-[24rem] -translate-x-1/2 animate-aurora bg-brand-300" />
      </div>

      <div class="relative mx-auto grid max-w-content gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
        >
          <p class="text-sm font-medium uppercase tracking-widest text-brand-600">About</p>
          <h1 class="mt-3 font-display text-4xl leading-tight text-ink-900 sm:text-5xl">
            Hi, I'm Hassan Adel — a designer obsessed with clarity.
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-ink-600">
            I'm a graphic designer working across branding, illustration, print, digital and
            packaging. My process blends sharp strategic thinking with a genuine love of
            craft — every project starts with a question, not a template.
          </p>
          <p class="mt-4 text-lg leading-relaxed text-ink-600">
            Over the years I've partnered with startups, studios and independent brands who
            wanted work that felt considered, distinctive and built to last.
          </p>

          <NuxtLink v-slot="{ navigate, href }" to="/contact" custom>
            <motion.a
              :href="href"
              class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white"
              :whileHover="{ scale: 1.05, y: -2 }"
              :whilePress="{ scale: 0.96 }"
              :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
              @click="navigate"
            >
              Get in touch
            </motion.a>
          </NuxtLink>
        </motion.div>

        <motion.div
          class="relative mx-auto aspect-square w-full max-w-sm"
          :initial="{ opacity: 0, scale: 0.9 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }"
        >
          <div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-800 shadow-glow-lg" />
          <div class="absolute inset-3 flex items-center justify-center rounded-[1.5rem] bg-surface">
            <span class="font-display text-6xl text-brand-600">HA</span>
          </div>
          <motion.div
            class="absolute -bottom-4 -right-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface shadow-card ring-1 ring-ink-100"
            :animate="{ y: [0, -10, 0] }"
            :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
          >
            <span class="font-display text-lg text-ink-900">6+ yrs</span>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <section class="mx-auto max-w-content px-6 py-20 sm:px-10">
      <motion.h2
        class="font-display text-2xl text-ink-900 sm:text-3xl"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
      >
        What I do
      </motion.h2>
      <motion.div
        class="mt-8 flex flex-wrap gap-3"
        :variants="staggerContainer"
        initial="hidden"
        :whileInView="'show'"
        :viewport="{ once: true, margin: '-80px' }"
      >
        <motion.span
          v-for="skill in skills"
          :key="skill"
          :variants="staggerItem"
          class="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700"
          :whileHover="{ scale: 1.05, backgroundColor: '#eff6ff', borderColor: '#93c5fd', color: '#1d4ed8' }"
          :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
        >
          {{ skill }}
        </motion.span>
      </motion.div>
    </section>

    <section class="border-t border-ink-100 bg-surface-muted">
      <div class="mx-auto max-w-content px-6 py-20 sm:px-10">
        <motion.h2
          class="font-display text-2xl text-ink-900 sm:text-3xl"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
        >
          Experience
        </motion.h2>

        <motion.div
          class="mt-10 space-y-8"
          :variants="staggerContainer"
          initial="hidden"
          :whileInView="'show'"
          :viewport="{ once: true, margin: '-80px' }"
        >
          <motion.div
            v-for="item in timeline"
            :key="item.title"
            :variants="staggerItem"
            class="grid gap-2 border-l-2 border-brand-200 pl-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p class="text-sm font-medium text-brand-600">{{ item.year }}</p>
            <div>
              <h3 class="font-display text-lg text-ink-900">{{ item.title }}</h3>
              <p class="mt-1 text-ink-600">{{ item.body }}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </div>
</template>

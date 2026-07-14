<script setup lang="ts">
import { motion, stagger } from "motion-v";
import { PROJECT_CATEGORIES } from "~~/shared/types/database.types";

const client = useSupabaseClient();

const {
  data: projects,
  status,
  error,
} = await useAsyncData("featured-projects", () =>
  fetchFeaturedProjects(client, 6),
);

const stats = [
  { value: "40+", label: "Projects delivered" },
  { value: "6", label: "Years of craft" },
  { value: "5", label: "Disciplines covered" },
  { value: "18", label: "Happy clients" },
];

const process = [
  {
    title: "Discover",
    body: "Understand the brand, the audience and the problem before a single pixel moves.",
  },
  {
    title: "Design",
    body: "Explore bold directions, refine the strongest one, and build a system around it.",
  },
  {
    title: "Deliver",
    body: "Ship polished, production-ready assets — and stay close through launch.",
  },
];

const bentoAspect = (index: number) =>
  index === 0 ? "flex-1" : "aspect-[4/5]";
const bentoSpan = (index: number) =>
  index === 0 ? "sm:col-span-2 sm:row-span-2" : "";

const heroContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.12) } },
};
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.08) } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

useSeoMeta({
  title: "Home",
  description:
    "Hassan Adel — graphic designer crafting bold visual identities, illustration, print, digital and packaging work.",
});
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[38rem] overflow-hidden">
      <div class="grain-overlay" />

      <div
        class="relative mx-auto flex max-w-content items-center justify-between gap-12 px-6 pb-20 pt-24 sm:px-10 sm:pb-28 sm:pt-32"
      >
        <motion.div
          class="max-w-2xl"
          :variants="heroContainer"
          initial="hidden"
          animate="show"
        >
          <motion.p
            :variants="heroItem"
            class="inline-flex items-center gap-2 rounded-full border border-brand-200 text-green-500 px-4 py-1.5 text-sm font-medium bg-green-100/75"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-green-500" />
            Available for new projects
          </motion.p>

          <motion.h1
            :variants="heroItem"
            class="text-hero mt-6 font-display text-ink-900"
          >
            I'm Hassan Adel — I design
            <span class="text-gradient">visual identities</span>
            that make ideas unforgettable.
          </motion.h1>

          <motion.p
            :variants="heroItem"
            class="mt-6 max-w-xl text-lg text-ink-600"
          >
            A graphic designer crafting branding, illustration, print, digital
            and packaging work with a sharp eye for detail and a love for bold
            blue.
          </motion.p>

          <motion.div
            :variants="heroItem"
            class="mt-10 flex flex-wrap items-center gap-4"
          >
            <NuxtLink v-slot="{ navigate, href }" to="/portfolio" custom>
              <motion.a
                :href="href"
                class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-white shadow-glow-lg"
                :whileHover="{ scale: 1.05, y: -2 }"
                :whilePress="{ scale: 0.96 }"
                :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
                @click="navigate"
              >
                View my work
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </motion.a>
            </NuxtLink>
            <NuxtLink v-slot="{ navigate, href }" to="/contact" custom>
              <motion.a
                :href="href"
                class="inline-flex items-center gap-2 rounded-full border border-ink-200 px-6 py-3.5 text-sm font-medium text-ink-800"
                :whileHover="{ scale: 1.05, y: -2, borderColor: '#93c5fd' }"
                :whilePress="{ scale: 0.96 }"
                :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
                @click="navigate"
              >
                Let's talk
              </motion.a>
            </NuxtLink>
          </motion.div>
        </motion.div>

        <div class="relative hidden sm:block">
          <motion.img
            src="/avatar-designer.png"
            alt="Illustrated 3D avatar of Hassan Adel surrounded by design tool icons"
            class="hidden w-[22rem] max-w-none shrink-0 select-none sm:block lg:w-[28rem]"
            :initial="{ opacity: 0, y: 40, scale: 0.94 }"
            :animate="{ opacity: 1, y: [0, -40, 0], scale: 1 }"
            :transition="{
              opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.8,
              },
            }"
          />
          <motion.img
            src="/avatar.png"
            alt="Illustrated 3D avatar of Hassan Adel surrounded by design tool icons"
            class="hidden absolute top-20 left-40 w-[22rem] max-w-none shrink-0 select-none sm:block lg:w-[10rem]"
            :initial="{ opacity: 0, y: 40, scale: 0.94 }"
            :animate="{ opacity: 1, y: [0, -0, 0], scale: 1 }"
            :transition="{
              opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.8,
              },
            }"
          />
        </div>
      </div>
    </section>

    <!-- Video intro -->
    <section
      class="relative overflow-hidden border-t border-ink-100 bg-surface-muted"
    >
      <div class="grain-overlay" />

      <div
        class="relative mx-auto flex max-w-content flex-col items-center gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:flex-row lg:gap-16"
      >
        <motion.div
          class="w-full max-w-xl lg:max-w-none lg:flex-1"
          :initial="{ opacity: 0, x: -32, scale: 0.96 }"
          :whileInView="{ opacity: 1, x: 0, scale: 1 }"
          :viewport="{ once: true, margin: '-80px' }"
          :transition="{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }"
        >
          <div class="relative">
            <video class="w-3/4 rounded-2xl" autoplay loop muted playsinline>
              <source src="/Hello.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        <motion.div
          class="w-full max-w-xl lg:flex-1"
          :variants="staggerContainer"
          initial="hidden"
          :whileInView="'show'"
          :viewport="{ once: true, margin: '-80px' }"
        >
          <motion.h2
            :variants="staggerItem"
            class="font-display text-4xl text-ink-900 sm:text-5xl"
            style="text-wrap: balance"
          >
            Hi, I'm Hassan —
            <span class="text-gradient">yes, that's really me</span> talking.
          </motion.h2>

          <motion.p
            :variants="staggerItem"
            class="mt-6 max-w-xl text-lg text-ink-600"
            style="text-wrap: pretty"
          >
            For the past six years I've turned client briefs into identities
            people actually remember — sketching logotypes past midnight,
            obsessing over kerning nobody else will notice, and pushing every
            project one revision further than "good enough." I'm not a faceless
            studio; I'm one designer who reads every brief twice, argues gently
            for the bolder direction, and stays close through launch instead of
            disappearing after handoff.
          </motion.p>

          <motion.p
            :variants="staggerItem"
            class="mt-4 max-w-xl text-lg text-ink-600"
            style="text-wrap: pretty"
          >
            If the work below speaks for itself, this thirty-second hello is for
            everything the portfolio can't show — how I think, how I work, and
            why clients keep coming back for the next project.
          </motion.p>

          <motion.div :variants="staggerItem" class="mt-8">
            <NuxtLink v-slot="{ navigate, href }" to="/about" custom>
              <motion.a
                :href="href"
                class="inline-flex items-center gap-2 rounded-full border border-ink-200 px-6 py-3.5 text-sm font-medium text-ink-800"
                :whileHover="{ scale: 1.05, y: -2, borderColor: '#93c5fd' }"
                :whilePress="{ scale: 0.96 }"
                :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
                @click="navigate"
              >
                Get to know me
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </motion.a>
            </NuxtLink>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <!-- Marquee -->
    <section class="border-y border-ink-100 py-6">
      <Marquee
        :items="
          [...PROJECT_CATEGORIES].map(
            (c) => c.charAt(0).toUpperCase() + c.slice(1),
          )
        "
      />
    </section>

    <!-- Stats -->
    <motion.section
      class="mx-auto max-w-content px-6 py-16 sm:px-10 sm:py-20"
      :variants="staggerContainer"
      initial="hidden"
      :whileInView="'show'"
      :viewport="{ once: true, margin: '-80px' }"
    >
      <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <motion.div
          v-for="stat in stats"
          :key="stat.label"
          :variants="staggerItem"
          class="rounded-2xl border border-ink-100 bg-surface-muted p-6 text-center transition-colors hover:border-brand-200"
        >
          <p class="font-display text-3xl text-brand-600 sm:text-4xl">
            {{ stat.value }}
          </p>
          <p class="mt-1 text-sm text-ink-500">{{ stat.label }}</p>
        </motion.div>
      </div>
    </motion.section>

    <!-- Featured work -->
    <section class="mx-auto max-w-content px-6 pb-24 sm:px-10">
      <motion.div
        class="mb-10 flex items-baseline justify-between"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
        :transition="{ duration: 0.5 }"
      >
        <div>
          <p
            class="text-sm font-medium uppercase tracking-widest text-brand-600"
          >
            Portfolio
          </p>
          <h2 class="mt-2 font-display text-3xl text-ink-900 sm:text-4xl">
            Selected work
          </h2>
        </div>
        <NuxtLink
          to="/portfolio"
          class="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700"
        >
          See all
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NuxtLink>
      </motion.div>

      <div
        v-if="status === 'pending'"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div v-for="n in 6" :key="n" class="animate-pulse">
          <div class="aspect-[4/5] rounded-2xl bg-ink-100" />
          <div class="mt-3 h-4 w-2/3 rounded bg-ink-100" />
          <div class="mt-2 h-3 w-1/3 rounded bg-ink-100" />
        </div>
      </div>

      <p
        v-else-if="error"
        class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        Couldn't load projects right now. Please refresh the page.
      </p>

      <p
        v-else-if="!projects?.length"
        class="rounded-2xl border border-ink-100 bg-ink-50 p-8 text-center text-ink-500"
      >
        No published work yet — check back soon.
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

    <!-- Process -->
    <section class="border-t border-ink-100 bg-surface-muted">
      <div class="mx-auto max-w-content px-6 py-20 sm:px-10 sm:py-28">
        <motion.p
          class="text-sm font-medium uppercase tracking-widest text-brand-600"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
        >
          How I work
        </motion.p>
        <motion.h2
          class="mt-2 max-w-lg font-display text-3xl text-ink-900 sm:text-4xl"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
          :transition="{ delay: 0.1 }"
        >
          A simple process built for great outcomes.
        </motion.h2>

        <motion.div
          class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3"
          :variants="staggerContainer"
          initial="hidden"
          :whileInView="'show'"
          :viewport="{ once: true, margin: '-80px' }"
        >
          <motion.div
            v-for="(step, index) in process"
            :key="step.title"
            :variants="staggerItem"
            class="relative rounded-2xl border border-ink-100 bg-surface p-8"
            :whileHover="{
              y: -6,
              boxShadow:
                '0 0 0 1px rgba(37,99,235,0.35), 0 24px 48px -16px rgba(37,99,235,0.45)',
            }"
            :transition="{ type: 'spring', stiffness: 300, damping: 22 }"
          >
            <span class="font-display text-4xl text-brand-200"
              >0{{ index + 1 }}</span
            >
            <h3 class="mt-4 font-display text-xl text-ink-900">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-ink-600">{{ step.body }}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </div>
</template>

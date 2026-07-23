<script setup lang="ts">
import { motion, stagger } from 'motion-v'

const { t } = useI18n()
const { applied: appliedTheme } = useTheme()

const skillHover = computed(() =>
  appliedTheme.value === 'dark'
    ? { scale: 1.05, backgroundColor: 'rgba(37,99,235,0.15)', borderColor: '#1d4ed8', color: '#93c5fd' }
    : { scale: 1.05, backgroundColor: '#eff6ff', borderColor: '#93c5fd', color: '#1d4ed8' },
)

const skills = computed(() => [
  t('about.skills.brandIdentity'),
  t('about.skills.illustration'),
  t('about.skills.editorialPrint'),
  t('about.skills.digitalDesign'),
  t('about.skills.packaging'),
  t('about.skills.artDirection'),
])

const timeline = computed(() => [
  { year: t('about.timeline.current.year'), title: t('about.timeline.current.title'), body: t('about.timeline.current.body') },
  { year: t('about.timeline.senior.year'), title: t('about.timeline.senior.title'), body: t('about.timeline.senior.body') },
  { year: t('about.timeline.early.year'), title: t('about.timeline.early.title'), body: t('about.timeline.early.body') },
])

const staggerContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.08) } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

useSeoMeta({
  title: () => t('about.seoTitle'),
  description: () => t('about.seoDescription'),
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-ink-100 dark:border-ink-800">
      <div class="aurora-field opacity-70">
        <div class="aurora-blob left-1/2 top-[-20%] h-[24rem] w-[24rem] -translate-x-1/2 animate-aurora bg-brand-300" />
      </div>

      <div class="relative mx-auto grid max-w-content gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
        >
          <p class="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">{{ t('about.eyebrow') }}</p>
          <h1 class="mt-3 font-display text-4xl leading-tight text-ink-900 sm:text-5xl dark:text-white">
            {{ t('about.heading') }}
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {{ t('about.paragraph1') }}
          </p>
          <p class="mt-4 text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {{ t('about.paragraph2') }}
          </p>

          <NuxtLinkLocale v-slot="{ navigate, href }" to="/contact" custom>
            <motion.a
              :href="href"
              class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-ink-900"
              :whileHover="{ scale: 1.05, y: -2 }"
              :whilePress="{ scale: 0.96 }"
              :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
              @click="navigate"
            >
              {{ t('about.getInTouch') }}
            </motion.a>
          </NuxtLinkLocale>
        </motion.div>

        <motion.div
          class="relative mx-auto aspect-square w-full max-w-sm"
          :initial="{ opacity: 0, scale: 0.9 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }"
        >
          <div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-800 shadow-glow-lg" />
          <div class="absolute inset-3 flex items-center justify-center rounded-[1.5rem] bg-white dark:bg-ink-950">
            <span class="font-display text-6xl text-brand-600 dark:text-brand-400">HA</span>
          </div>
          <motion.div
            class="absolute -bottom-4 -end-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-ink-100 dark:bg-ink-900 dark:ring-white/10"
            :animate="{ y: [0, -10, 0] }"
            :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
          >
            <span class="font-display text-lg text-ink-900 dark:text-white">{{ t('about.yearsBadge') }}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <section class="mx-auto max-w-content px-6 py-20 sm:px-10">
      <motion.h2
        class="font-display text-2xl text-ink-900 sm:text-3xl dark:text-white"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
      >
        {{ t('about.whatIDo') }}
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
          class="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 dark:border-ink-700 dark:text-ink-300"
          :whileHover="skillHover"
          :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
        >
          {{ skill }}
        </motion.span>
      </motion.div>
    </section>

    <section class="border-t border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/60">
      <div class="mx-auto max-w-content px-6 py-20 sm:px-10">
        <motion.h2
          class="font-display text-2xl text-ink-900 sm:text-3xl dark:text-white"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
        >
          {{ t('about.experience') }}
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
            class="grid gap-2 border-s-2 border-brand-200 ps-6 sm:grid-cols-[10rem_1fr] sm:gap-8 dark:border-brand-800"
          >
            <p class="text-sm font-medium text-brand-600 dark:text-brand-400">{{ item.year }}</p>
            <div>
              <h3 class="font-display text-lg text-ink-900 dark:text-white">{{ item.title }}</h3>
              <p class="mt-1 text-ink-600 dark:text-ink-300">{{ item.body }}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </div>
</template>

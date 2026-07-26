<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

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
</script>

<template>
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
</template>

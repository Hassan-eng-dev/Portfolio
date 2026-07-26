<script setup lang="ts">
import { motion } from 'motion-v'
import { heroContainer, heroItem } from '~/utils/motionVariants'

const { t } = useI18n()
</script>

<template>
  <section class="relative min-h-[38rem] overflow-hidden">
    <div class="grain-overlay" />

    <div
      class="relative mx-auto flex max-w-content flex-col-reverse items-center gap-10 px-6 pb-16 pt-20 text-center sm:flex-row sm:justify-between sm:gap-12 sm:px-10 sm:pb-28 sm:pt-32 sm:text-start"
    >
      <motion.div
        class="max-w-2xl"
        :variants="heroContainer"
        initial="hidden"
        animate="show"
      >
        <motion.p
          :variants="heroItem"
          class="inline-flex items-center gap-2 rounded-full border border-brand-200 text-green-500 px-4 py-1.5 text-sm font-medium bg-green-100/75 dark:border-brand-800 dark:bg-green-500/10 dark:text-green-400"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-green-500" />
          {{ t('home.badge') }}
        </motion.p>

        <motion.h1
          :variants="heroItem"
          class="text-hero mt-6 font-display text-ink-900 dark:text-white"
        >
          {{ t('home.heroTitlePrefix') }}
          <span class="text-gradient">{{ t('home.heroTitleHighlight') }}</span>
          {{ t('home.heroTitleSuffix') }}
        </motion.h1>

        <motion.p
          :variants="heroItem"
          class="mx-auto mt-6 max-w-xl text-lg text-ink-600 sm:mx-0 dark:text-ink-300"
        >
          {{ t('home.heroSubtitle') }}
        </motion.p>

        <motion.div
          :variants="heroItem"
          class="mt-10 flex flex-wrap items-center justify-center gap-4 sm:justify-start"
        >
          <NuxtLinkLocale v-slot="{ navigate, href }" to="/portfolio" custom>
            <motion.a
              :href="href"
              class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-white shadow-glow-lg dark:bg-white dark:text-ink-900"
              :whileHover="{ scale: 1.05, y: -2 }"
              :whilePress="{ scale: 0.96 }"
              :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
              @click="navigate"
            >
              {{ t('home.viewWork') }}
              <IconsArrowRightIcon class="h-4 w-4 rtl:scale-x-[-1]" />
            </motion.a>
          </NuxtLinkLocale>
          <NuxtLinkLocale v-slot="{ navigate, href }" to="/contact" custom>
            <motion.a
              :href="href"
              class="inline-flex items-center gap-2 rounded-full border border-ink-200 px-6 py-3.5 text-sm font-medium text-ink-800 dark:border-ink-700 dark:text-ink-100"
              :whileHover="{ scale: 1.05, y: -2, borderColor: '#93c5fd' }"
              :whilePress="{ scale: 0.96 }"
              :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
              @click="navigate"
            >
              {{ t('home.letsTalk') }}
            </motion.a>
          </NuxtLinkLocale>
        </motion.div>
      </motion.div>

      <div class="relative mx-auto w-80 shrink-0 sm:mx-0 sm:w-72 md:w-80 lg:w-[28rem]">
        <motion.img
          src="/avatar-designer.png"
          :alt="t('home.avatarAlt')"
          class="w-full max-w-none select-none"
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
          :alt="t('home.avatarAlt')"
          class="absolute top-[13%] start-[36%] w-[36%] max-w-none select-none drop-shadow-xl"
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
</template>

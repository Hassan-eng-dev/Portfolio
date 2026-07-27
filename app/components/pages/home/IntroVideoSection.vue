<script setup lang="ts">
import { motion } from 'motion-v'
import { staggerContainer, staggerItem } from '~/utils/motionVariants'

const { t, localeProperties } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')
</script>

<template>
  <section
    class="relative overflow-hidden border-t border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/60"
  >
    <div class="grain-overlay" />

    <div
      class="relative mx-auto flex max-w-content flex-col items-center gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:flex-row lg:gap-16"
    >
      <motion.div
        class="relative mx-auto w-80 shrink-0 sm:mx-0 sm:w-72 md:w-80 lg:w-[28rem]"
        :initial="{ opacity: 0, x: isRtl ? 32 : -32, scale: 0.96 }"
        :whileInView="{ opacity: 1, x: 0, scale: 1 }"
        :viewport="{ once: true, margin: '-80px' }"
        :transition="{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }"
      >
        <motion.img
          src="/avatar-designer.png"
          :alt="t('home.avatarAlt')"
          class="w-full max-w-none select-none"
          :animate="{ y: [0, -40, 0] }"
          :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }"
        />
        <motion.img
          src="/avatar.png"
          :alt="t('home.avatarAlt')"
          class="absolute top-[13%] start-[36%] w-[36%] max-w-none select-none drop-shadow-xl"
        />
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
          class="font-display text-4xl text-ink-900 sm:text-5xl dark:text-white"
          style="text-wrap: balance"
        >
          {{ t('home.videoHeadingPrefix') }}
          <span class="text-gradient">{{ t('home.videoHeadingHighlight') }}</span>
          {{ t('home.videoHeadingSuffix') }}
        </motion.h2>

        <motion.p
          :variants="staggerItem"
          class="mt-6 max-w-xl text-lg text-ink-600 dark:text-ink-300"
          style="text-wrap: pretty"
        >
          {{ t('home.videoParagraph1') }}
        </motion.p>

        <motion.p
          :variants="staggerItem"
          class="mt-4 max-w-xl text-lg text-ink-600 dark:text-ink-300"
          style="text-wrap: pretty"
        >
          {{ t('home.videoParagraph2') }}
        </motion.p>

        <motion.div :variants="staggerItem" class="mt-8">
          <NuxtLinkLocale v-slot="{ navigate, href }" to="/about" custom>
            <motion.a
              :href="href"
              class="inline-flex items-center gap-2 rounded-full border border-ink-200 px-6 py-3.5 text-sm font-medium text-ink-800 dark:border-ink-700 dark:text-ink-100"
              :whileHover="{ scale: 1.05, y: -2, borderColor: '#93c5fd' }"
              :whilePress="{ scale: 0.96 }"
              :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
              @click="navigate"
            >
              {{ t('home.getToKnowMe') }}
              <IconsArrowRightIcon />
            </motion.a>
          </NuxtLinkLocale>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>

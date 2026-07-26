<script setup lang="ts">
import { motion } from 'motion-v'

const { t } = useI18n()
</script>

<template>
  <section class="border-t border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/60">
    <div class="mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-16 text-center sm:px-10">
      <h2 class="font-display text-2xl text-ink-900 dark:text-white">{{ t('pricing.closingHeading') }}</h2>
      <p class="max-w-md text-ink-600 dark:text-ink-300">{{ t('pricing.closingBody') }}</p>
      <NuxtLinkLocale v-slot="{ navigate, href }" to="/contact" custom>
        <motion.a
          :href="href"
          class="mt-2 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-ink-900"
          :whileHover="{ scale: 1.05, y: -2 }"
          :whilePress="{ scale: 0.96 }"
          :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
          @click="navigate"
        >
          {{ t('pricing.closingCta') }}
        </motion.a>
      </NuxtLinkLocale>
    </div>
  </section>
</template>

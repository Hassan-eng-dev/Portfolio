<script setup lang="ts">
import { motion } from 'motion-v'

const { t } = useI18n()

const details = computed(() => [
  {
    label: t('contact.details.email'),
    value: 'Hassan.adel3886@gmail.com',
    href: 'mailto:Hassan.adel3886@gmail.com',
  },
  { label: t('contact.details.basedIn'), value: t('contact.details.basedInValue') },
  { label: t('contact.details.availability'), value: t('contact.details.availabilityValue') },
])
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
  >
    <p class="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">
      {{ t('contact.eyebrow') }}
    </p>
    <h1 class="mt-3 font-display text-4xl leading-tight text-ink-900 sm:text-5xl dark:text-white">
      {{ t('contact.heading') }}
    </h1>
    <p class="mt-5 max-w-md text-lg text-ink-600 dark:text-ink-300">
      {{ t('contact.intro') }}
    </p>

    <dl class="mt-10 space-y-6">
      <div
        v-for="detail in details"
        :key="detail.label"
        class="border-t border-ink-100 pt-4 first:border-t-0 first:pt-0 dark:border-ink-800"
      >
        <dt class="text-sm text-ink-500 dark:text-ink-400">{{ detail.label }}</dt>
        <dd class="mt-1">
          <a
            v-if="detail.href"
            :href="detail.href"
            class="font-display text-lg text-ink-900 transition-colors hover:text-brand-700 dark:text-white dark:hover:text-brand-400"
            >{{ detail.value }}</a
          >
          <span v-else class="font-display text-lg text-ink-900 dark:text-white">{{
            detail.value
          }}</span>
        </dd>
      </div>
    </dl>
  </motion.div>
</template>

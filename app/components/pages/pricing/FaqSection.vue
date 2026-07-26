<script setup lang="ts">
import { motion } from 'motion-v'

const { t } = useI18n()

const faqs = computed(() => [
  { q: t('pricing.faq.q1.q'), a: t('pricing.faq.q1.a') },
  { q: t('pricing.faq.q2.q'), a: t('pricing.faq.q2.a') },
  { q: t('pricing.faq.q3.q'), a: t('pricing.faq.q3.a') },
  { q: t('pricing.faq.q4.q'), a: t('pricing.faq.q4.a') },
])

const openFaqIndex = ref<number | null>(null)
function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}
</script>

<template>
  <section class="border-t border-ink-100 dark:border-ink-800">
    <div class="mx-auto max-w-content px-6 py-20 sm:px-10">
      <motion.h2
        class="font-display text-2xl text-ink-900 sm:text-3xl dark:text-white"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
      >
        {{ t('pricing.faqHeading') }}
      </motion.h2>

      <motion.div
        class="mt-8 divide-y divide-ink-100 border-y border-ink-100 dark:divide-ink-800 dark:border-ink-800"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
      >
        <div v-for="(item, index) in faqs" :key="item.q">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 py-5 text-start"
            :aria-expanded="openFaqIndex === index"
            :aria-controls="`faq-panel-${index}`"
            @click="toggleFaq(index)"
          >
            <span class="font-display text-lg text-ink-900 dark:text-white">{{ item.q }}</span>
            <svg
              viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 text-ink-400 transition-transform duration-300 dark:text-ink-500"
              :class="openFaqIndex === index ? 'rotate-45' : ''"
              fill="none"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
            </svg>
          </button>
          <div
            :id="`faq-panel-${index}`"
            class="grid transition-[grid-template-rows] duration-300 ease-out"
            :class="openFaqIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="overflow-hidden">
              <p class="pb-5 text-ink-600 dark:text-ink-300">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>

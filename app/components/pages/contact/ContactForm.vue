<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')

async function onSubmit() {
  submitting.value = true
  submitError.value = ''
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form },
    })
    submitted.value = true
  } catch {
    submitError.value = t('contact.submitError')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <motion.div
    class="overflow-hidden rounded-3xl border border-ink-100 bg-white/70 p-6 shadow-card backdrop-blur-xl sm:p-10 dark:border-ink-800 dark:bg-ink-900/70"
    :initial="{ opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }"
  >
    <AnimatePresence mode="wait">
      <motion.div
        v-if="submitted"
        key="success"
        role="status"
        class="flex flex-col items-center gap-4 py-12 text-center"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
      >
        <motion.span
          class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow"
          :initial="{ scale: 0 }"
          :animate="{ scale: 1 }"
          :transition="{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            delay: 0.1,
          }"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </motion.span>
        <h2 class="font-display text-2xl text-ink-900 dark:text-white">{{ t('contact.successTitle') }}</h2>
        <p class="max-w-sm text-ink-600 dark:text-ink-300">
          {{ t('contact.successBody') }}
        </p>
      </motion.div>

      <motion.form
        v-else
        key="form"
        class="space-y-6"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        @submit.prevent="onSubmit"
      >
        <div>
          <label for="name" class="block text-sm font-medium text-ink-800 dark:text-ink-200"
            >{{ t('contact.form.name') }}</label
          >
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            autocomplete="name"
            class="mt-2 block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-ink-700 dark:bg-ink-950 dark:text-white dark:placeholder:text-ink-600"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-ink-800 dark:text-ink-200"
            >{{ t('contact.form.email') }}</label
          >
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            class="mt-2 block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-ink-700 dark:bg-ink-950 dark:text-white dark:placeholder:text-ink-600"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-ink-800 dark:text-ink-200"
            >{{ t('contact.form.message') }}</label
          >
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="5"
            class="mt-2 block w-full resize-none rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-ink-700 dark:bg-ink-950 dark:text-white dark:placeholder:text-ink-600"
          />
          <p class="mt-2 text-sm text-ink-400 dark:text-ink-500">
            {{ t('contact.form.messageHelper') }}
          </p>
        </div>

        <p v-if="submitError" role="alert" class="text-sm text-red-600 dark:text-red-400">
          {{ submitError }}
        </p>

        <motion.button
          type="submit"
          :disabled="submitting"
          class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-ink-900"
          :whileHover="submitting ? {} : { scale: 1.05, y: -2 }"
          :whilePress="submitting ? {} : { scale: 0.96 }"
          :transition="{ type: 'spring', stiffness: 350, damping: 22 }"
        >
          <svg
            v-if="submitting"
            class="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity="0.25" />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          {{ submitting ? t('contact.form.sending') : t('contact.form.send') }}
        </motion.button>
      </motion.form>
    </AnimatePresence>
  </motion.div>
</template>

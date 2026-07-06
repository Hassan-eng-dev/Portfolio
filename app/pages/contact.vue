<script setup lang="ts">
import { motion } from "motion-v";

useSeoMeta({
  title: "Contact",
  description: "Get in touch with Hassan Adel about a project.",
});

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const submitted = ref(false);
const submitting = ref(false);

const details = [
  {
    label: "Email",
    value: "hassan.adel3886@gmail.com",
    href: "mailto:hassan.adel3886@gmail.com",
  },
  { label: "Based in", value: "Cairo, Egypt · Remote worldwide" },
  { label: "Availability", value: "Booking projects from next month" },
];

function onSubmit() {
  // Placeholder only — no backend wiring yet. Swap for a real submit
  // handler (API route / email service) when one is available.
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    submitted.value = true;
  }, 600);
}
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="aurora-field opacity-60">
      <div
        class="aurora-blob left-[-15%] top-[-10%] h-[26rem] w-[26rem] animate-aurora bg-brand-400"
      />
    </div>

    <div
      class="relative mx-auto grid max-w-content gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
    >
      <motion.div
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
      >
        <p class="text-sm font-medium uppercase tracking-widest text-brand-600">
          Contact
        </p>
        <h1
          class="mt-3 font-display text-4xl leading-tight text-ink-900 sm:text-5xl"
        >
          Let's build something bold together.
        </h1>
        <p class="mt-5 max-w-md text-lg text-ink-600">
          Tell me a little about your project and timeline — I typically reply
          within one business day.
        </p>

        <dl class="mt-10 space-y-6">
          <div
            v-for="detail in details"
            :key="detail.label"
            class="border-t border-ink-100 pt-4 first:border-t-0 first:pt-0"
          >
            <dt class="text-sm text-ink-500">{{ detail.label }}</dt>
            <dd class="mt-1">
              <a
                v-if="detail.href"
                :href="detail.href"
                class="font-display text-lg text-ink-900 transition-colors hover:text-brand-700"
                >{{ detail.value }}</a
              >
              <span v-else class="font-display text-lg text-ink-900">{{
                detail.value
              }}</span>
            </dd>
          </div>
        </dl>
      </motion.div>

      <motion.div
        class="overflow-hidden rounded-3xl border border-ink-100 bg-surface/70 p-6 shadow-card backdrop-blur-xl sm:p-10"
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
              <svg
                viewBox="0 0 24 24"
                class="h-6 w-6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </motion.span>
            <h2 class="font-display text-2xl text-ink-900">Message sent</h2>
            <p class="max-w-sm text-ink-600">
              Thanks for reaching out — this is a placeholder confirmation;
              message sending isn't wired up yet.
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
              <label for="name" class="block text-sm font-medium text-ink-800"
                >Name</label
              >
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                autocomplete="name"
                class="mt-2 block w-full rounded-xl border border-ink-200 bg-surface px-4 py-3 text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-ink-800"
                >Email</label
              >
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                class="mt-2 block w-full rounded-xl border border-ink-200 bg-surface px-4 py-3 text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-ink-800"
                >Message</label
              >
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                class="mt-2 block w-full resize-none rounded-xl border border-ink-200 bg-surface px-4 py-3 text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
              <p class="mt-2 text-sm text-ink-400">
                A few sentences about your project and timeline.
              </p>
            </div>

            <motion.button
              type="submit"
              :disabled="submitting"
              class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  stroke-width="2"
                  opacity="0.25"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              {{ submitting ? "Sending…" : "Send message" }}
            </motion.button>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  </div>
</template>

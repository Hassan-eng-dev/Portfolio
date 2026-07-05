<script setup lang="ts">
useSeoMeta({
  title: 'Contact',
  description: 'Get in touch about a project.',
})

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)

function onSubmit() {
  // Placeholder only — no backend wiring yet. Swap for a real submit
  // handler (API route / email service) when one is available.
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 600)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 py-16 sm:px-10 sm:py-24">
    <p class="text-sm font-medium uppercase tracking-widest text-primary-600">Contact</p>
    <h1 class="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">Let's work together</h1>
    <p class="mt-5 text-lg text-ink-600">
      Tell me a little about your project and I'll get back to you.
    </p>

    <div
      v-if="submitted"
      role="status"
      class="mt-10 rounded-lg border border-primary-200 bg-primary-50 p-6 text-primary-900"
    >
      Thanks for reaching out — this is a placeholder confirmation; message sending isn't
      wired up yet.
    </div>

    <form v-else class="mt-10 space-y-6" @submit.prevent="onSubmit">
      <div>
        <label for="name" class="block text-sm font-medium text-ink-800">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          autocomplete="name"
          class="mt-2 block w-full rounded-lg border border-ink-200 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-ink-800">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          class="mt-2 block w-full rounded-lg border border-ink-200 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-ink-800">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="5"
          class="mt-2 block w-full resize-none rounded-lg border border-ink-200 px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        />
        <p class="mt-2 text-sm text-ink-400">A few sentences about your project and timeline.</p>
      </div>

      <button
        type="submit"
        :disabled="submitting"
        class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          v-if="submitting"
          class="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity="0.25" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        {{ submitting ? 'Sending…' : 'Send message' }}
      </button>
    </form>
  </div>
</template>

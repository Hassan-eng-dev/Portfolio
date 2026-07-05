<script setup lang="ts">
useSeoMeta({
  title: 'About',
  description: 'A little about the studio and how it works.',
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
    <p class="text-sm font-medium uppercase tracking-widest text-primary-600">About</p>
    <h1 class="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">Hi, I'm the designer.</h1>

    <div class="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
      <p>
        Placeholder bio — replace with a short introduction covering background, design
        philosophy, and the kind of work you take on: branding, illustration, print,
        digital and packaging.
      </p>
      <p>
        Mention notable clients, years of experience, and what makes your process
        distinct. Keep it personable and specific rather than generic.
      </p>
    </div>

    <NuxtLink
      to="/contact"
      class="mt-10 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
    >
      Get in touch
    </NuxtLink>
  </div>
</template>

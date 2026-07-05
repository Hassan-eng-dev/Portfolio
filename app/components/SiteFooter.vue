<script setup lang="ts">
const year = new Date().getFullYear()

const socials = [
  { label: 'Email', href: 'mailto:hello@hassanadel.com' },
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
]
</script>

<template>
  <footer class="relative overflow-hidden border-t border-ink-100 bg-ink-950 text-white">
    <div class="aurora-field opacity-60">
      <div
        class="aurora-blob left-[-10%] top-[-30%] h-[26rem] w-[26rem] animate-aurora bg-brand-600"
      />
      <div
        class="aurora-blob bottom-[-30%] right-[-5%] h-[22rem] w-[22rem] animate-aurora bg-brand-400"
        style="animation-delay: -6s"
      />
    </div>

    <div class="relative mx-auto max-w-content px-6 py-20 sm:px-10">
      <div class="flex flex-col gap-6 border-b border-white/10 pb-16 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-medium uppercase tracking-widest text-brand-300">Let's talk</p>
          <h2 class="mt-3 max-w-lg font-display text-3xl leading-tight sm:text-5xl">
            Got an idea worth designing?
          </h2>
        </div>
        <NuxtLink
          to="/contact"
          class="magnetic inline-flex w-fit items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-glow transition-colors hover:bg-brand-500"
        >
          Say hello
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <div class="mt-10 flex flex-col gap-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ year }} Hassan Adel. All rights reserved.</p>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            class="transition-colors hover:text-white"
          >{{ social.label }}</a>
          <NuxtLink to="/admin/login" class="transition-colors hover:text-white">Admin</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

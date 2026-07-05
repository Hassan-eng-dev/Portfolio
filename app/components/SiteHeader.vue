<script setup lang="ts">
const isMenuOpen = ref(false)
const route = useRoute()

const links = [
  { label: 'Work', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-ink-100 bg-surface/90 backdrop-blur">
    <div class="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-10">
      <NuxtLink
        to="/"
        class="font-display text-xl font-medium tracking-tight text-ink-900 transition-opacity hover:opacity-70"
      >
        Studio Name
      </NuxtLink>

      <nav class="hidden items-center gap-8 sm:flex" aria-label="Primary">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group relative text-sm font-medium text-ink-700 transition-colors hover:text-ink-900"
          active-class="text-ink-900"
        >
          {{ link.label }}
          <span
            class="absolute -bottom-1 left-0 h-px w-0 bg-primary-600 transition-all duration-200 group-hover:w-full"
          />
        </NuxtLink>
      </nav>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-50 sm:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg v-if="!isMenuOpen" viewBox="0 0 24 24" class="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <Transition name="fade-slide">
      <nav
        v-if="isMenuOpen"
        id="mobile-nav"
        aria-label="Primary mobile"
        class="border-t border-ink-100 px-6 py-4 sm:hidden"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50"
              active-class="text-primary-700 bg-primary-50"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

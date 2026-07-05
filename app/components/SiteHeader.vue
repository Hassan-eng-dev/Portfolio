<script setup lang="ts">
const isMenuOpen = ref(false)
const route = useRoute()

const links = [
  { label: 'Work', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 8)

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b transition-all duration-300"
    :class="isScrolled
      ? 'border-ink-100 bg-surface/80 shadow-[0_1px_0_rgba(37,99,235,0.08)] backdrop-blur-lg'
      : 'border-transparent bg-transparent backdrop-blur-0'"
  >
    <div class="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-10">
      <NuxtLink
        to="/"
        class="group flex items-center gap-2 font-display text-xl font-medium tracking-tight text-ink-900"
      >
        <span
          class="inline-flex h-2.5 w-2.5 rounded-full bg-brand-600 shadow-[0_0_0_4px_rgba(37,99,235,0.15)] transition-transform duration-300 group-hover:scale-125"
          aria-hidden="true"
        />
        Hassan Adel
      </NuxtLink>

      <nav class="hidden items-center gap-1 rounded-full border border-ink-100/80 bg-surface/60 p-1 backdrop-blur sm:flex" aria-label="Primary">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
          :class="route.path.startsWith(link.to) ? 'text-white' : 'text-ink-700 hover:text-ink-900'"
        >
          <span
            v-if="route.path.startsWith(link.to)"
            class="absolute inset-0 -z-10 rounded-full bg-brand-600 shadow-glow"
            aria-hidden="true"
          />
          {{ link.label }}
        </NuxtLink>
      </nav>

      <NuxtLink
        to="/contact"
        class="magnetic hidden items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-700 sm:inline-flex"
      >
        Start a project
      </NuxtLink>

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
        class="border-t border-ink-100 bg-surface px-6 py-4 sm:hidden"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50"
              active-class="text-brand-700 bg-brand-50"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="mt-2 block rounded-lg bg-ink-900 px-3 py-3 text-center text-base font-medium text-white"
            >
              Start a project
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

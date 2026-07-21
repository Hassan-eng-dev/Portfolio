<script setup lang="ts">
import { motion } from 'motion-v'

const isMenuOpen = ref(false)
const route = useRoute()
const { t, locales, defaultLocale } = useI18n()

const links = computed(() => [
  { label: t('nav.work'), to: '/portfolio' },
  { label: t('nav.about'), to: '/about' },
  { label: t('nav.contact'), to: '/contact' },
])

// route.path carries a locale prefix for non-default locales (e.g.
// `/ar/portfolio`) — strip it before matching against the plain `to` paths
// above so the active nav pill still highlights correctly.
const unprefixedPath = computed(() =>
  stripLocalePrefix(route.path, locales.value, defaultLocale),
)

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
      <NuxtLinkLocale
        to="/"
        class="group flex items-center gap-2 font-display text-xl font-medium tracking-tight text-ink-900"
      >
        <span
          class="inline-flex h-2.5 w-2.5 rounded-full bg-brand-600 shadow-[0_0_0_4px_rgba(37,99,235,0.15)] transition-transform duration-300 group-hover:scale-125"
          aria-hidden="true"
        />
        {{ t('nav.brand') }}
      </NuxtLinkLocale>

      <nav class="hidden items-center gap-1 rounded-full border border-ink-100/80 bg-surface/60 p-1 backdrop-blur sm:flex" :aria-label="t('nav.primary')">
        <NuxtLinkLocale
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
          :class="unprefixedPath.startsWith(link.to) ? 'text-white' : 'text-ink-700 hover:text-ink-900'"
        >
          <motion.div
            v-if="unprefixedPath.startsWith(link.to)"
            layoutId="nav-pill"
            class="absolute inset-0 -z-10 rounded-full bg-brand-600 shadow-glow"
            :transition="{ type: 'spring', stiffness: 380, damping: 30 }"
          />
          {{ link.label }}
        </NuxtLinkLocale>
      </nav>

      <div class="hidden items-center gap-3 sm:flex">
        <LanguageSwitcher />
        <NuxtLinkLocale v-slot="{ navigate, href }" to="/contact" custom>
          <motion.a
            :href="href"
            class="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white"
            :whileHover="{ scale: 1.05, backgroundColor: '#1d4ed8' }"
            :whilePress="{ scale: 0.96 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
            @click="navigate"
          >
            {{ t('nav.startProject') }}
          </motion.a>
        </NuxtLinkLocale>
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-50 sm:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-nav"
        :aria-label="t('nav.toggleMenu')"
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

    <AnimatePresence>
      <motion.nav
        v-if="isMenuOpen"
        key="mobile-nav"
        id="mobile-nav"
        :aria-label="t('nav.primaryMobile')"
        class="overflow-hidden border-t border-ink-100 bg-surface px-6 sm:hidden"
        :initial="{ opacity: 0, height: 0 }"
        :animate="{ opacity: 1, height: 'auto' }"
        :exit="{ opacity: 0, height: 0 }"
        :transition="{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }"
      >
        <ul class="flex flex-col gap-1 py-4">
          <li v-for="link in links" :key="link.to">
            <NuxtLinkLocale
              :to="link.to"
              class="block rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50"
              active-class="text-brand-700 bg-brand-50"
            >
              {{ link.label }}
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale
              to="/contact"
              class="mt-2 block rounded-lg bg-ink-900 px-3 py-3 text-center text-base font-medium text-white"
            >
              {{ t('nav.startProject') }}
            </NuxtLinkLocale>
          </li>
          <li class="mt-2 flex justify-center">
            <LanguageSwitcher />
          </li>
        </ul>
      </motion.nav>
    </AnimatePresence>
  </header>
</template>

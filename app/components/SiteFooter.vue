<script setup lang="ts">
import { motion } from "motion-v";

const { t } = useI18n();

const year = new Date().getFullYear();

const navLinks = computed(() => [
  { label: t('nav.work'), to: "/portfolio" },
  { label: t('nav.about'), to: "/about" },
  { label: t('nav.contact'), to: "/contact" },
]);

const socials = computed(() => [
  { label: t('footer.social.email'), href: "mailto:Hassan.adel3886@gmail.com" },
  { label: t('footer.social.instagram'), href: "#" },
  { label: t('footer.social.behance'), href: "#" },
  { label: t('footer.social.linkedin'), href: "#" },
]);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <footer
    class="relative overflow-hidden border-t border-ink-100 bg-white text-ink-900 transition-colors duration-500 dark:border-white/10 dark:bg-ink-950 dark:text-white"
  >
    <!-- The footer's one authored moment: a night-sky glow reserved for dark
         mode, where soft blur reads as ambient light rather than a wash on
         a flat white page. -->
    <div class="aurora-field z-0 hidden opacity-80 dark:block">
      <div
        class="aurora-blob left-[-10%] top-[-30%] h-[26rem] w-[26rem] animate-aurora bg-brand-600"
      />
      <div
        class="aurora-blob bottom-[-30%] right-[-5%] h-[22rem] w-[22rem] animate-aurora bg-brand-400"
        style="animation-delay: -6s"
      />
    </div>
    <div class="grain-overlay z-[1]" />

    <div class="relative z-10 mx-auto max-w-content px-6 py-20 sm:px-10">
      <motion.div
        class="flex flex-col gap-6 border-b border-ink-100 pb-16 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between"
        :initial="{ opacity: 0, y: 24 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
        :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
      >
        <div>
          <p class="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-300">
            <span class="inline-flex h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-300" aria-hidden="true" />
            {{ t('footer.eyebrow') }}
          </p>
          <h2
            class="mt-3 max-w-lg text-balance font-display text-3xl leading-tight sm:text-5xl"
          >
            {{ t('footer.heading') }}
          </h2>
        </div>
        <NuxtLinkLocale v-slot="{ navigate, href }" to="/contact" custom>
          <motion.a
            :href="href"
            class="inline-flex w-fit items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-glow"
            :whileHover="{ scale: 1.06, backgroundColor: '#3b82f6' }"
            :whilePress="{ scale: 0.95 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
            @click="navigate"
          >
            {{ t('footer.sayHello') }}
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </motion.a>
        </NuxtLinkLocale>
      </motion.div>

      <motion.div
        class="grid grid-cols-2 gap-10 pt-16 sm:grid-cols-4"
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
        :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }"
      >
        <div class="col-span-2 sm:col-span-2">
          <NuxtLinkLocale
            to="/"
            class="group inline-flex items-center gap-2 font-display text-lg font-medium tracking-tight text-ink-900 dark:text-white"
          >
            <span
              class="inline-flex h-2.5 w-2.5 rounded-full bg-brand-600 shadow-[0_0_0_4px_rgba(37,99,235,0.15)] transition-transform duration-300 group-hover:scale-125"
              aria-hidden="true"
            />
            {{ t('nav.brand') }}
          </NuxtLinkLocale>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-ink-500 dark:text-white/50">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <div>
          <p class="text-xs font-medium uppercase tracking-widest text-ink-400 dark:text-white/40">
            {{ t('footer.sitemap') }}
          </p>
          <ul class="mt-4 space-y-3 text-sm text-ink-600 dark:text-white/60">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLinkLocale :to="link.to" class="group/link relative inline-flex w-fit items-center transition-colors hover:text-ink-900 dark:hover:text-white">
                {{ link.label }}
                <span class="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/admin/login" class="group/link relative inline-flex w-fit items-center transition-colors hover:text-ink-900 dark:hover:text-white">
                {{ t('footer.admin') }}
                <span class="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-xs font-medium uppercase tracking-widest text-ink-400 dark:text-white/40">
            {{ t('footer.connect') }}
          </p>
          <ul class="mt-4 space-y-3 text-sm text-ink-600 dark:text-white/60">
            <li v-for="social in socials" :key="social.label">
              <a :href="social.href" class="group/link relative inline-flex w-fit items-center transition-colors hover:text-ink-900 dark:hover:text-white">
                {{ social.label }}
                <span class="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      <div
        class="mt-14 flex flex-col-reverse items-center gap-4 border-t border-ink-100 pt-6 text-sm text-ink-400 dark:border-white/10 dark:text-white/40 sm:flex-row sm:justify-between"
      >
        <p>{{ t('footer.copyright', { year }) }}</p>
        <button
          type="button"
          class="group inline-flex items-center gap-1.5 transition-colors hover:text-ink-900 dark:hover:text-white"
          @click="scrollToTop"
        >
          {{ t('footer.backToTop') }}
          <svg
            viewBox="0 0 24 24"
            class="h-3.5 w-3.5 -translate-y-px transition-transform duration-200 group-hover:-translate-y-1"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 19V5M5 12l7-7 7 7"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </footer>
</template>

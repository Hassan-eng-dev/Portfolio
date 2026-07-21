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
    class="relative overflow-hidden border-t border-ink-100 bg-ink-950 text-white"
  >
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
      <motion.div
        class="flex flex-col gap-6 border-b border-white/10 pb-16 sm:flex-row sm:items-end sm:justify-between"
        :initial="{ opacity: 0, y: 24 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-80px' }"
        :transition="{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }"
      >
        <div>
          <p
            class="text-sm font-medium uppercase tracking-widest text-brand-300"
          >
            {{ t('footer.eyebrow') }}
          </p>
          <h2
            class="mt-3 max-w-lg font-display text-3xl leading-tight sm:text-5xl"
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

      <div class="grid grid-cols-2 gap-10 pt-16 sm:grid-cols-4">
        <div class="col-span-2 sm:col-span-2">
          <NuxtLinkLocale
            to="/"
            class="group inline-flex items-center gap-2 font-display text-lg font-medium tracking-tight text-white"
          >
            <span
              class="inline-flex h-2.5 w-2.5 rounded-full bg-brand-400 shadow-[0_0_0_4px_rgba(96,165,250,0.15)] transition-transform duration-300 group-hover:scale-125"
              aria-hidden="true"
            />
            {{ t('nav.brand') }}
          </NuxtLinkLocale>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <div>
          <p class="text-xs font-medium uppercase tracking-widest text-white/40">
            {{ t('footer.sitemap') }}
          </p>
          <ul class="mt-4 space-y-3 text-sm text-white/60">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLinkLocale :to="link.to" class="transition-colors hover:text-white">
                {{ link.label }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/admin/login" class="transition-colors hover:text-white">
                {{ t('footer.admin') }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-xs font-medium uppercase tracking-widest text-white/40">
            {{ t('footer.connect') }}
          </p>
          <ul class="mt-4 space-y-3 text-sm text-white/60">
            <li v-for="social in socials" :key="social.label">
              <a :href="social.href" class="transition-colors hover:text-white">
                {{ social.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-14 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:justify-between"
      >
        <p>{{ t('footer.copyright', { year }) }}</p>
        <button
          type="button"
          class="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
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

<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)
onClickOutside(root, () => (isOpen.value = false))

const availableLocales = computed(() =>
  locales.value.filter((l): l is { code: string; name: string } => typeof l === 'object'),
)

const currentLocale = computed(() =>
  availableLocales.value.find((l) => l.code === locale.value),
)

function close() {
  isOpen.value = false
}
</script>

<template>
  <div class="relative" @keydown.escape="close">
    <button
      type="button"
      class="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink-200 px-3 text-xs font-medium text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
      :aria-expanded="isOpen"
      :aria-label="t('languageSwitcher.label')"
      @click="isOpen = !isOpen"
    >
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
        <path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z" stroke="currentColor" stroke-width="1.5" />
      </svg>
      {{ currentLocale?.code.toUpperCase() }}
    </button>

    <div
      v-if="isOpen"
      class="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-ink-100 bg-surface py-1 shadow-card"
      @click="close"
    >
      <NuxtLink
        v-for="loc in availableLocales"
        :key="loc.code"
        :to="switchLocalePath(loc.code)"
        class="block px-4 py-2 text-sm transition-colors hover:bg-ink-50"
        :class="loc.code === locale ? 'font-medium text-brand-700' : 'text-ink-700'"
      >
        {{ loc.name }}
      </NuxtLink>
    </div>
  </div>
</template>

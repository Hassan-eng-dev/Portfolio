<script setup lang="ts">
import { motion } from 'motion-v'
import type { ProjectImage } from '~~/shared/types/database.types'

const props = defineProps<{
  images: ProjectImage[]
}>()

const { t } = useI18n()

const activeIndex = ref<number | null>(null)
const isOpen = computed(() => activeIndex.value !== null)

function open(index: number) {
  activeIndex.value = index
}

function close() {
  activeIndex.value = null
}

function next() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}

function prev() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft') prev()
}

if (import.meta.client) {
  useEventListener(window, 'keydown', onKeydown)
}

watch(isOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const activeImage = computed(() =>
  activeIndex.value !== null ? props.images[activeIndex.value] : null,
)
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <motion.button
        v-for="(image, index) in images"
        :key="image.id"
        type="button"
        class="group relative overflow-hidden rounded-2xl bg-ink-50 dark:bg-ink-900"
        :aria-label="t('gallery.openImage', { index: index + 1, total: images.length })"
        :whileHover="{ scale: 1.02 }"
        :whilePress="{ scale: 0.98 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 22 }"
        @click="open(index)"
      >
        <img
          :src="image.image_url"
          :alt="image.alt_text ?? ''"
          loading="lazy"
          class="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        >
      </motion.button>
    </div>

    <Teleport to="body">
      <AnimatePresence>
        <motion.div
          v-if="isOpen && activeImage"
          key="lightbox"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          :aria-label="t('gallery.imageViewer')"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.25 }"
          @click.self="close"
        >
          <button
            type="button"
            class="absolute end-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:end-8 sm:top-8"
            :aria-label="t('gallery.close')"
            @click="close"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
            </svg>
          </button>

          <button
            v-if="images.length > 1"
            type="button"
            class="absolute start-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:start-6"
            :aria-label="t('gallery.previous')"
            @click.stop="prev"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6 rtl:scale-x-[-1]" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.img
              :key="activeIndex"
              :src="activeImage.image_url"
              :alt="activeImage.alt_text ?? ''"
              class="max-h-full max-w-full rounded-lg object-contain"
              :initial="{ opacity: 0, scale: 0.96 }"
              :animate="{ opacity: 1, scale: 1 }"
              :exit="{ opacity: 0, scale: 0.96 }"
              :transition="{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }"
            />
          </AnimatePresence>

          <button
            v-if="images.length > 1"
            type="button"
            class="absolute end-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:end-6"
            :aria-label="t('gallery.next')"
            @click.stop="next"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6 rtl:scale-x-[-1]" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>
    </Teleport>
  </div>
</template>

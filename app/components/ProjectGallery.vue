<script setup lang="ts">
import type { ProjectImage } from '~~/shared/types/database.types'

const props = defineProps<{
  images: ProjectImage[]
}>()

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
      <button
        v-for="(image, index) in images"
        :key="image.id"
        type="button"
        class="group relative overflow-hidden rounded-lg bg-ink-50"
        :aria-label="`Open image ${index + 1} of ${images.length}`"
        @click="open(index)"
      >
        <img
          :src="image.image_url"
          :alt="image.alt_text ?? ''"
          loading="lazy"
          class="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        >
      </button>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isOpen && activeImage"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          @click.self="close"
        >
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Close image viewer"
            @click="close"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
            </svg>
          </button>

          <button
            v-if="images.length > 1"
            type="button"
            class="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Previous image"
            @click.stop="prev"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <img
            :src="activeImage.image_url"
            :alt="activeImage.alt_text ?? ''"
            class="max-h-full max-w-full rounded-lg object-contain"
          >

          <button
            v-if="images.length > 1"
            type="button"
            class="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Next image"
            @click.stop="next"
          >
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

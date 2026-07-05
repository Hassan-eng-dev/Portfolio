<script setup lang="ts">
const isSidebarOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    isSidebarOpen.value = false
  },
)
</script>

<template>
  <div class="flex min-h-dvh bg-ink-50/40">
    <div class="hidden sm:block">
      <AdminSidebar />
    </div>

    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 z-40 bg-black/40 sm:hidden"
        @click="isSidebarOpen = false"
      />
    </Transition>
    <Transition name="slide">
      <div v-if="isSidebarOpen" class="fixed inset-y-0 left-0 z-50 w-72 sm:hidden">
        <AdminSidebar />
      </div>
    </Transition>

    <div class="flex min-h-dvh flex-1 flex-col">
      <header class="flex items-center gap-4 border-b border-ink-100 bg-surface px-4 py-3 sm:hidden">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-900 hover:bg-ink-50"
          aria-label="Open admin menu"
          :aria-expanded="isSidebarOpen"
          @click="isSidebarOpen = true"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
          </svg>
        </button>
        <span class="font-display text-base text-ink-900">Studio Admin</span>
      </header>

      <main class="admin-scroll flex-1 overflow-y-auto px-4 py-8 sm:px-10 sm:py-12">
        <div class="mx-auto max-w-5xl">
          <slot />
        </div>
      </main>
    </div>
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

.slide-enter-active,
.slide-leave-active {
  transition: transform var(--duration-base) var(--ease-out);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>

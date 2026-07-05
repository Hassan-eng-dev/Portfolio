<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-ink-100">
    <div
      class="mx-auto flex max-w-content flex-col gap-4 px-6 py-10 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between sm:px-10"
    >
      <p>&copy; {{ year }} Studio Name. All rights reserved.</p>
      <div class="flex items-center gap-6">
        <a
          href="mailto:hello@example.com"
          class="transition-colors hover:text-ink-900"
        >hello@example.com</a>
        <NuxtLink to="/admin/login" class="transition-colors hover:text-ink-900">Admin</NuxtLink>
      </div>
    </div>
  </footer>
</template>

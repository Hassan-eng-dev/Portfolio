<script setup lang="ts">
const client = useSupabaseClient()
const router = useRouter()
const user = useSupabaseUser()

const links = [
  { label: 'Dashboard', to: '/admin', icon: 'grid' },
  { label: 'New project', to: '/admin/projects/new', icon: 'plus' },
]

const signingOut = ref(false)

async function signOut() {
  signingOut.value = true
  await client.auth.signOut()
  await router.push('/admin/login')
  signingOut.value = false
}
</script>

<template>
  <aside class="flex h-full w-full flex-col border-r border-ink-100 bg-surface sm:w-64">
    <div class="px-6 py-6">
      <NuxtLink to="/admin" class="font-display text-lg text-ink-900">Studio Admin</NuxtLink>
      <p v-if="user?.email" class="mt-1 truncate text-xs text-ink-400">{{ user.email }}</p>
    </div>

    <nav class="flex-1 space-y-1 px-3" aria-label="Admin">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
        active-class="bg-primary-50 text-primary-700"
      >
        <svg v-if="link.icon === 'grid'" viewBox="0 0 24 24" class="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.75" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.75" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.75" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.75" />
        </svg>
        <svg v-else viewBox="0 0 24 24" class="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        </svg>
        {{ link.label }}
      </NuxtLink>
    </nav>

    <div class="border-t border-ink-100 p-3">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
          <path d="M4 10.5 12 4l8 6.5M6 9v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1V9" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round" />
        </svg>
        View site
      </NuxtLink>
      <button
        type="button"
        :disabled="signingOut"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink-700 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
        @click="signOut"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
          <path d="M9 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ signingOut ? 'Signing out…' : 'Sign out' }}
      </button>
    </div>
  </aside>
</template>

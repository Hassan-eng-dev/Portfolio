<script setup lang="ts">
definePageMeta({ layout: false })

const client = useSupabaseClient()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  loading.value = true
  errorMessage.value = null

  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin'
  await router.push(redirect)
}

useSeoMeta({ title: 'Admin login' })
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center bg-ink-50 px-6">
    <div class="w-full max-w-sm rounded-xl border border-ink-100 bg-surface p-8 shadow-sm">
      <h1 class="font-display text-2xl text-ink-900">Admin sign in</h1>
      <p class="mt-2 text-sm text-ink-500">Sign in to manage portfolio projects.</p>

      <form class="mt-8 space-y-5" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-ink-800">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="mt-2 block w-full rounded-lg border border-ink-200 px-4 py-3 text-ink-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-ink-800">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="mt-2 block w-full rounded-lg border border-ink-200 px-4 py-3 text-ink-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
        </div>

        <p v-if="errorMessage" role="alert" class="text-sm text-red-600">{{ errorMessage }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-ink-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            v-if="loading"
            class="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>

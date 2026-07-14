<script setup lang="ts">
// Landing spot for Supabase auth callbacks (magic link / OAuth). This app
// only uses email+password sign-in, so this simply forwards to the
// dashboard once @nuxtjs/supabase has exchanged the session client-side.
const router = useRouter()
onMounted(() => {
  router.replace('/admin')
})
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center text-sm text-ink-500">
    Signing you in…
  </div>
</template>

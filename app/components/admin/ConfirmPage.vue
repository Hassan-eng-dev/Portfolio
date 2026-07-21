<script setup lang="ts">
// Landing spot for Supabase auth callbacks (magic link / OAuth). This app
// only uses email+password sign-in, so this simply forwards to the
// dashboard once @nuxtjs/supabase has exchanged the session client-side.
const router = useRouter()
const localePath = useLocalePath()
const { t } = useI18n()
onMounted(() => {
  router.replace(localePath('/admin'))
})
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center text-sm text-ink-500">
    {{ t('admin.confirm.signingIn') }}
  </div>
</template>

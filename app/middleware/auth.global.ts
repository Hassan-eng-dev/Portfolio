export default defineNuxtRouteMiddleware((to) => {
  // With i18n's `prefix_except_default` strategy, non-default-locale routes
  // carry a locale prefix (e.g. `/ar/admin`), so strip it before matching on
  // path. useI18n()/useLocalePath() require an active component instance,
  // which global middleware doesn't have — use the nuxtApp-exposed equivalents.
  const { $i18n, $localePath } = useNuxtApp()
  const path = stripLocalePrefix(to.path, $i18n.locales.value, $i18n.defaultLocale)

  if (!path.startsWith('/admin')) return
  if (path === '/admin/login' || path === '/admin/confirm') return

  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo({ path: $localePath('/admin/login'), query: { redirect: to.fullPath } })
  }
})

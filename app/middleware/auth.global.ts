export default defineNuxtRouteMiddleware((to) => {
  // With i18n's `prefix_except_default` strategy, non-English routes carry a
  // locale prefix (e.g. `/ar/admin`), so strip it before matching on path.
  // useI18n()/useLocalePath() require an active component instance, which
  // global middleware doesn't have — use the nuxtApp-exposed equivalents.
  const { $i18n, $localePath } = useNuxtApp()
  const localeCodes = $i18n.locales.value
    .map((l) => (typeof l === 'object' ? l.code : l))
    .filter((code) => code !== 'en')
  const prefixPattern = new RegExp(`^/(${localeCodes.join('|')})(?=/|$)`)
  const path = to.path.replace(prefixPattern, '') || '/'

  if (!path.startsWith('/admin')) return
  if (path === '/admin/login' || path === '/admin/confirm') return

  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo({ path: $localePath('/admin/login'), query: { redirect: to.fullPath } })
  }
})

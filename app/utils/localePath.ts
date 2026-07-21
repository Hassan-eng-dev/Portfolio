/**
 * Strips a non-default locale prefix (e.g. `/ar/admin` -> `/admin`) so route
 * paths can be matched independent of the active locale. Shared by
 * `middleware/auth.global.ts` (no component instance, can't use `useI18n()`)
 * and `SiteHeader.vue` (active-nav-pill matching).
 */
export function stripLocalePrefix(
  path: string,
  locales: readonly (string | { code: string })[],
  defaultLocale: string,
) {
  const codes = locales
    .map((locale) => (typeof locale === 'object' ? locale.code : locale))
    .filter((code) => code !== defaultLocale)

  if (codes.length === 0) return path

  const prefixPattern = new RegExp(`^/(${codes.join('|')})(?=/|$)`)
  return path.replace(prefixPattern, '') || '/'
}

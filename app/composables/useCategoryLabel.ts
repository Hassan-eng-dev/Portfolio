import { PROJECT_CATEGORIES } from '~~/shared/types/database.types'

/**
 * Translates a project category slug for display. Falls back to the raw
 * slug for any value outside the known set (e.g. legacy/malformed DB rows,
 * or an unsanitized `?category=` query param) instead of rendering a
 * missing-translation-key string like `categories.vintage`.
 */
export function useCategoryLabel() {
  const { t } = useI18n()

  return (category: string) =>
    (PROJECT_CATEGORIES as readonly string[]).includes(category)
      ? t(`categories.${category}`)
      : category
}

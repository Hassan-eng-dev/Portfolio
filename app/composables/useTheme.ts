export type ThemePreference = 'light' | 'dark' | 'system'
export type AppliedTheme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'

function resolveSystemTheme(): AppliedTheme {
  if (!import.meta.client) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStoredPreference(): ThemePreference {
  if (!import.meta.client) return 'system'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : 'system'
}

export function useTheme() {
  const preference = useState<ThemePreference>('theme-preference', () => 'system')
  const applied = useState<AppliedTheme>('theme-applied', () => 'light')

  function apply(pref: ThemePreference) {
    const resolved = pref === 'system' ? resolveSystemTheme() : pref
    applied.value = resolved
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', resolved)
    }
  }

  function setPreference(pref: ThemePreference) {
    preference.value = pref
    if (import.meta.client) {
      if (pref === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, pref)
    }
    apply(pref)
  }

  function toggle() {
    setPreference(applied.value === 'dark' ? 'light' : 'dark')
  }

  function init() {
    if (!import.meta.client) return
    preference.value = readStoredPreference()
    apply(preference.value)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (preference.value === 'system') apply('system')
    })
  }

  return { preference, applied, setPreference, toggle, init }
}

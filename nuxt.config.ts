// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    // Server-only — set RESEND_API_KEY / CONTACT_TO_EMAIL in .env, never committed.
    resendApiKey: '',
    contactToEmail: '',
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@tresjs/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', iso: 'ar-SA', name: 'العربية', dir: 'rtl', file: 'ar.json' },
      { code: 'ru', iso: 'ru-RU', name: 'Русский', dir: 'ltr', file: 'ru.json' },
      { code: 'es', iso: 'es-ES', name: 'Español', dir: 'ltr', file: 'es.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', dir: 'ltr', file: 'fr.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    lazy: true,
    detectBrowserLanguage: {
      useCookieOnly: false,
      redirectOn: 'root',
      cookieKey: 'i18n_redirected',
    },
  },

  css: ['~/assets/scss/main.scss'],

  typescript: {
    strict: true,
    typeCheck: false,
  },

  vite: {
    optimizeDeps: {
      include: ['@tresjs/core', 'three', '@vue/devtools-core', '@vue/devtools-kit'],
    },
  },

  supabase: {
    // We protect /admin/* ourselves via app/middleware/auth.global.ts,
    // so disable the module's built-in route redirect behaviour.
    redirectOptions: {
      login: '/admin/login',
      callback: '/admin/confirm',
      include: undefined,
      exclude: ['/**'],
    },
    types: '~~/shared/types/database.types.ts',
  },

  app: {
    head: {
      titleTemplate: '%s · Hassan Adel',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      script: [
        {
          // Applies the saved/system theme before first paint so there's no
          // flash of the wrong theme while the app boots and hydrates.
          children:
            "try{var t=localStorage.getItem('theme');var d=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',d);}catch(e){}",
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})

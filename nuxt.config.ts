// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/scss/main.scss'],

  typescript: {
    strict: true,
    typeCheck: false,
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
      titleTemplate: '%s · Studio Portfolio',
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap',
        },
      ],
    },
  },
})

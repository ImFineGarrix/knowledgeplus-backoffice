import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/font.css',
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      titleTemplate: 'Knowledge Back-office',
    },
    baseURL: '/sj2/backoffice',
  },
  plugins: [{ src: '~/plugins/sweetalert2', mode: 'client' }],
  pages: true,
  build: {
    transpile: ['vuetify', 'primevue'],
  },
  modules: [
    '@pinia/nuxt',
    'dayjs-nuxt',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      )
    },
  ],
  vite: {
    optimizeDeps: { exclude: ['fsevents'] },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      firebaseBaseUrl: process.env.FIREBASE_BASE_URL,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    },
  },
})

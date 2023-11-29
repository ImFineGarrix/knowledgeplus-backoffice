import dayjs from 'dayjs'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/font.css',
    '@mdi/font/css/materialdesignicons.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [{ src: '~/plugins/sweetalert2', mode: 'client' }],
  pages: true,
  build: {
    transpile: ['vuetify', 'primevue'],
  },
  modules: [
    'dayjs-nuxt',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      )
    },
  ],
  dayjs: {
    locales: ['th', 'en'],
    plugins: ['advancedFormat', 'utc', 'timezone', 'localizedFormat'],
  },
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
    },
  },
})

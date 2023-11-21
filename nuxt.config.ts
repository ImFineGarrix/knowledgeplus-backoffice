import dayjs from 'dayjs'

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
  modules: ['dayjs-nuxt'],
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
    },
  },
})

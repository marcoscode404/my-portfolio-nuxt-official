// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  modules: ["nuxt-icon", "@pinia/nuxt", "@nuxt/ui"],
  content: {
    documentDriven: true,
  },

  srcDir: "src/",
  ssr: false,
  plugins: [
    '~/plugins/vue-the-mask.client.js',
  ],

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      appsURL: process.env.APPS_URL
    },
  },

  css: ['floating-vue/dist/style.css', '~/assets/css/componentStyles/style.css', '~/assets/css/componentStyles/global.css'],

  colorMode: {
    preference: 'dark'
  },

  // config pwa
  app: {
    head: {
      title: 'Andromeda',
      link: [{ rel: "manifest", href: "/manifest.json" }],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "my website description",
        },
      ],
    },
  },

  pinia: {
    autoImports: ["defineStore"],
  },

  vite: {
    server: {
      hmr: {
        // protocol: 'wss',
        protocol: 'ws',
        host: 'localhost', // ou o IP do seu ambiente
        overlay: false
      },
    },
    assetsInclude: ['**/*.xlsx', '**/*.mp4'],
    vueJsx: {optimize: true},
  },
  extensions: ['.vue', '.md'],

  devtools: {
    enabled: true
  }
})
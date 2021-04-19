export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'virtual-space',
    meta: [
      { charset: 'UTF-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, minimal-ui, viewport-fit=cover',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    script: [
      { src: 'js/aframe-v1.2.0.min.js' },
      { src: 'js/drag-component.js' },
      {
        src:
          'https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/global'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: ['~/server-middleware/thumbnail.js'],

  vue: {
    config: {
      ignoredElements: [/^a-/],
    },
  },
};

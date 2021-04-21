import { resolve } from 'path';

export default {
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

  alias: {
    scss: resolve(__dirname, './assets/scss'),
  },

  ssr: false,

  css: ['~/assets/scss/global.scss', '~/assets/scss/_mixins.scss'],

  styleResources: {
    scss: ['~/assets/scss/*.scss'],
  },

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/dotenv'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  axios: {},

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  build: {},

  serverMiddleware: ['~/server-middleware/thumbnail.js'],

  server: {
    host: '0',
  },

  vue: {
    config: {
      ignoredElements: [/^a-/],
    },
  },
};

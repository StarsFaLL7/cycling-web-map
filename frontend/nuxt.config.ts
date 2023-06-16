// https://nuxt.com/docs/api/configuration/nuxt-config
const { MAPBOX_ACCESS_TOKEN, STRAPI_URL } = process.env;

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      MAPBOX_ACCESS_TOKEN,
    },
  },
  pwa: {
    includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    // registerType: "autoUpdate",
    manifest: {
      name: "Карта Велопрогулок",
      short_name: "Карта Велопрогулок",
      description: "Карта Велопрогулок - твой путь в родном городе",
      theme_color: "#ffffff",
      icons: [
        {
          src: "icons/icon-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  app: {
    head: {
      title: 'Карта Велопрогулок',
      link: [
        {
          href: "https://fonts.googleapis.com",
          rel: "preconnect",
        },
        {
          href: "https://fonts.gstatic.com",
          rel: "preconnect",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap",
          rel: "stylesheet",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
          rel: "stylesheet",
        },
        {
          rel: "stylesheet",
          href: "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css",
        },
        {
          rel: "stylesheet",
          href: "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css",
        },
      ],
    },
  },
  css: ["animate.css/animate.min.css", "normalize.css/normalize.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/strapi", "nuxt-lodash", "@vite-pwa/nuxt"],
  strapi: {
    url: STRAPI_URL || "http://localhost:1337",
    prefix: "/api",
    version: "v4",
    expires: "7d",
    cookie: {
      path: "/",
    },
    cookieName: "strapi_jwt",
  },
  ssr: true,
});

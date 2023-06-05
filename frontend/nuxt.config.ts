// https://nuxt.com/docs/api/configuration/nuxt-config
const { MAPBOX_ACCESS_TOKEN } = process.env;

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      MAPBOX_ACCESS_TOKEN,
    },
  },
  app: {
    head: {
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
  modules: ["@pinia/nuxt", "@nuxtjs/strapi", "nuxt-lodash",],
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
    prefix: "/api",
    version: "v4",
    expires: "7d",
    cookie: {
      sameSite: true,
      httpOnly: false,
      path: "/",
    },
    cookieName: "strapi_jwt",
  },
  ssr: true,
});

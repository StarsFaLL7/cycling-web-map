// https://nuxt.com/docs/api/configuration/nuxt-config
const { MAPBOX_ACCESS_TOKEN } = process.env

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            MAPBOX_ACCESS_TOKEN
        }
    },
    app: {
        head: {
            link: [
                {
                    href: 'https://fonts.googleapis.com',
                    rel: 'preconnect'
                },
                {
                    href: 'https://fonts.gstatic.com',
                    rel: 'preconnect'
                },
                {
                    href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap',
                    rel: 'stylesheet'
                },
                {
                    href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0',
                    rel: 'stylesheet'
                }
            ]
        }
    },
    css: [
        'animate.css/animate.min.css',
        'normalize.css/normalize.css'
    ]
})
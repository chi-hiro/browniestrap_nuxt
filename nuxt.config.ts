export default defineNuxtConfig({
  ssr: true,
  css: ['@/styles/app.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    appTitle: 'Browniestrap',
    public: {
      apiBaseUrl: 'https://petstore.swagger.io/v2',
    },
  },
  app: {
    head: {
      title: 'Browniestrap',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: '/img/favicon.webp',
          type: 'image/png',
          sizes: '192x192',
        },
        {
          rel: 'apple-touch-icon',
          href: '/img/favicon.webp',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,200',
        },
      ],
    },
  },
})

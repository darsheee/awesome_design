import getRoutes from './utils/getRoutes'

export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Mike Mattner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'UX/UI Designer & Developer in Michigan',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    // '@/node_modules/highlight.js/styles/nord.css',
    '@/assets/scss/app.scss',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/ComponentRegister.js',
    '~/plugins/lazyimage.js',
    '~/plugins/imageContext.js',
    '~/plugins/VueFontAwesome.js',
    { src: '~/plugins/VueScrollReveal.js', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-svg-loader',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxt/content',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/sitemap',
  ],
  styleResources: {
    scss: [
      '~/assets/scss/utils/_functions.scss',
      '~/assets/scss/utils/_variables.scss',
      '~/assets/scss/utils/_mixins.scss',
    ],
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-nord.css',
      },
    },
    fullTextSearchFields: ['title', 'description', 'text', 'type'],
  },
  svgLoader: {
    svgoConfig: {
      plugins: [
        { prefixIds: false }, // Disables prefixing for SVG IDs
      ],
    },
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: 'https://fonts.gstatic.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
    ],
  },
  /*
   ** Build configuration
   */
  optimizedImages: {
    inlineImageLimit: -1,
    handleImages: ['jpeg', 'png', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 85,
    },
    optipng: false,
    pngquant: {
      speed: 7,
      quality: [0.65, 0.8],
    },
    webp: {
      quality: 85,
    },
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      config.module.rules.push({
        test: /\.yaml$/,
        loader: 'js-yaml-loader',
      })
    },
  },
  sitemap: {
    hostname: 'https://mikemattner.com',
    routes() {
      return getRoutes()
    },
  },
}

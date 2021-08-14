//const colors = require('vuetify/es5/util/colors').default
const path = require('path')
const fs = require('fs')
//const webpack = require('webpack')


module.exports = {

  //version: pkg.version,
  sound: {
      itsok: {
        src: "/itsok.mpeg",
        options: {
          volume: 0.3
        }
      },
      itsgood: {
        src: "/itsgood.mpeg",
        options: {
          volume: 0.3
        }
      },
      itsbad: {
        src: "/itsbad.mpeg",
        options: {
          volume: 0.3
        }
      }

    },

  components: true,
  // server: {
  //     https: {
  //       key: fs.readFileSync(path.resolve(__dirname, 'privkey.pem')),
  //       cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
  //     }
  //   },
  telemetry: false,
  env: {
    // PGUSER: 'postgres',
  },
  //mode: 'universal',
  //mode: 'spa',
  /*
   ** Headers of the page
   */
  router: {
  //   base: '/'
    // middleware: 'stats'
  },
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    titleTemplate: '%s',
    htmlAttrs: {
        lang: 'ru',
      },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
  ],

// '~/api/index.js'
  serverMiddleware: [
    '~/serverMiddleware/check-malformed.js',
    { path: "/api", handler: require("body-parser").json() },
        {
          path: "/api",
          handler: (req, res, next) => {
            const url = require("url");
            req.query = url.parse(req.url, true).query;
            req.params = { ...req.query, ...req.body };
            next();
          }
        },
        { path: "/api", handler: "~/serverMiddleware/api-server.js" }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~/plugins/api-context.client.js'},
    {src: '~/plugins/api-context.server.js'},

    // {src: '~/plugins/virtualscrolllist.js', mode: 'client' }

    // { src: '~/plugins/ymapPlugin.js', mode: 'client' },
    //{src: '~/plugins/xlsx.client.js'},
    //{src: '~/plugins/read-more-js.js', mode: 'client'},
    //{src: '~/plugins/jq.js', mode: 'client'},
    //{src: '~/plugins/jq2.js', mode: 'client'},
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    'nuxt-use-sound',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  robots:[
  ],

  styleResources: {
        scss: [
            '@/assets/style/_const.scss'
        ]
    },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  axios: {
    // proxyHeaders: false
    proxy: true,
     //baseURL: 'http://127.0.0.1:3000/api'
  },

  // auth: {
  //     localStorage: false,
  //     strategies: {
  //       local: {
  //         token: {
  //           property: 'token',
  //           required: true,
  //           type: false,
  //           maxAge: 60 * 60 * 24 * 30
  //          },
  //         endpoints: {
  //           login: { url: '/api/loginUser', method: 'post' },
  //           user: { url: '/api/userAuth', method: 'get' },
  //           logout: false,
  //         },
  //       }
  //     },
  //   },

  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3,
    //     },
    //   },
    // },
  },
  /*
   ** Build configuration
   */
  build: {
    babel:{
        plugins: [
          ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
        ]
      },
    maxChunkSize: 300000,
    // vendor: ['vuetify'],
    /*
     ** You can extend webpack config here
     */
     // vendor: ['jquery'],
     //
     // plugins: [
     //
     //       new webpack.ProvidePlugin({
     //         $: 'jquery',
     //         jQuery: 'jquery',
     //         'window.jQuery': 'jquery'
     //       })
     //     ],

    //transpile: ['jquery'],

    parallel: true,
    cache: true,
    hardSource: true,
    extend(config, ctx) {

      config.module.rules.push({
              test: /\.(ogg|mp3|wav|mpe?g)$/i,
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            })

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }

    },
  },



}

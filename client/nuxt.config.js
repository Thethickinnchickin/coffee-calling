const URL = process.env.$PORT
import express from 'express'

export default {
  srr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    script: [{src: 'https://js.stripe.com/v3'}],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Author: M. Reiley,This is a mock fully functional e-commerce site that sells various coffee products and items' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "/css/font-awesome/css/all.css"},
      { rel: 'stylesheet', href: "/css/default.css"},    
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/auth',


  ],


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    baseURL: URL,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName:'token',
            required: true
          },  
          user:{
            url: '/api/auth/user',
            method: 'get',
            propertyName: 'user'
          },
          logout: true
        }
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },


  proxy: {
    "/api": URL
  },

  /*
  ** Server Middleware
  */
  serverMiddleware: 
  ['~/api/index.js'],

  server: {
    port: 8000,
  },

  router: {
    base: '/'
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}

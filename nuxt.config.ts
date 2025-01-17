// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    // "@nuxtjs/supabase",
    "@nuxtjs/i18n",
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
    "@pinia/nuxt",
  ],

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      ErrorMessage: "VeeErrorMessage",
    },
  },

  i18n: {
    lazy: true,
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        dir: "ltr",
        name: "English",
        language: "en",
      },
      {
        code: "ar",
        iso: "ar-EG",
        file: "ar.json",
        dir: "rtl",
        name: "العربية",
        language: "ar",
      },
    ],
    defaultLocale: "en",
    defaultDirection: "ltr",
    // detectBrowserLanguage: {
    //   alwaysRedirect: true,
    // },
    experimental: {
      localeDetector: "localeDetector.ts",
    },
    baseUrl: "http://localhost:3000",
  },

  runtimeConfig: {
    public: {
      apiUrl: "",
      supabaseUrl: "",
      supabaseKey: "",
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
      },
    },
  },
  shadcn: {
    componentDir: "./app/components/ui",
    prefix: "Ui",
  },

  ssr: false,
  devServer: {
    https: {
      cert: "./server.crt",
      key: "./server.key",
    },
  },
  // supabase: {
  //   redirectOptions: {
  //     login: "/login",
  //     callback: "/confirm",
  //     cookieRedirect: false,
  //     include: ["**/login"],
  //   },
  //   redirect: false,
  //   key: process.env.SUPABASE_KEY,
  //   url: process.env.SUPABASE_URL,
  // },
})

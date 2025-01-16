// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@nuxtjs/i18n",
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
    detectBrowserLanguage: {
      alwaysRedirect: true,
    },
    experimental: {
      localeDetector: "localeDetector.ts",
    },
    baseUrl: "http://localhost:3000",
  },

  runtimeConfig: {
    public: {
      apiUrl: "",
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
})

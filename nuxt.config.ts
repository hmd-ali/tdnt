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
    langDir: "/app/assets/locales",
    lazy: true,
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        dir: "ltr",
        name: "English",
      },
      {
        code: "ar",
        iso: "ar-EG",
        file: "ar.json",
        dir: "rtl",
        name: "العربية",
      },
    ],
    defaultLocale: "en",
    defaultDirection: "ltr",
    detectBrowserLanguage: {
      alwaysRedirect: true,
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: "",
    },
  },
})

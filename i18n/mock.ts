import { createI18n } from "vue-i18n"
import en from "~~/i18n/locales/en.json"
import ar from "~~/i18n/locales/ar.json"

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en,
    ar,
  },
})

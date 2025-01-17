import { mountSuspended } from "@nuxt/test-utils/runtime"
import { describe, expect, it } from "vitest"

import Index from "~/pages/index.vue"
import { createI18n } from "vue-i18n"
import en from "~~/i18n/locales/en.json"
import ar from "~~/i18n/locales/ar.json"

const i18n = createI18n({
  locale: "en",
  messages: {
    en,
    ar,
  },
})

const mount = () =>
  mountSuspended(Index, {
    global: {
      plugins: [i18n],
    },
  })

describe("pages/index.vue", async () => {
  const locales = useNuxtApp().$i18n.locales

  it("renders the component", async () => {
    const wrapper = await mount()
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it.each(locales.value.map((l) => [l.code]))(
    "renders in the correct language for the %s locale",
    async (code) => {
      const wrapper = await mount()
      wrapper.vm.$i18n.locale = code
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    },
  )
})

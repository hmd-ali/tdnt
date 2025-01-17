import { mountSuspended } from "@nuxt/test-utils/runtime"
import { describe, expect, it, vi } from "vitest"
import { createTestingPinia } from "@pinia/testing"

import Default from "~/layouts/default.vue"
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

const stubs = ["AppLocaleSwitch"]

const mount = () =>
  mountSuspended(Default, {
    global: {
      stubs,
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
        i18n,
      ],
    },
  })

describe("layouts/default.vue", async () => {
  const locales = useNuxtApp().$i18n.locales

  it("renders the component", async () => {
    const wrapper = await mount()
    expect(wrapper.exists()).toBe(true)
  })

  describe.each(locales.value.map((l) => [l.code]))(
    "user is logged in the %s locale",
    (code) => {
      it("it renders a logout", async () => {
        const wrapper = await mount()
        const store = useUserStore()
        store.user = {
          name: "John Doe",
          email: "",
          id: "1",
          token: "",
        }
        wrapper.vm.$i18n.locale = code
        await wrapper.vm.$nextTick()
        const logoutString = i18n.global.t("logout")
        expect(wrapper.html()).toContain(logoutString)
        const welcomeString = i18n.global.t("welcome_name", {
          name: store.user.name,
        })
        expect(wrapper.text()).toContain(welcomeString)
        expect(wrapper.html()).toMatchSnapshot()
      })
    },
  )
})

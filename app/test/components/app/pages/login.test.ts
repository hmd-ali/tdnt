import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import { describe, expect, it } from "vitest"

import Login from "~/pages/login.vue"

const mount = () => mountSuspended(Login)

mockNuxtImport("useI18n", () => () => useNuxtApp().$i18n)

describe("pages/login.vue", async () => {
  const locales = useNuxtApp().$i18n.locales

  it("renders the component", async () => {
    const wrapper = await mount()
    expect(wrapper.exists()).toBe(true)
  })

  it("renders the form", async () => {
    const wrapper = await mount()
    expect(wrapper.find("form").exists()).toBe(true)
  })

  it.each(locales.value.map((l) => [l.code]))(
    "renders in the correct language for the %s locale",
    async (code) => {
      const wrapper = await mount()
      await wrapper.vm.$i18n.setLocale(code)
      expect(wrapper.html()).toMatchSnapshot()
    },
  )
})

import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import { RouterLinkStub } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import LocaleSwitch from "~/components/app/LocaleSwitch.vue"

mockNuxtImport("useI18n", () => () => useNuxtApp().$i18n)

mockNuxtImport(
  "useSwitchLocalePath",
  () => () => useNuxtApp().$switchLocalePath,
)

const mount = () =>
  mountSuspended(LocaleSwitch, { stubs: { NuxtLink: RouterLinkStub } })

describe("components/app/LocaleSwitch.vue", async () => {
  const locales = useNuxtApp().$i18n.locales

  it("renders the component", async () => {
    const wrapper = await mount()
    expect(wrapper.exists()).toBe(true)
  })

  it("renders the correct numbers of lang switcher links", async () => {
    const wrapper = await mount()
    const links = wrapper.findAll("a[data-testid^='lang-switch-']")
    expect(links).toHaveLength(locales.value.length)
  })

  it.each(locales.value.map((l) => [l.code, l.code]))(
    "%s link is visually highlighted when the current locale is %s",
    async (code) => {
      const wrapper = await mount()
      wrapper.vm.$i18n.locale = code
      await wrapper.vm.$nextTick()
      const link = wrapper.find(`a[data-testid='lang-switch-${code}']`)
      await link.trigger("click")
      await wrapper.vm.$nextTick()
      expect(link.classes()).toContain("font-medium")
    },
  )

  it.each(locales.value.map((l) => [l.code]))(
    "switches to the correct locale when %s link is clicked",
    async (code) => {
      const wrapper = await mount()
      wrapper.vm.$i18n.locale = code
      await wrapper.vm.$nextTick()
      const link = wrapper.find(`a[data-testid='lang-switch-${code}']`)
      await link.trigger("click")
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$i18n.locale).toBe(code)
    },
  )
})

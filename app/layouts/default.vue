<script setup lang="ts">
import type { LocaleObject } from "@nuxtjs/i18n"

const userStore = useUserStore()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const { locales: _locales, locale } = useI18n()
const locales = computed(() => _locales.value as unknown as LocaleObject[])

const handleLogout = () => {
  userStore.clearUser()
  return navigateTo(localePath("/login"))
}
</script>

<template>
  <div class="container mx-auto w-full pt-20">
    <header class="fixed left-0 top-0 w-full">
      <div
        class="container mx-auto flex h-20 w-full items-center justify-between border-b"
      >
        <div class="flex items-center gap-x-4">
          <template v-if="userStore.user !== undefined">
            <i18n-t
              keypath="welcome_name"
              tag="p"
              scope="global"
              class="text-muted-foreground"
            >
              <template #name>
                <span class="font-medium text-primary">{{
                  userStore.user.name
                }}</span>
              </template>
            </i18n-t>
            <button class="text-destructive" @click="handleLogout">
              {{ $t("logout") }}
            </button>
          </template>
        </div>
        <nav class="flex items-center gap-x-4">
          <NuxtLink
            v-for="lang in locales"
            :key="lang.code"
            :to="switchLocalePath(lang.code)"
            class="text-sm"
            :class="{
              'font-medium': lang.code === locale,
              'text-muted-foreground': lang.code !== locale,
            }"
          >
            <span class="md:hidden">{{ lang.code }}</span>
            <span class="hidden md:inline">{{ lang.name }}</span>
          </NuxtLink>
        </nav>
      </div>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>

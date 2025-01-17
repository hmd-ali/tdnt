<script setup lang="ts">
import type { LocaleObject } from "@nuxtjs/i18n"
const switchLocalePath = useSwitchLocalePath()
const { locales: _locales, locale } = useI18n()
const locales = computed(() => _locales.value as unknown as LocaleObject[])
</script>

<template>
  <nav class="flex items-center gap-x-4">
    <NuxtLink
      v-for="lang in locales"
      :key="lang.code"
      :to="switchLocalePath(lang.code)"
      class="text-sm"
      :data-testid="`lang-switch-${lang.code}`"
      :class="{
        'font-medium': lang.code === locale,
        'text-muted-foreground': lang.code !== locale,
      }"
    >
      <span class="md:hidden">{{ lang.code }}</span>
      <span class="hidden md:inline">{{ lang.name }}</span>
    </NuxtLink>
  </nav>
</template>

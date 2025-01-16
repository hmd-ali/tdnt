<script setup lang="ts">
const localeHead = useLocaleHead({
  dir: true,
})

useHead(() => localeHead.value)
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiToaster rich-colors />
  </div>
</template>

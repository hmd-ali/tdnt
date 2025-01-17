<script setup lang="ts">
const localeHead = useLocaleHead({
  dir: true,
})

const { $supabase } = useNuxtApp()

useHead(() => localeHead.value)

const userStore = useUserStore()
const localePath = useLocalePath()

$supabase.auth.onAuthStateChange(async (event, session) => {
  if (session !== null) {
    userStore.setUser({
      id: "123",
      email: session.user.email!,
      name: session.user.user_metadata.full_name,
      token: session.access_token,
    })
    await navigateTo(localePath("/"))
  } else {
    userStore.clearUser()
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiToaster rich-colors />
  </div>
</template>

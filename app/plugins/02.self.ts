export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()

  await useAsyncData(async () => {
    const { $api } = useNuxtApp()
    try {
      const { user } = await $api("/api/auth/self")
      userStore.setUser(user)
    } catch {
      userStore.clearUser()
    }
  })
})

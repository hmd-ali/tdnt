export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  const { $localePath } = useNuxtApp()

  if (userStore.isLoggedIn) {
    return navigateTo($localePath("/"))
  }
})

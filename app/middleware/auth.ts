export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()
  const { $localePath } = useNuxtApp()

  if (!userStore.isLoggedIn) {
    return navigateTo(
      $localePath({
        name: "login",
      }),
    )
  }
})

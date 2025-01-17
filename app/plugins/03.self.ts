import type { User } from "~~/types/user"

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const { $supabase, $api } = useNuxtApp()

  await useAsyncData(
    async () => {
      let found = false
      let user: User | null = null
      console.log("runing self plugin")

      try {
        console.log("supabaseUser")
        const { data: supabaseUser } = await $supabase.auth.getUser()
        console.log("supabaseUser", supabaseUser)
        if (supabaseUser !== null) {
          found = true
          if (supabaseUser.user !== null) {
            user = {
              email: supabaseUser.user.email ?? "",
              id: supabaseUser.user.id,
              name: supabaseUser.user.user_metadata.full_name ?? "",
              token: "",
            }
          }
        }
      } catch {}
      if (!found) {
        try {
          const { user: apiUser } = await $api("/api/auth/self")
          if (apiUser) {
            const { password, ...rest } = apiUser
            user = rest
          }
        } catch {}
      }
      if (user !== null) {
        userStore.setUser(user)
      }
      return true
    },
    // else if (apiUser !== null) {
    //   const { password, ...rest } = apiUser
    //   user = rest
    // }
    // if (user !== null) {
    //   userStore.setUser(user)
    // }
    {
      server: false,
    },
  )
})

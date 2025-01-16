import type { User } from "~~/types/user"

export const useUserStore = defineStore("user", () => {
  const user = ref<User>()

  const isLoggedIn = computed(() => user.value !== undefined)

  const setUser = (newUser: User) => {
    user.value = newUser
    sessionStorage.setItem("token", newUser.token)
  }

  const clearUser = () => {
    user.value = undefined
    sessionStorage.removeItem("token")
  }

  return {
    user,
    isLoggedIn,
    setUser,
    clearUser,
  }
})

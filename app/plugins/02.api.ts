export default defineNuxtPlugin(() => {
  const headers = useRequestHeaders()
  const api = $fetch.create({
    headers,
    onRequest: ({ options }) => {
      const token = sessionStorage.getItem("token")
      if (token !== null) {
        options.headers.set("Authorization", `Bearer ${token}`)
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})

import { users } from "../data"

export default defineEventHandler((event) => {
  if (event.path.startsWith("/api/auth/login")) {
    return
  }
  const token = event.headers.get("Authorization")?.split("Bearer ")[1]

  if (token === null) {
    throw createError({
      statusCode: 401,
      statusMessage: "",
    })
  }
  const user = users.find((u) => u.token === token)
  if (user !== undefined) {
    event.context.user = user
  }
})

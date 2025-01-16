export default defineEventHandler(async (event) => {
  if (event.context.user !== undefined) {
    return {
      user: event.context.user,
      token: event.context.user.token,
    }
  }
  throw createError({
    statusCode: 401,
    statusMessage: "auth.unauthorized",
  })
})

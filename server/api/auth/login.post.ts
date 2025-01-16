import { z } from "zod"
import { users } from "~~/server/data"

export default defineEventHandler(async (event) => {
  const t = await useTranslation(event)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const loginSchema = z.object({
    email: z
      .string({
        required_error: t("form.field_is_required", [t("form.email")]),
      })
      .email(t("form.field_is_required", [t("form.email")])),
    password: z.string({
      required_error: t("form.field_is_required", [t("form.password")]),
    }),
  })
  const body = await readValidatedBody(event, loginSchema.parse)

  const user = users.find((u) => u.email === body.email)
  if (user === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: t("invalid_username_or_password"),
    })
  }

  const isPasswordCorrect = await verifyPassword(body.password, user.password)
  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 400,
      statusMessage: t("invalid_username_or_password"),
    })
  }
  return {
    user,
    token: user.token,
  }
})

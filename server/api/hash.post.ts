import { z } from "zod"

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(
    event,
    z.object({
      password: z.string(),
    }).parse,
  )

  const hash = await hashPassword(body.password)
  return {
    hashedPassword: hash,
  }
})

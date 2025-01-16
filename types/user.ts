import type { users } from "~~/server/data"

export type User = (typeof users)[number]

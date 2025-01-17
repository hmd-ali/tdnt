import type { users } from "~~/server/data"

export type User = Omit<(typeof users)[number], "password">

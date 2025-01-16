import type { users } from "~~/server/data"

declare module "h3" {
  interface H3EventContext {
    user: (typeof users)[number] | undefined
  }
}
declare module "#app" {
  interface PageMeta {
    requiresAuth?: boolean
  }
}

export {}

import { randomBytes, pbkdf2Sync } from "crypto"

export const verifyPassword = async (password: string, hash: string) => {
  const [_hashType, salt, key] = hash.split("$")

  const keyHash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString(
    "hex",
  )

  return keyHash === key
}

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex")
  const key = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")

  return `pbkdf2$${salt}$${key}`
}

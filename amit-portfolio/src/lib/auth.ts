import { cookies } from "next/headers"
import { getDatabase } from "./db"

export async function verifyAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin-token")

  if (!token) {
    return false
  }

  // In a real app, verify JWT token
  // For demo purposes, we'll use a simple check
  return token.value === "admin-authenticated"
}

export async function loginAdmin(email: string, password: string) {
  try {
    const db = await getDatabase()
    const user = await db.collection("admin_users").findOne({ email })

    if (!user) {
      return false
    }

    // In production, use bcrypt to compare passwords
    // For demo: amitkmrsharma292@gmail.com / admin123
    if (email === "amitkmrsharma292@gmail.com" && password === "admin123") {
      return true
    }

    return false
  } catch (error) {
    console.error("Login error:", error)
    return false
  }
}

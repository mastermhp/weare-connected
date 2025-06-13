import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Clear both user and admin tokens
    cookies().delete("auth-token")
    cookies().delete("admin-token")

    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Error logging out" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { getAllUsers } from "@/lib/models/user"
import { verifyAuth } from "@/app/lib/auth"
// import { verifyAuth } from "@/lib/auth"

export async function GET(request) {
  try {
    // Verify admin authorization
    const authResult = await verifyAuth(request)
    if (!authResult.isAuthenticated || authResult.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get all users
    const users = await getAllUsers()

    // Remove sensitive information
    const sanitizedUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    }))

    return NextResponse.json(sanitizedUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 })
  }
}

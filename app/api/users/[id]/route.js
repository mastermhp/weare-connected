import { NextResponse } from "next/server"
import { findUserById, updateUserStatus, deleteUser } from "@/lib/models/user"
import { verifyAuth } from "@/lib/auth"

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Verify authorization
    const authResult = await verifyAuth(request)
    if (!authResult.isAuthenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Only allow admins or the user themselves to access user data
    if (authResult.user.role !== "admin" && authResult.user.id !== id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get user
    const user = await findUserById(id)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const { isActive } = await request.json()

    // Verify admin authorization
    const authResult = await verifyAuth(request)
    if (!authResult.isAuthenticated || authResult.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Update user status
    await updateUserStatus(id, isActive)

    return NextResponse.json({ message: "User status updated successfully" })
  } catch (error) {
    console.error("Error updating user status:", error)
    return NextResponse.json({ message: "Error updating user status" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    // Verify admin authorization
    const authResult = await verifyAuth(request)
    if (!authResult.isAuthenticated || authResult.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Delete user
    await deleteUser(id)

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 })
  }
}

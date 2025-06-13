import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/app/lib/mongodb"

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      console.log("Missing username or password")
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    console.log(`Admin login attempt for username: ${username}`)

    // Connect to database
    const { db } = await connectToDatabase()

    // Find admin by username
    const admin = await db.collection("admins").findOne({ username })

    // Check if admin exists
    if (!admin) {
      console.log(`Admin not found: ${username}`)
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

    console.log(`Admin found: ${username}, verifying password`)

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      console.log(`Invalid password for admin: ${username}`)
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

    console.log(`Password valid for admin: ${username}, creating token`)

    // Create JWT token
    const token = jwt.sign(
      {
        id: admin._id.toString(),
        username: admin.username,
        role: "admin",
      },
      process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production",
      { expiresIn: "1d" },
    )

    console.log(`Token created for admin: ${username}`)

    // Set cookie
    cookies().set({
      name: "admin-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    })

    // Return admin data (without password)
    const { password: _, ...adminData } = admin

    // Convert ObjectId to string to make it serializable
    const serializedAdmin = {
      ...adminData,
      _id: adminData._id.toString(),
      role: "admin",
    }

    console.log(`Admin login successful: ${username}`)

    return NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: serializedAdmin,
    })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

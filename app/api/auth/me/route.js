import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/app/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    // Get cookies
    const cookieStore = cookies()
    const userToken = cookieStore.get("auth-token")?.value
    const adminToken = cookieStore.get("admin-token")?.value

    console.log("Auth check - User token:", userToken ? "Present" : "Not present")
    console.log("Auth check - Admin token:", adminToken ? "Present" : "Not present")

    if (!userToken && !adminToken) {
      console.log("Auth check - No tokens found")
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // JWT Secret
    const jwtSecret = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production"

    // Connect to database
    const { db } = await connectToDatabase()

    // Check user token first
    if (userToken) {
      try {
        const decoded = jwt.verify(userToken, jwtSecret)
        console.log("Auth check - User token decoded:", decoded)

        // Get user from database
        const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.id) })

        if (!user) {
          console.log("Auth check - User not found in database")
          return NextResponse.json({ authenticated: false }, { status: 401 })
        }

        // Return user data (without password)
        const { password, ...userData } = user

        return NextResponse.json({
          authenticated: true,
          user: {
            ...userData,
            _id: userData._id.toString(),
            role: userData.role || "user",
          },
        })
      } catch (error) {
        console.error("Auth check - User token verification error:", error)
        // Continue to check admin token
      }
    }

    // Check admin token
    if (adminToken) {
      try {
        const decoded = jwt.verify(adminToken, jwtSecret)
        console.log("Auth check - Admin token decoded:", decoded)

        // Get admin from database
        const admin = await db.collection("admins").findOne({ _id: new ObjectId(decoded.id) })

        if (!admin) {
          console.log("Auth check - Admin not found in database")
          return NextResponse.json({ authenticated: false }, { status: 401 })
        }

        // Return admin data (without password)
        const { password, ...adminData } = admin

        return NextResponse.json({
          authenticated: true,
          user: {
            ...adminData,
            _id: adminData._id.toString(),
            role: adminData.role || "admin",
          },
        })
      } catch (error) {
        console.error("Auth check - Admin token verification error:", error)
        return NextResponse.json({ authenticated: false }, { status: 401 })
      }
    }

    // If we get here, both tokens were invalid
    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}

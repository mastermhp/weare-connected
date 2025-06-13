import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
// import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "./mongodb"

/**
 * Verify authentication from request
 * @param {Request} request - Next.js request object
 * @returns {Promise<Object>} Authentication status and user info
 */
export async function verifyAuth(request) {
  try {
    // Get cookies
    const cookieStore = cookies()
    const userToken = cookieStore.get("auth-token")?.value
    const adminToken = cookieStore.get("admin-token")?.value

    if (!userToken && !adminToken) {
      return { authenticated: false, isAdmin: false }
    }

    // JWT Secret
    const jwtSecret = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production"

    // Check admin token first (since admin has higher privileges)
    if (adminToken) {
      try {
        const decoded = jwt.verify(adminToken, jwtSecret)

        // Connect to database
        const { db } = await connectToDatabase()

        // Find admin by ID
        let admin
        try {
          admin = await db.collection("admins").findOne({ _id: new ObjectId(decoded.id) })
        } catch (error) {
          // If ObjectId conversion fails, try finding by string ID
          admin = await db.collection("admins").findOne({ _id: decoded.id })
        }

        if (!admin) {
          return { authenticated: false, isAdmin: false }
        }

        return {
          authenticated: true,
          isAdmin: true,
          user: {
            id: admin._id.toString(),
            username: admin.username,
            role: "admin",
          },
        }
      } catch (error) {
        console.error("Admin token verification error:", error)
      }
    }

    // Check user token
    if (userToken) {
      try {
        const decoded = jwt.verify(userToken, jwtSecret)

        // Connect to database
        const { db } = await connectToDatabase()

        // Find user by ID
        let user
        try {
          user = await db.collection("users").findOne({ _id: new ObjectId(decoded.id) })
        } catch (error) {
          // If ObjectId conversion fails, try finding by string ID
          user = await db.collection("users").findOne({ _id: decoded.id })
        }

        if (!user) {
          return { authenticated: false, isAdmin: false }
        }

        return {
          authenticated: true,
          isAdmin: false,
          user: {
            id: user._id.toString(),
            email: user.email,
            role: "user",
          },
        }
      } catch (error) {
        console.error("User token verification error:", error)
      }
    }

    return { authenticated: false, isAdmin: false }
  } catch (error) {
    console.error("Auth verification error:", error)
    return { authenticated: false, isAdmin: false }
  }
}

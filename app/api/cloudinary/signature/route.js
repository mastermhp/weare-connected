import { NextResponse } from "next/server"
import { getCloudinaryUploadSignature } from "@/app/lib/cloudinary"
import { verifyAuth } from "@/app/lib/auth"

export async function GET(request) {
  try {
    // Verify authentication
    const { authenticated, isAdmin } = await verifyAuth(request)

    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get signature for client-side upload
    const signatureData = getCloudinaryUploadSignature()

    return NextResponse.json(signatureData)
  } catch (error) {
    console.error("Error generating signature:", error)
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 })
  }
}

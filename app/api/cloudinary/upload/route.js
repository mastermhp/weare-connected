import { verifyAuth } from "@/app/lib/auth"
import { uploadImage } from "@/app/lib/cloudinary"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    // Verify authentication
    const { authenticated } = await verifyAuth(request)

    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get image data from request
    const { image, folder = "website_content" } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 })
    }

    // Upload image to Cloudinary
    const result = await uploadImage(image, folder)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 })
  }
}

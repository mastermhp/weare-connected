import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { verifyAuth } from "@/app/lib/auth"
import { deleteImage } from "@/app/lib/cloudinary"
import { connectToDatabase, isMongoDBAvailable } from "@/app/lib/mongodb"

// GET a single blog post by ID
export async function GET(request, { params }) {
  try {
    // Check if MongoDB is available
    if (!isMongoDBAvailable()) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    // Verify admin authentication
    const { authenticated, isAdmin } = await verifyAuth(request)

    if (!authenticated || !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog post ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const post = await db.collection("blog_posts").findOne({ _id: new ObjectId(id) })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Serialize the MongoDB object
    const serializedPost = {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toISOString() || new Date().toISOString(),
      publishedAt: post.publishedAt?.toISOString() || null,
    }

    return NextResponse.json(serializedPost)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// PUT update a blog post
export async function PUT(request, { params }) {
  try {
    // Check if MongoDB is available
    if (!isMongoDBAvailable()) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    // Verify admin authentication
    const { authenticated, isAdmin } = await verifyAuth(request)

    if (!authenticated || !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog post ID" }, { status: 400 })
    }

    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if slug is being changed and if it already exists
    if (data.slug) {
      const existingPost = await db.collection("blog_posts").findOne({
        slug: data.slug,
        _id: { $ne: new ObjectId(id) },
      })
      if (existingPost) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
      }
    }

    // Update post with timestamps
    const updateData = {
      ...data,
      updatedAt: new Date(),
    }

    // If status is changing to published, set publishedAt
    if (data.status === "published") {
      const currentPost = await db.collection("blog_posts").findOne({ _id: new ObjectId(id) })
      if (currentPost && currentPost.status !== "published") {
        updateData.publishedAt = new Date()
      }
    }

    const result = await db.collection("blog_posts").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Blog post updated successfully",
      post: { ...updateData, _id: id },
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

// DELETE a blog post
export async function DELETE(request, { params }) {
  try {
    // Check if MongoDB is available
    if (!isMongoDBAvailable()) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    // Verify admin authentication
    const { authenticated, isAdmin } = await verifyAuth(request)

    if (!authenticated || !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog post ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Get post to check for images to delete
    const post = await db.collection("blog_posts").findOne({ _id: new ObjectId(id) })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Delete associated images from Cloudinary
    if (post.featuredImage && post.featuredImage.publicId) {
      await deleteImage(post.featuredImage.publicId)
    }

    // Delete post from database
    const result = await db.collection("blog_posts").deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}

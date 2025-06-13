import { NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"

// GET all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")

    const { db } = await connectToDatabase()

    // Build query
    const query = {}
    if (category) query.category = category
    if (tag) query.tags = tag

    // Get total count for pagination
    const total = await db.collection("blog").countDocuments(query)

    // Get blog posts with pagination
    const posts = await db
      .collection("blog")
      .find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

// POST new blog post (admin only)
export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Check if slug already exists
    const existingPost = await db.collection("blog").findOne({ slug: data.slug })
    if (existingPost) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
    }

    // Create blog post with timestamps
    const post = {
      ...data,
      publishedAt: data.publishedAt || new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("blog").insertOne(post)

    return NextResponse.json(
      {
        message: "Blog post created successfully",
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

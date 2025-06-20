import { NextResponse } from "next/server"
import { connectToDatabase, isMongoDBAvailable } from "@/app/lib/mongodb"
import { ObjectId } from "mongodb"

// Helper function to serialize blog post data
const serializeBlogPost = (post) => {
  if (!post) return null

  return {
    id: post._id?.toString() || post.id,
    slug: post.slug || post._id?.toString() || "",
    title: post.title || "Untitled Post",
    excerpt:
      post.excerpt ||
      post.shortDescription ||
      (post.content ? post.content.substring(0, 150) + "..." : "No excerpt available"),
    content: post.content || "No content available",
    author: post.author || {
      name: "Connected Team",
      role: "Author",
      image: "/placeholder.svg?height=40&width=40&text=A",
    },
    authorImage:
      post.author?.image?.url ||
      post.author?.image ||
      "/placeholder.svg?height=80&width=80&text=" + encodeURIComponent(post.author?.name?.charAt(0) || "A"),
    authorRole: post.author?.role || "Author",
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
    image:
      post.featuredImage?.url ||
      post.image?.url ||
      post.image ||
      "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(post.title || "Blog Post"),
    tags: Array.isArray(post.tags) ? post.tags : ["Technology", "Innovation"],
    category: post.category || "Technology",
    readTime: post.readTime || "5 min read",
    status: post.status || "published",
  }
}

export async function GET(request, { params }) {
  try {
    const { slug } = params

    if (!isMongoDBAvailable()) {
      console.warn("MongoDB not available, returning null for blog post")
      return NextResponse.json(null, { status: 404 })
    }

    const { db } = await connectToDatabase()
    let post = null

    // Try 'blog' collection first
    try {
      post = await db.collection("blog").findOne({ slug, status: "published" })
    } catch (err) {
      console.log("Blog collection not found, trying blog_posts...")
    }

    // If not found, try 'blog_posts' collection
    if (!post) {
      try {
        post = await db.collection("blog_posts").findOne({ slug, status: "published" })
      } catch (err) {
        console.log("Blog_posts collection not found either...")
      }
    }

    // If still not found, try without status filter
    if (!post) {
      try {
        post = await db.collection("blog").findOne({ slug })
      } catch (err) {
        console.log("Error finding blog post without status filter:", err.message)
      }
    }

    // If still not found by slug, try by ID (in case slug is actually an ID)
    if (!post && ObjectId.isValid(slug)) {
      try {
        post = await db.collection("blog").findOne({ _id: new ObjectId(slug) })
      } catch (err) {
        try {
          post = await db.collection("blog_posts").findOne({ _id: new ObjectId(slug) })
        } catch (err2) {
          console.log("Error trying to find by ID:", err2.message)
        }
      }
    }

    if (!post) {
      console.log(`Blog post with slug '${slug}' not found in database`)
      return NextResponse.json(null, { status: 404 })
    }

    console.log(`Found blog post: ${post.title}`)
    const serializedPost = serializeBlogPost(post)

    return NextResponse.json(serializedPost, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error(`Error fetching blog post with slug ${params.slug}:`, error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

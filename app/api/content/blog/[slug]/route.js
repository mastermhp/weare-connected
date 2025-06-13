import { NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"
import { ObjectId } from "mongodb"

// GET single blog post by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params

    const { db } = await connectToDatabase()

    // Try to find by slug first
    let post = null

    // Try multiple collection names for blog posts
    try {
      post = await db.collection("blog").findOne({
        slug,
        status: "published",
      })
    } catch (err) {
      console.log("Blog collection not found, trying blog_posts...")
    }

    // If not found, try 'blog_posts' collection
    if (!post) {
      try {
        post = await db.collection("blog_posts").findOne({
          slug,
          status: "published",
        })
      } catch (err) {
        console.log("Blog_posts collection not found either...")
      }
    }

    // If still not found by slug, try by ID (in case slug is actually an ID)
    if (!post && ObjectId.isValid(slug)) {
      try {
        post = await db.collection("blog").findOne({
          _id: new ObjectId(slug),
          status: "published",
        })
      } catch (err) {
        try {
          post = await db.collection("blog_posts").findOne({
            _id: new ObjectId(slug),
            status: "published",
          })
        } catch (err2) {
          console.log("Error trying to find by ID:", err2.message)
        }
      }
    }

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Transform post data
    const transformedPost = {
      id: post._id.toString(),
      slug: post.slug || post._id.toString(),
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
        post.author?.image ||
        "/placeholder.svg?height=80&width=80&text=" + encodeURIComponent(post.author?.name?.charAt(0) || "A"),
      authorRole: post.author?.role || "Author",
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
      image:
        post.featuredImage?.url ||
        post.image ||
        "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(post.title || "Blog Post"),
      tags: Array.isArray(post.tags) ? post.tags : ["Technology", "Innovation"],
      category: post.category || "Technology",
      readTime: post.readTime || "5 min read",
    }

    return NextResponse.json(transformedPost)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

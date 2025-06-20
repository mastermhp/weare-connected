import { NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const { slug } = params
    console.log(`Blog API: Fetching post with slug: ${slug}`)
    console.log(`Blog API: Environment check - MONGODB_URI exists: ${!!process.env.MONGODB_URI}`)

    if (!slug || typeof slug !== "string") {
      console.log("Blog API: Invalid slug provided")
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }

    // Check if MongoDB is available
    try {
      const { db } = await connectToDatabase()
      console.log("Blog API: Database connected successfully")

      // Debug: Check what collections exist
      const collections = await db.listCollections().toArray()
      console.log(
        "Blog API: Available collections:",
        collections.map((c) => c.name),
      )

      let post = null

      // Try to find by slug first in 'blog' collection
      try {
        const blogCollection = db.collection("blog")
        const allPosts = await blogCollection.find({}).toArray()
        console.log(`Blog API: Found ${allPosts.length} total posts in 'blog' collection`)

        post = await blogCollection.findOne({ slug, status: "published" })
        if (post) {
          console.log(`Blog API: Found post in 'blog' collection: ${post.title}`)
        }
      } catch (err) {
        console.log("Blog API: Error with 'blog' collection:", err.message)
      }

      // If not found, try 'blog_posts' collection
      if (!post) {
        try {
          const blogPostsCollection = db.collection("blog_posts")
          const allPosts = await blogPostsCollection.find({}).toArray()
          console.log(`Blog API: Found ${allPosts.length} total posts in 'blog_posts' collection`)

          post = await blogPostsCollection.findOne({ slug, status: "published" })
          if (post) {
            console.log(`Blog API: Found post in 'blog_posts' collection: ${post.title}`)
          }
        } catch (err) {
          console.log("Blog API: Error with 'blog_posts' collection:", err.message)
        }
      }

      // If still not found, try without status filter
      if (!post) {
        try {
          post = await db.collection("blog").findOne({ slug })
          if (post) {
            console.log(`Blog API: Found post in 'blog' collection (no status filter): ${post.title}`)
          }
        } catch (err) {
          console.log("Blog API: Error finding blog post without status filter:", err.message)
        }
      }

      // If still not found by slug, try by ID (in case slug is actually an ID)
      if (!post && ObjectId.isValid(slug)) {
        try {
          post = await db.collection("blog").findOne({ _id: new ObjectId(slug) })
          if (post) {
            console.log(`Blog API: Found post by ID in 'blog' collection: ${post.title}`)
          }
        } catch (err) {
          try {
            post = await db.collection("blog_posts").findOne({ _id: new ObjectId(slug) })
            if (post) {
              console.log(`Blog API: Found post by ID in 'blog_posts' collection: ${post.title}`)
            }
          } catch (err2) {
            console.log("Blog API: Error trying to find by ID:", err2.message)
          }
        }
      }

      if (!post) {
        console.log(`Blog API: Post not found for slug: ${slug}`)
        // Return sample data for debugging
        const samplePost = {
          id: "sample-debug",
          slug: slug,
          title: `Debug Post for ${slug}`,
          excerpt: "This is a debug post to test the API endpoint",
          content:
            "This post was generated because the requested post was not found in the database. Please check your database connection and ensure the post exists.",
          author: {
            name: "Debug System",
            role: "System",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
          },
          publishedAt: new Date().toISOString(),
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
          tags: ["Debug", "System"],
          category: "Debug",
          readTime: "1 min read",
          status: "published",
        }

        console.log("Blog API: Returning debug post")
        return NextResponse.json(samplePost, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        })
      }

      // Transform post data to ensure consistent format
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
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        },
        authorImage:
          post.author?.image?.url ||
          post.author?.image ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        authorRole: post.author?.role || "Author",
        publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
        image:
          post.featuredImage?.url ||
          post.image?.url ||
          post.image ||
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
        tags: Array.isArray(post.tags) ? post.tags : ["Technology", "Innovation"],
        category: post.category || "Technology",
        readTime: post.readTime || "5 min read",
        status: post.status || "published",
      }

      console.log(`Blog API: Returning transformed post: ${transformedPost.title}`)
      return NextResponse.json(transformedPost, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      })
    } catch (dbError) {
      console.error("Blog API: Database connection failed:", dbError)
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: dbError.message,
          slug: slug,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error(`Blog API: Error fetching blog post with slug ${params.slug}:`, error)
    return NextResponse.json(
      {
        error: "Failed to fetch blog post",
        details: error.message,
        slug: params.slug,
      },
      { status: 500 },
    )
  }
}

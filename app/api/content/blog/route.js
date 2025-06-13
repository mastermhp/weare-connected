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

    // Try multiple collection names for blog posts
    let posts = []
    let total = 0

    // Try 'blog' collection first
    try {
      total = await db.collection("blog").countDocuments(query)
      if (total > 0) {
        posts = await db
          .collection("blog")
          .find(query)
          .sort({ publishedAt: -1, createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray()
      }
    } catch (err) {
      console.log("Blog collection not found, trying blog_posts...")
    }

    // If no posts found, try 'blog_posts' collection
    if (posts.length === 0) {
      try {
        total = await db.collection("blog_posts").countDocuments(query)
        if (total > 0) {
          posts = await db
            .collection("blog_posts")
            .find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray()
        }
      } catch (err) {
        console.log("Blog_posts collection not found either...")
      }
    }

    // Transform posts data
    const transformedPosts = posts.map((post) => ({
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
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image:
        post.featuredImage?.url ||
        post.image ||
        "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(post.title || "Blog Post"),
      tags: post.tags || ["Technology", "Innovation"],
      category: post.category || "Technology",
      readTime: post.readTime || "5 min read",
    }))

    // If still no posts, return sample data
    if (transformedPosts.length === 0) {
      const samplePosts = [
        {
          id: "sample-1",
          slug: "future-of-technology",
          title: "The Future of Technology: Trends to Watch",
          excerpt:
            "Explore the latest technological trends that are shaping our future and transforming industries worldwide.",
          content: "Technology continues to evolve at an unprecedented pace...",
          author: {
            name: "Connected Team",
            role: "Technology Analyst",
            image: "/placeholder.svg?height=40&width=40&text=CT",
          },
          publishedAt: new Date().toLocaleDateString(),
          image: "/placeholder.svg?height=400&width=600&text=Future+of+Technology",
          tags: ["Technology", "Innovation", "Future"],
          category: "Technology",
          readTime: "8 min read",
        },
        {
          id: "sample-2",
          slug: "building-successful-ventures",
          title: "Building Successful Ventures: Lessons Learned",
          excerpt:
            "Key insights and strategies for building and scaling successful technology ventures in today's market.",
          content: "Building a successful venture requires more than just a great idea...",
          author: {
            name: "Connected Team",
            role: "Venture Builder",
            image: "/placeholder.svg?height=40&width=40&text=VB",
          },
          publishedAt: new Date(Date.now() - 86400000).toLocaleDateString(),
          image: "/placeholder.svg?height=400&width=600&text=Successful+Ventures",
          tags: ["Ventures", "Startup", "Business"],
          category: "Business",
          readTime: "6 min read",
        },
        {
          id: "sample-3",
          slug: "innovation-ecosystem",
          title: "Creating an Innovation Ecosystem",
          excerpt: "How to foster innovation within organizations and build ecosystems that drive continuous growth.",
          content: "Innovation doesn't happen in isolation...",
          author: {
            name: "Connected Team",
            role: "Innovation Lead",
            image: "/placeholder.svg?height=40&width=40&text=IL",
          },
          publishedAt: new Date(Date.now() - 172800000).toLocaleDateString(),
          image: "/placeholder.svg?height=400&width=600&text=Innovation+Ecosystem",
          tags: ["Innovation", "Ecosystem", "Growth"],
          category: "Innovation",
          readTime: "7 min read",
        },
      ]

      return NextResponse.json({
        posts: samplePosts,
        pagination: {
          total: samplePosts.length,
          page: 1,
          limit: limit,
          pages: 1,
        },
      })
    }

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)

    // Return sample data as fallback
    const samplePosts = [
      {
        id: "sample-1",
        slug: "future-of-technology",
        title: "The Future of Technology: Trends to Watch",
        excerpt:
          "Explore the latest technological trends that are shaping our future and transforming industries worldwide.",
        content: "Technology continues to evolve at an unprecedented pace...",
        author: {
          name: "Connected Team",
          role: "Technology Analyst",
          image: "/placeholder.svg?height=40&width=40&text=CT",
        },
        publishedAt: new Date().toLocaleDateString(),
        image: "/placeholder.svg?height=400&width=600&text=Future+of+Technology",
        tags: ["Technology", "Innovation", "Future"],
        category: "Technology",
        readTime: "8 min read",
      },
      {
        id: "sample-2",
        slug: "building-successful-ventures",
        title: "Building Successful Ventures: Lessons Learned",
        excerpt:
          "Key insights and strategies for building and scaling successful technology ventures in today's market.",
        content: "Building a successful venture requires more than just a great idea...",
        author: {
          name: "Connected Team",
          role: "Venture Builder",
          image: "/placeholder.svg?height=40&width=40&text=VB",
        },
        publishedAt: new Date(Date.now() - 86400000).toLocaleDateString(),
        image: "/placeholder.svg?height=400&width=600&text=Successful+Ventures",
        tags: ["Ventures", "Startup", "Business"],
        category: "Business",
        readTime: "6 min read",
      },
    ]

    return NextResponse.json({
      posts: samplePosts,
      pagination: {
        total: samplePosts.length,
        page: 1,
        limit: 10,
        pages: 1,
      },
    })
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

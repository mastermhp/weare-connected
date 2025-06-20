import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"

// Calculate dynamic read time
function calculateReadTime(content) {
  if (!content) return "1 min read"
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readTime} min read`
}

// Sample blog posts for fallback
const sampleBlogPosts = [
  {
    id: "1",
    slug: "future-of-technology",
    title: "The Future of Technology: Trends to Watch",
    excerpt:
      "Explore the latest technological trends that are shaping our future and transforming industries worldwide.",
    content: `Technology continues to evolve at an unprecedented pace, bringing new opportunities and challenges to businesses and individuals alike. In this comprehensive analysis, we explore the key trends that will define the next decade of technological advancement.

Artificial Intelligence and Machine Learning are no longer buzzwords but essential tools driving innovation across industries. From healthcare diagnostics to financial fraud detection, AI is revolutionizing how we approach complex problems and make decisions.

The Internet of Things (IoT) is creating a more connected world, where everyday objects communicate and share data to improve efficiency and user experience. Smart homes, connected vehicles, and industrial IoT applications are just the beginning of this transformation.

Blockchain technology is expanding beyond cryptocurrency, offering secure and transparent solutions for supply chain management, digital identity verification, and decentralized applications.

As we look to the future, these technologies will continue to converge and create new possibilities we can barely imagine today.`,
    author: {
      name: "Connected Team",
      role: "Technology Analyst",
      image: "/placeholder.svg?height=40&width=40&text=CT",
    },
    authorImage: "/placeholder.svg?height=80&width=80&text=CT",
    authorRole: "Technology Analyst",
    publishedAt: new Date().toISOString(),
    image: "/placeholder.svg?height=400&width=600&text=Future+of+Technology",
    tags: ["Technology", "Innovation", "Future", "AI", "IoT"],
    category: "Technology",
    readTime: "8 min read",
  },
]

// Get base URL for API calls
function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser should use relative URL
    return ""
  }
  if (process.env.VERCEL_URL) {
    // SSR should use vercel url
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    // Use custom base URL
    return process.env.NEXT_PUBLIC_BASE_URL
  }
  // Development fallback
  return "http://localhost:3000"
}

// Safe function to get blog posts
async function getBlogPosts() {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/content/blog`, {
      next: { revalidate: 60 }, // ISR with 60 second revalidation
    })

    if (response.ok) {
      const data = await response.json()
      return Array.isArray(data.posts) ? data.posts : sampleBlogPosts
    }
  } catch (error) {
    console.warn("Failed to fetch blog posts from API, using sample data:", error.message)
  }

  return sampleBlogPosts
}

// Safe function to get a single blog post
async function getBlogPost(slug) {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/content/blog/${slug}`, {
      next: { revalidate: 60 }, // ISR with 60 second revalidation
    })

    if (response.ok) {
      const post = await response.json()
      if (post && post.slug === slug) {
        // Ensure dynamic read time calculation
        if (!post.readTime) {
          post.readTime = calculateReadTime(post.content)
        }
        return post
      }
    }
  } catch (error) {
    console.warn(`Failed to fetch blog post ${slug} from API, checking sample data:`, error.message)
  }

  // Fallback to sample data
  const fallbackPost = sampleBlogPosts.find((post) => post.slug === slug)
  if (fallbackPost && !fallbackPost.readTime) {
    fallbackPost.readTime = calculateReadTime(fallbackPost.content)
  }
  return fallbackPost || null
}

// Get related posts
function getRelatedPosts(currentPost, allPosts) {
  if (!Array.isArray(allPosts)) return []

  return allPosts.filter((post) => post.slug !== currentPost.slug && post.category === currentPost.category).slice(0, 3)
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Get all posts for related posts
  const allPosts = await getBlogPosts()
  const relatedPosts = getRelatedPosts(post, allPosts)

  // Ensure we have proper author data
  const authorName = post.author?.name || "Connected Team"
  const authorRole = post.author?.role || post.authorRole || "Author"
  const authorImage =
    post.author?.image?.url ||
    post.author?.image ||
    post.authorImage ||
    `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(authorName.charAt(0))}`

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 bg-white">
        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Hero Section */}
        <article className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{post.readTime || calculateReadTime(post.content)}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

              {/* Author and Meta Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <Image
                    src={authorImage || "/placeholder.svg"}
                    alt={authorName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{authorName}</div>
                    <div className="text-sm text-gray-600">{authorRole}</div>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime || calculateReadTime(post.content)}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12">
              <Image
                src={post.image || "/placeholder.svg?height=400&width=800"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-gray-700 leading-relaxed space-y-6">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(post.tags || []).map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="mb-12" />

            {/* Author Bio */}
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <div className="flex items-start space-x-4">
                <Image
                  src={authorImage || "/placeholder.svg"}
                  alt={authorName}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{authorName}</h3>
                  <p className="text-gray-600 mb-4">{authorRole}</p>
                  <p className="text-gray-700">
                    {authorName} is a leading expert in {post.category.toLowerCase()}, helping businesses navigate the
                    complexities of modern technology adoption and digital transformation.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                    >
                      <Image
                        src={relatedPost.image || "/placeholder.svg?height=200&width=300"}
                        alt={relatedPost.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          {relatedPost.author?.name || "Author"}
                          <span className="mx-2">•</span>
                          <Clock className="w-3 h-3 mr-1" />
                          {relatedPost.readTime || calculateReadTime(relatedPost.content)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </>
  )
}

// Generate static params for better performance on Vercel
export async function generateStaticParams() {
  try {
    // Use a more robust approach for static generation
    const posts = await getBlogPosts()

    if (Array.isArray(posts) && posts.length > 0) {
      return posts.map((post) => ({
        slug: post.slug,
      }))
    }

    // Return sample slugs as fallback
    return [{ slug: "future-of-technology" }]
  } catch (error) {
    console.warn("Error generating static params for blog posts:", error.message)
    // Return sample slugs as fallback
    return [{ slug: "future-of-technology" }]
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const post = await getBlogPost(slug)

    if (!post) {
      return {
        title: "Post Not Found",
      }
    }

    return {
      title: `${post.title} | Connected Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.image],
      },
    }
  } catch (error) {
    return {
      title: "Blog Post | Connected",
      description: "Read our latest insights and perspectives on technology and innovation.",
    }
  }
}

// Enable ISR for dynamic blog posts
export const dynamic = "force-static"
export const revalidate = 60

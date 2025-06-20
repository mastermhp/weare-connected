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

// Get base URL for API calls
function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }
  return "http://localhost:3000"
}

// Fetch blog post from database via API
async function getBlogPost(slug) {
  console.log(`Fetching blog post for slug: ${slug}`)

  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/content/blog/${slug}`, {
      cache: "no-store", // Always fetch fresh data
    })

    console.log(`API response status: ${response.status}`)

    if (response.ok) {
      const post = await response.json()
      console.log(`API response:`, post)

      if (post && !post.error) {
        console.log(`Found blog post: ${post.title}`)
        if (!post.readTime) {
          post.readTime = calculateReadTime(post.content)
        }
        return post
      }
    } else {
      console.log(`API returned error: ${response.status}`)
    }
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug} from API:`, error)
  }

  console.log(`Blog post not found: ${slug}`)
  return null
}

// Fetch all blog posts for related posts
async function getAllBlogPosts() {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/content/blog`, {
      cache: "no-store",
    })

    if (response.ok) {
      const data = await response.json()
      return Array.isArray(data.posts) ? data.posts : []
    }
  } catch (error) {
    console.error("Failed to fetch all blog posts:", error)
  }

  return []
}

// Get related posts
function getRelatedPosts(currentPost, allPosts) {
  if (!Array.isArray(allPosts)) return []
  return allPosts.filter((post) => post.slug !== currentPost.slug && post.category === currentPost.category).slice(0, 3)
}

export default async function BlogPost({ params }) {
  const { slug } = await params

  console.log(`Blog page rendering for slug: ${slug}`)

  if (!slug || typeof slug !== "string") {
    console.log("Invalid slug provided")
    notFound()
  }

  const post = await getBlogPost(slug)

  if (!post) {
    console.log(`Post not found for slug: ${slug}`)
    notFound()
  }

  console.log(`Rendering blog post: ${post.title}`)

  // Get all posts for related posts
  const allPosts = await getAllBlogPosts()
  const relatedPosts = getRelatedPosts(post, allPosts)

  // Ensure we have proper author data
  const authorName = post.author?.name || "Connected Team"
  const authorRole = post.author?.role || post.authorRole || "Author"
  const authorImage =
    post.author?.image?.url ||
    post.author?.image ||
    post.authorImage ||
    `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face`

  // Use actual image from database
  const postImage =
    post.featuredImage?.url ||
    post.image?.url ||
    post.image ||
    `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop`

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
                src={postImage || "/placeholder.svg"}
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
                        src={
                          relatedPost.featuredImage?.url ||
                          relatedPost.image?.url ||
                          relatedPost.image ||
                          `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop` ||
                          "/placeholder.svg"
                        }
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

// Remove static generation - make it fully dynamic
export async function generateStaticParams() {
  // Return empty array to make all routes dynamic
  return []
}

export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    const post = await getBlogPost(slug)

    if (!post) {
      return {
        title: "Post Not Found | Connected Blog",
        description: "The requested blog post could not be found.",
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

// Make it fully dynamic to fetch from database
export const dynamic = "force-dynamic"
export const revalidate = 0

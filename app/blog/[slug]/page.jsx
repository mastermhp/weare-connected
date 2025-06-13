import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"

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
  {
    id: "2",
    slug: "building-successful-ventures",
    title: "Building Successful Ventures: Lessons Learned",
    excerpt: "Key insights and strategies for building and scaling successful technology ventures in today's market.",
    content: `Building a successful venture requires more than just a great idea. It demands strategic planning, execution excellence, and the ability to adapt to changing market conditions.

Market Research and Validation are crucial first steps. Understanding your target audience, their pain points, and willingness to pay for your solution can make the difference between success and failure.

Building the Right Team is equally important. Successful ventures are built by diverse teams with complementary skills, shared vision, and unwavering commitment to the mission.

Product-Market Fit should be your primary focus in the early stages. Iterate quickly, gather feedback, and be willing to pivot when necessary to find the sweet spot between what you're building and what the market needs.

Funding Strategy varies depending on your business model and growth trajectory. Whether bootstrapping, seeking angel investment, or pursuing venture capital, align your funding approach with your long-term goals.

Scaling Challenges will test your systems, processes, and team. Prepare for rapid growth by building scalable infrastructure and maintaining company culture as you expand.`,
    author: {
      name: "Connected Team",
      role: "Venture Builder",
      image: "/placeholder.svg?height=40&width=40&text=VB",
    },
    authorImage: "/placeholder.svg?height=80&width=80&text=VB",
    authorRole: "Venture Builder",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    image: "/placeholder.svg?height=400&width=600&text=Successful+Ventures",
    tags: ["Ventures", "Startup", "Business", "Strategy", "Growth"],
    category: "Business",
    readTime: "6 min read",
  },
  {
    id: "3",
    slug: "innovation-ecosystem",
    title: "Creating an Innovation Ecosystem",
    excerpt: "How to foster innovation within organizations and build ecosystems that drive continuous growth.",
    content: `Innovation doesn't happen in isolation. It thrives in environments that encourage experimentation, collaboration, and continuous learning.

Culture of Innovation starts with leadership commitment and permeates throughout the organization. Leaders must create psychological safety where team members feel comfortable sharing ideas and taking calculated risks.

Cross-functional Collaboration breaks down silos and brings diverse perspectives to problem-solving. When teams from different departments work together, they often discover unexpected solutions and opportunities.

Investment in Research and Development demonstrates long-term commitment to innovation. This includes not just financial resources but also time and space for exploration and experimentation.

External Partnerships with startups, universities, and research institutions can inject fresh ideas and accelerate innovation cycles. These collaborations often lead to breakthrough innovations that wouldn't be possible in isolation.

Measurement and Iteration ensure that innovation efforts are aligned with business objectives. Establish clear metrics for innovation success and be prepared to adjust strategies based on results.

The most successful innovation ecosystems are those that balance structure with flexibility, providing clear direction while allowing room for creative exploration.`,
    author: {
      name: "Connected Team",
      role: "Innovation Lead",
      image: "/placeholder.svg?height=40&width=40&text=IL",
    },
    authorImage: "/placeholder.svg?height=80&width=80&text=IL",
    authorRole: "Innovation Lead",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    image: "/placeholder.svg?height=400&width=600&text=Innovation+Ecosystem",
    tags: ["Innovation", "Ecosystem", "Growth", "Collaboration", "Culture"],
    category: "Innovation",
    readTime: "7 min read",
  },
]

// Safe function to get blog posts
async function getBlogPosts() {
  try {
    // Try to fetch from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/content/blog`, {
      cache: "no-store",
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
    // Try to fetch from API first
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/content/blog/${slug}`,
      {
        cache: "no-store",
      },
    )

    if (response.ok) {
      const post = await response.json()
      if (post && post.slug === slug) {
        return post
      }
    }
  } catch (error) {
    console.warn(`Failed to fetch blog post ${slug} from API, checking sample data:`, error.message)
  }

  // Fallback to sample data
  return sampleBlogPosts.find((post) => post.slug === slug) || null
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
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

              {/* Author and Meta Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <Image
                    src={post.authorImage || post.author?.image || "/placeholder.svg?height=48&width=48"}
                    alt={post.author?.name || "Author"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{post.author?.name || "Anonymous"}</div>
                    <div className="text-sm text-gray-600">{post.authorRole || post.author?.role || "Author"}</div>
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
                    {post.readTime}
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
                  src={post.authorImage || post.author?.image || "/placeholder.svg?height=80&width=80"}
                  alt={post.author?.name || "Author"}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author?.name || "Anonymous"}</h3>
                  <p className="text-gray-600 mb-4">{post.authorRole || post.author?.role || "Author"}</p>
                  <p className="text-gray-700">
                    {post.author?.name || "Our team"} is a leading expert in {post.category.toLowerCase()}, helping
                    businesses navigate the complexities of modern technology adoption and digital transformation.
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
                          {relatedPost.readTime}
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

// Build-safe static params generation
export async function generateStaticParams() {
  try {
    // During build, we might not have database access
    // So we'll generate params for our sample posts
    const posts = sampleBlogPosts

    if (Array.isArray(posts)) {
      return posts.map((post) => ({
        slug: post.slug,
      }))
    }

    return []
  } catch (error) {
    console.warn("Error generating static params for blog posts:", error.message)
    // Return sample slugs as fallback
    return [
      { slug: "future-of-technology" },
      { slug: "building-successful-ventures" },
      { slug: "innovation-ecosystem" },
    ]
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

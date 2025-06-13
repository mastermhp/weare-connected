import { connectToDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

// Helper function to handle database errors
const handleDbError = (error, fallbackData, entityName) => {
  console.error(`Error fetching ${entityName}:`, error)
  return fallbackData
}

// Helper function to serialize MongoDB objects
const serializeJob = (job) => {
  if (!job) return null

  return {
    id: job._id?.toString() || job.id,
    title: job.title || "",
    slug: job.slug || "",
    description: job.description || "",
    shortDescription: job.shortDescription || "",
    department: job.department || "",
    location: job.location || "",
    type: job.type || "",
    salary: job.salary || "",
    experienceLevel: job.experienceLevel || "",
    technologies: job.technologies || [],
    responsibilities: job.responsibilities || [],
    requirements: job.requirements || [],
    benefits: job.benefits || [],
    status: job.status || "open",
    createdAt: job.createdAt ? new Date(job.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: job.updatedAt ? new Date(job.updatedAt).toISOString() : new Date().toISOString(),
    postedDate: job.postedDate ? new Date(job.postedDate).toISOString() : new Date().toISOString(),
  }
}

// Get all ventures
export async function getVentures() {
  try {
    const { db } = await connectToDatabase()
    const ventures = await db.collection("ventures").find({ status: "active" }).sort({ createdAt: -1 }).toArray()

    // Convert MongoDB _id to string id for client-side use
    return ventures.map((venture) => ({
      ...venture,
      id: venture._id.toString(),
      image:
        venture.featuredImage?.url ||
        venture.image ||
        "/placeholder.svg?height=600&width=1200&text=" + encodeURIComponent(venture.name || "Venture"),
      logo:
        venture.logo?.url ||
        venture.logo ||
        "/placeholder.svg?height=120&width=120&text=" + encodeURIComponent(venture.name?.charAt(0) || "V"),
    }))
  } catch (error) {
    console.error("Error fetching ventures:", error)
    // Return fallback data
    return [
      {
        id: "1",
        slug: "techflow",
        name: "TechFlow",
        tagline: "Workflow automation reimagined",
        description:
          "A comprehensive SaaS platform that revolutionizes how teams manage workflows and automate repetitive tasks.",
        image: "/placeholder.svg?height=600&width=1200&text=TechFlow+Dashboard",
        logo: "/placeholder.svg?height=120&width=120&text=TF",
        status: "active",
      },
      {
        id: "2",
        slug: "designhub",
        name: "DesignHub",
        tagline: "Creative solutions for modern brands",
        description:
          "A full-service design agency specializing in brand identity, digital experiences, and creative campaigns.",
        image: "/placeholder.svg?height=600&width=1200&text=DesignHub+Portfolio",
        logo: "/placeholder.svg?height=120&width=120&text=DH",
        status: "active",
      },
    ]
  }
}

// Get a single venture by slug
export async function getVentureBySlug(slug) {
  try {
    const { db } = await connectToDatabase()
    const venture = await db.collection("ventures").findOne({ slug })

    if (!venture) return null

    // Convert MongoDB _id to string id for client-side use
    return {
      ...venture,
      id: venture._id.toString(),
      image:
        venture.featuredImage?.url ||
        venture.image ||
        "/placeholder.svg?height=600&width=1200&text=" + encodeURIComponent(venture.name || "Venture"),
      logo:
        venture.logo?.url ||
        venture.logo ||
        "/placeholder.svg?height=120&width=120&text=" + encodeURIComponent(venture.name?.charAt(0) || "V"),
    }
  } catch (error) {
    console.error(`Error fetching venture with slug ${slug}:`, error)
    return null
  }
}

// Get all jobs
export async function getJobs() {
  try {
    const { db } = await connectToDatabase()
    const jobs = await db.collection("jobs").find({}).toArray()

    // Convert MongoDB _id to string id for client-side use
    return jobs.map((job) => serializeJob(job))
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return []
  }
}

// Get a single job by slug
export async function getJobBySlug(slug) {
  try {
    const { db } = await connectToDatabase()

    // Try to find by slug first
    let job = await db.collection("jobs").findOne({ slug })

    // If not found, try to find by _id (in case slug is actually an ID)
    if (!job && ObjectId.isValid(slug)) {
      try {
        job = await db.collection("jobs").findOne({ _id: new ObjectId(slug) })
      } catch (err) {
        console.log("Error trying to find by ID:", err.message)
      }
    }

    return serializeJob(job)
  } catch (error) {
    console.error(`Error fetching job with slug ${slug}:`, error)
    return null
  }
}

// Get a single job by ID (for backward compatibility)
export async function getJob(id) {
  return getJobBySlug(id)
}

// Get all blog posts
export async function getBlogPosts() {
  try {
    const { db } = await connectToDatabase()

    // Try multiple collection names
    let posts = []

    try {
      posts = await db.collection("blog").find({}).sort({ publishedAt: -1, createdAt: -1 }).toArray()
    } catch (err) {
      try {
        posts = await db.collection("blog_posts").find({}).sort({ publishedAt: -1, createdAt: -1 }).toArray()
      } catch (err2) {
        console.log("No blog collections found, returning sample data")
      }
    }

    if (posts.length === 0) {
      // Return sample blog posts
      return [
        {
          id: "sample-1",
          title: "The Future of Technology: Trends to Watch",
          slug: "future-of-technology",
          excerpt:
            "Explore the latest technological trends that are shaping our future and transforming industries worldwide.",
          content:
            "Technology continues to evolve at an unprecedented pace, bringing new opportunities and challenges...",
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
          title: "Building Successful Ventures: Lessons Learned",
          slug: "building-successful-ventures",
          excerpt:
            "Key insights and strategies for building and scaling successful technology ventures in today's market.",
          content:
            "Building a successful venture requires more than just a great idea. It demands strategic planning, execution excellence, and the ability to adapt...",
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
          title: "Creating an Innovation Ecosystem",
          slug: "innovation-ecosystem",
          excerpt: "How to foster innovation within organizations and build ecosystems that drive continuous growth.",
          content:
            "Innovation doesn't happen in isolation. It thrives in environments that encourage experimentation, collaboration, and continuous learning...",
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
    }

    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title || "Untitled Post",
      slug: post.slug || post._id.toString(),
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
  } catch (error) {
    return handleDbError(
      error,
      [
        {
          id: "fallback-1",
          title: "Welcome to Our Blog",
          slug: "welcome-to-our-blog",
          excerpt:
            "Stay tuned for insights, news, and perspectives from our team on technology, innovation, and business.",
          content: "We're excited to share our thoughts and experiences with you...",
          author: {
            name: "Connected Team",
            role: "Editorial Team",
            image: "/placeholder.svg?height=40&width=40&text=CT",
          },
          publishedAt: new Date().toLocaleDateString(),
          image: "/placeholder.svg?height=400&width=600&text=Welcome+to+Our+Blog",
          tags: ["Welcome", "Blog", "Introduction"],
          category: "General",
          readTime: "3 min read",
        },
      ],
      "blog posts",
    )
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug) {
  try {
    const { db } = await connectToDatabase()

    let post = null
    try {
      post = await db.collection("blog").findOne({ slug })
    } catch (err) {
      try {
        post = await db.collection("blog_posts").findOne({ slug })
      } catch (err2) {
        console.log("No blog collections found")
      }
    }

    if (!post) return null

    return {
      id: post._id.toString(),
      title: post.title || "Untitled Post",
      slug: post.slug,
      excerpt: post.excerpt || post.shortDescription || "No excerpt available",
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
    }
  } catch (error) {
    return handleDbError(error, null, `blog post with slug ${slug}`)
  }
}

// Get all services
export async function getServices() {
  try {
    const { db } = await connectToDatabase()
    const services = await db.collection("services").find({}).toArray()

    if (services.length === 0) {
      // Return sample services
      return [
        {
          id: "1",
          slug: "web-development",
          title: "Web Development",
          description:
            "Custom web applications built with modern technologies and best practices for optimal performance.",
          image: "/placeholder.svg?height=400&width=600&text=Web+Development",
          icon: "Code",
          features: ["React & Next.js", "Node.js Backend", "Database Design", "API Development", "Responsive Design"],
        },
        {
          id: "2",
          slug: "mobile-app-development",
          title: "Mobile App Development",
          description:
            "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
          image: "/placeholder.svg?height=400&width=600&text=Mobile+App+Development",
          icon: "Smartphone",
          features: ["iOS Development", "Android Development", "React Native", "Flutter", "App Store Optimization"],
        },
        {
          id: "3",
          slug: "product-strategy",
          title: "Product Strategy",
          description:
            "Strategic planning and roadmapping for digital products to ensure market success and user satisfaction.",
          image: "/placeholder.svg?height=400&width=600&text=Product+Strategy",
          icon: "Target",
          features: [
            "Market Research",
            "User Experience Design",
            "Product Roadmapping",
            "Competitive Analysis",
            "Go-to-Market Strategy",
          ],
        },
        {
          id: "4",
          slug: "venture-building",
          title: "Venture Building",
          description: "End-to-end support for launching new ventures from ideation to market entry and scaling.",
          image: "/placeholder.svg?height=400&width=600&text=Venture+Building",
          icon: "Rocket",
          features: ["Idea Validation", "Business Model Design", "MVP Development", "Funding Support", "Team Building"],
        },
      ]
    }

    return services.map((service) => ({
      id: service._id.toString(),
      slug: service.slug || service._id.toString(),
      title: service.title || "Untitled Service",
      description: service.shortDescription || service.description || "No description available",
      image:
        service.featuredImage?.url ||
        service.image ||
        "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(service.title || "Service"),
      icon: service.icon || "Zap",
      features: service.features || [],
      price: service.price,
    }))
  } catch (error) {
    return handleDbError(
      error,
      [
        {
          id: "1",
          slug: "web-development",
          title: "Web Development",
          description: "Custom web applications built with modern technologies",
          image: "/placeholder.svg?height=400&width=600&text=Web+Development",
          icon: "Code",
          features: ["React & Next.js", "Node.js Backend", "Database Design"],
        },
      ],
      "services",
    )
  }
}

// Get a single service by slug
export async function getServiceBySlug(slug) {
  try {
    const { db } = await connectToDatabase()
    const service = await db.collection("services").findOne({ slug })
    if (!service) return null

    return {
      id: service._id.toString(),
      slug: service.slug,
      title: service.title || "Untitled Service",
      description: service.shortDescription || service.description || "No description available",
      longDescription: service.longDescription || service.description || "No detailed description available",
      image:
        service.featuredImage?.url ||
        service.image ||
        "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(service.title || "Service"),
      icon: service.icon || "Zap",
      features: service.features || [],
      benefits: service.benefits || [],
      process: service.process || [],
      pricing: service.pricing || [],
      testimonials: service.testimonials || [],
    }
  } catch (error) {
    return handleDbError(error, null, `service with slug ${slug}`)
  }
}

// Get all case studies
export async function getCaseStudies() {
  try {
    const { db } = await connectToDatabase()
    const caseStudies = await db.collection("case_studies").find({}).toArray()
    return caseStudies.map((study) => ({
      id: study._id.toString(),
      slug: study.slug || study._id.toString(),
      title: study.title || "Untitled Case Study",
      client: study.client || "Client",
      industry: study.industry || "Industry",
      image:
        study.featuredImage?.url ||
        study.image ||
        "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(study.title || "Case Study"),
      description: study.description || "No description available",
      tags: study.tags || [],
    }))
  } catch (error) {
    return handleDbError(error, [], "case studies")
  }
}

// Get a single case study by slug
export async function getCaseStudyBySlug(slug) {
  try {
    const { db } = await connectToDatabase()
    const study = await db.collection("case_studies").findOne({ slug })
    if (!study) return null

    return {
      id: study._id.toString(),
      slug: study.slug,
      title: study.title || "Untitled Case Study",
      client: study.client || "Client",
      industry: study.industry || "Industry",
      image:
        study.featuredImage?.url ||
        study.image ||
        "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(study.title || "Case Study"),
      description: study.description || "No description available",
      tags: study.tags || [],
      challenge: study.challenge || "No challenge information available",
      solution: study.solution || "No solution information available",
      outcome: study.outcome || "No outcome information available",
      testimonial: study.testimonial || null,
    }
  } catch (error) {
    return handleDbError(error, null, `case study with slug ${slug}`)
  }
}

// Get all team members
export async function getTeamMembers() {
  try {
    const { db } = await connectToDatabase()
    const teamMembers = await db.collection("team_members").find({}).toArray()
    return teamMembers.map((member) => ({
      id: member._id.toString(),
      name: member.name || "Team Member",
      role: member.role || "Team Member",
      bio: member.bio || "No bio available",
      image:
        member.image ||
        "/placeholder.svg?height=300&width=300&text=" + encodeURIComponent(member.name?.charAt(0) || "T"),
      socialLinks: member.socialLinks || {},
    }))
  } catch (error) {
    return handleDbError(error, [], "team members")
  }
}

// Get all press releases
export async function getPressReleases() {
  try {
    const { db } = await connectToDatabase()
    const pressReleases = await db.collection("press_releases").find({}).toArray()
    return pressReleases.map((release) => ({
      id: release._id.toString(),
      title: release.title || "Untitled Press Release",
      date: release.date ? new Date(release.date).toLocaleDateString() : "No date available",
      excerpt: release.excerpt || "No excerpt available",
      content: release.content || "No content available",
      category: release.category || "News",
    }))
  } catch (error) {
    return handleDbError(error, [], "press releases")
  }
}

// Get all media assets
export async function getMediaAssets() {
  try {
    const { db } = await connectToDatabase()
    const mediaAssets = await db.collection("media_assets").find({}).toArray()
    return mediaAssets.map((asset) => ({
      id: asset._id.toString(),
      title: asset.title || "Untitled Asset",
      description: asset.description || "No description available",
      url: asset.url || "#",
      type: asset.type || "Other",
    }))
  } catch (error) {
    return handleDbError(error, [], "media assets")
  }
}

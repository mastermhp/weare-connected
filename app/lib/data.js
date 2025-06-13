import { connectToDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

// Helper function to handle database errors
const handleDbError = (error, fallbackData, entityName) => {
  console.error(`Error fetching ${entityName}:`, error)
  return fallbackData
}

// Get all ventures
export async function getVentures() {
  try {
    const { db } = await connectToDatabase()
    const ventures = await db.collection("ventures").find({}).toArray()
    return ventures.map((venture) => ({
      id: venture._id.toString(),
      slug: venture.slug || venture._id.toString(),
      name: venture.name || "Untitled Venture",
      tagline: venture.tagline || "No tagline available",
      description: venture.description || "No description available",
      image: venture.image || "/placeholder.svg?height=400&width=600",
      logo: venture.logo || "/placeholder.svg?height=80&width=80",
      category: venture.category || "Technology",
      status: venture.status || "Active",
    }))
  } catch (error) {
    return handleDbError(error, [], "ventures")
  }
}

// Get a single venture by slug
export async function getVentureBySlug(slug) {
  try {
    const { db } = await connectToDatabase()
    const venture = await db.collection("ventures").findOne({ slug })
    if (!venture) return null

    return {
      id: venture._id.toString(),
      slug: venture.slug,
      name: venture.name || "Untitled Venture",
      tagline: venture.tagline || "No tagline available",
      description: venture.description || "No description available",
      fullDescription: venture.fullDescription || venture.description || "No detailed description available",
      image: venture.image || "/placeholder.svg?height=400&width=600",
      logo: venture.logo || "/placeholder.svg?height=80&width=80",
      category: venture.category || "Technology",
      status: venture.status || "Active",
      founded: venture.founded || "Recent",
      team: venture.team || [],
      website: venture.website || "#",
      metrics: venture.metrics || [],
      technologies: venture.technologies || [],
      features: venture.features || [],
    }
  } catch (error) {
    return handleDbError(error, null, `venture with slug ${slug}`)
  }
}

// Get all blog posts
export async function getBlogPosts() {
  try {
    const { db } = await connectToDatabase()
    const posts = await db.collection("blog_posts").find({}).toArray()
    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title || "Untitled Post",
      slug: post.slug || post._id.toString(),
      excerpt: post.excerpt || "No excerpt available",
      content: post.content || "No content available",
      author: post.author || { name: "Anonymous", role: "Author", image: "/placeholder.svg?height=40&width=40" },
      publishedAt: post.publishedAt || new Date().toISOString(),
      image: post.image || "/placeholder.svg?height=400&width=600",
      tags: post.tags || [],
      category: post.category || "Uncategorized",
    }))
  } catch (error) {
    return handleDbError(error, [], "blog posts")
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug) {
  try {
    const { db } = await connectToDatabase()
    const post = await db.collection("blog_posts").findOne({ slug })
    if (!post) return null

    return {
      id: post._id.toString(),
      title: post.title || "Untitled Post",
      slug: post.slug,
      excerpt: post.excerpt || "No excerpt available",
      content: post.content || "No content available",
      author: post.author || { name: "Anonymous", role: "Author", image: "/placeholder.svg?height=40&width=40" },
      publishedAt: post.publishedAt || new Date().toISOString(),
      image: post.image || "/placeholder.svg?height=400&width=600",
      tags: post.tags || [],
      category: post.category || "Uncategorized",
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
    return services.map((service) => ({
      id: service._id.toString(),
      slug: service.slug || service._id.toString(),
      title: service.title || "Untitled Service",
      description: service.description || "No description available",
      image: service.image || "/placeholder.svg?height=400&width=600",
      icon: service.icon || "Zap",
      features: service.features || [],
    }))
  } catch (error) {
    return handleDbError(error, [], "services")
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
      description: service.description || "No description available",
      longDescription: service.longDescription || service.description || "No detailed description available",
      image: service.image || "/placeholder.svg?height=400&width=600",
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
      image: study.image || "/placeholder.svg?height=400&width=600",
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
      image: study.image || "/placeholder.svg?height=400&width=600",
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

// Get all jobs
export async function getJobs() {
  try {
    const { db } = await connectToDatabase()
    const jobs = await db.collection("jobs").find({}).toArray()
    return jobs.map((job) => ({
      id: job._id.toString(),
      title: job.title || "Untitled Position",
      department: job.department || "General",
      location: job.location || "Remote",
      type: job.type || "Full-time",
      salary: job.salary || "Competitive",
      description: job.description || "No description available",
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
    }))
  } catch (error) {
    return handleDbError(error, [], "jobs")
  }
}

// Get a single job by ID
export async function getJobById(id) {
  try {
    const { db } = await connectToDatabase()
    const job = await db.collection("jobs").findOne({ _id: new ObjectId(id) })
    if (!job) return null

    return {
      id: job._id.toString(),
      title: job.title || "Untitled Position",
      department: job.department || "General",
      location: job.location || "Remote",
      type: job.type || "Full-time",
      salary: job.salary || "Competitive",
      description: job.description || "No description available",
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      benefits: job.benefits || [],
    }
  } catch (error) {
    return handleDbError(error, null, `job with id ${id}`)
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
      image: member.image || "/placeholder.svg?height=300&width=300",
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

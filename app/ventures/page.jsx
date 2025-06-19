import { getVentures } from "../lib/data"
import VenturesClientPage from "./ventures-client"

export const metadata = {
  title: "Our Ventures | Connected",
  description:
    "Discover the innovative companies and projects we've built and nurtured across tech, digital, and lifestyle industries.",
}

// Helper function to serialize MongoDB data for client components
function serializeVentures(ventures) {
  return ventures.map((venture) => ({
    id: venture._id?.toString() || venture.id || Math.random().toString(),
    slug:
      venture.slug ||
      venture.name
        ?.toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-") ||
      "venture",
    name: venture.name || "Untitled Venture",
    tagline: venture.tagline || venture.description?.substring(0, 50) + "..." || "Innovative solutions",
    description: venture.description || "No description available",
    category: venture.category || venture.industry || "Technology",
    status: venture.status || "Active",
    founded: venture.foundedYear?.toString() || venture.year?.toString() || "2023",
    team: venture.teamSize ? `${venture.teamSize} people` : venture.teamMembers || "Team",
    growth: venture.growth || "+100% YoY",
    image:
      venture.featuredImage?.url ||
      venture.image ||
      "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(venture.name || "Venture"),
    website: venture.website || "#",
    // Convert any remaining complex objects to simple values
    createdAt: venture.createdAt ? new Date(venture.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: venture.updatedAt ? new Date(venture.updatedAt).toISOString() : new Date().toISOString(),
  }))
}

export default async function VenturesPage() {
  // Fetch real ventures data from database
  const rawVentures = await getVentures()

  // Serialize the data to remove complex objects
  const ventures = serializeVentures(rawVentures)

  return <VenturesClientPage ventures={ventures} />
}

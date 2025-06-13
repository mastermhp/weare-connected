import { getVentures, getServices, getCaseStudies, getTeamMembers } from "@/app/lib/data"

export async function GET() {
  try {
    // Fetch all data needed for the homepage
    const ventures = await getVentures()
    const services = await getServices()
    const caseStudies = await getCaseStudies()
    const teamMembers = await getTeamMembers()

    // Select featured items
    const featuredVentures = ventures.slice(0, 3)

    // Hero section data
    const heroData = {
      title: "Building the Future of Technology",
      subtitle: "We create, invest in, and scale innovative ventures that solve meaningful problems.",
      stats: [
        { value: ventures.length > 0 ? `${ventures.length}+` : "50+", label: "Ventures Launched" },
        { value: "$100M+", label: "Capital Raised" },
        { value: "500+", label: "Jobs Created" },
        { value: "12", label: "Countries" },
      ],
    }

    // About section data
    const aboutData = {
      title: "About Connected",
      description:
        "Connected is a venture studio that builds, invests in, and scales technology companies. We combine capital, talent, and expertise to create ventures that solve meaningful problems and generate exceptional returns.",
      metrics: [
        { value: "2018", label: "Founded" },
        { value: teamMembers.length > 0 ? `${teamMembers.length}+` : "85+", label: "Team Members" },
        { value: "3", label: "Global Offices" },
      ],
    }

    // Prepare the response data
    const data = {
      heroData,
      aboutData,
      featuredVentures,
      services: services.slice(0, 4),
      caseStudies: caseStudies.slice(0, 2),
    }

    return Response.json(data)
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    return Response.json({ error: "Failed to fetch homepage data" }, { status: 500 })
  }
}

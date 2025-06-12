import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, TrendingUp, Calendar, ExternalLink } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"


export const metadata = {
  title: "Our Ventures - Connected",
  description:
    "Discover the innovative companies and projects we've built and nurtured across tech, digital, and lifestyle industries.",
}

const ventures = [
  {
    id: "techflow",
    name: "TechFlow",
    tagline: "Workflow automation reimagined",
    description:
      "A comprehensive SaaS platform that revolutionizes how teams manage workflows and automate repetitive tasks.",
    category: "SaaS",
    status: "Active",
    founded: "2022",
    team: "12 people",
    growth: "+150% YoY",
    image: "/placeholder.svg?height=400&width=600&text=TechFlow+Dashboard",
    logo: "/placeholder.svg?height=80&width=80&text=TF",
    metrics: [
      { label: "Active Users", value: "10K+" },
      { label: "Projects", value: "50K+" },
      { label: "Time Saved", value: "2M+ hrs" },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    website: "https://techflow.com",
  },
  {
    id: "designhub",
    name: "DesignHub",
    tagline: "Creative solutions for modern brands",
    description:
      "A full-service design agency specializing in brand identity, digital experiences, and creative campaigns.",
    category: "Agency",
    status: "Active",
    founded: "2021",
    team: "8 people",
    growth: "+85% YoY",
    image: "/placeholder.svg?height=400&width=600&text=DesignHub+Portfolio",
    logo: "/placeholder.svg?height=80&width=80&text=DH",
    metrics: [
      { label: "Clients", value: "200+" },
      { label: "Projects", value: "500+" },
      { label: "Satisfaction", value: "4.9/5" },
    ],
    technologies: ["Figma", "Adobe CC", "Webflow", "Framer"],
    website: "https://designhub.com",
  },
  {
    id: "marketpulse",
    name: "MarketPulse",
    tagline: "Data-driven marketing intelligence",
    description:
      "Advanced analytics platform providing real-time market insights and competitive intelligence for businesses.",
    category: "Analytics",
    status: "Active",
    founded: "2023",
    team: "6 people",
    growth: "+200% YoY",
    image: "/placeholder.svg?height=400&width=600&text=MarketPulse+Analytics",
    logo: "/placeholder.svg?height=80&width=80&text=MP",
    metrics: [
      { label: "Data Points", value: "1B+" },
      { label: "Reports", value: "10K+" },
      { label: "Accuracy", value: "95%" },
    ],
    technologies: ["Python", "TensorFlow", "BigQuery", "React"],
    website: "https://marketpulse.com",
  },
  {
    id: "ecolife",
    name: "EcoLife",
    tagline: "Sustainable living made simple",
    description:
      "A lifestyle platform connecting eco-conscious consumers with sustainable products and green living solutions.",
    category: "Lifestyle",
    status: "Beta",
    founded: "2024",
    team: "4 people",
    growth: "New",
    image: "/placeholder.svg?height=400&width=600&text=EcoLife+App",
    logo: "/placeholder.svg?height=80&width=80&text=EL",
    metrics: [
      { label: "Beta Users", value: "1K+" },
      { label: "Products", value: "500+" },
      { label: "CO2 Saved", value: "10T" },
    ],
    technologies: ["React Native", "Firebase", "Stripe", "Node.js"],
    website: "https://ecolife.com",
  },
]

export default function VenturesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-syne">Our Ventures</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover the innovative companies and projects we've built and nurtured across tech, digital, and
                lifestyle industries.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="outline" className="px-4 py-2">
                  4 Active Ventures
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  30+ Team Members
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  $2M+ Revenue
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Ventures Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid gap-8">
              {ventures.map((venture, index) => (
                <Card
                  key={venture.id}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    <div className={`aspect-video lg:aspect-auto relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <Image
                        src={venture.image || "/placeholder.svg"}
                        alt={venture.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={venture.logo || "/placeholder.svg"}
                            alt={`${venture.name} logo`}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={venture.status === "Active" ? "default" : "secondary"}>
                              {venture.status}
                            </Badge>
                            <Badge variant="outline">{venture.category}</Badge>
                          </div>
                          <h3 className="text-2xl font-bold font-syne">{venture.name}</h3>
                          <p className="text-sm text-muted-foreground">{venture.tagline}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6">{venture.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {venture.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-lg font-bold text-primary">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Founded {venture.founded}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{venture.team}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{venture.growth}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {venture.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button asChild>
                          <Link href={`/ventures/${venture.id}`}>
                            Learn More <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={venture.website} target="_blank" rel="noopener noreferrer">
                            Visit Site <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-syne">Ready to Build the Next Big Thing?</h2>
            <p className="text-xl mb-8 opacity-90">Join us in creating innovative solutions that make a real impact.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/careers">Join Our Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

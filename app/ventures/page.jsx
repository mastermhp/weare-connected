import { getVentures } from "../lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Users, TrendingUp, ExternalLink } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

export const metadata = {
  title: "Our Ventures | Connected",
  description:
    "Discover the innovative companies and projects we've built and nurtured across tech, digital, and lifestyle industries.",
}

export default async function VenturesPage() {
  // Fetch ventures data
  const ventures = await getVentures()

  // Stats data - you can make this dynamic later
  const stats = [
    { label: "Active Ventures", value: "4" },
    { label: "Team Members", value: "30+" },
    { label: "Revenue", value: "$2M+" },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-20 bg-gradient-to-br from-purple-100 via-purple-50 to-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Our Ventures</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover the innovative companies and projects we've built and nurtured across tech, digital, and
                lifestyle industries.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ventures Section */}
        <section className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="space-y-16">
              {ventures.length > 0 ? (
                ventures.map((venture, index) => (
                  <div key={venture.id} className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                        {venture.featuredImage?.url || venture.image ? (
                          <Image
                            src={venture.featuredImage?.url || venture.image}
                            alt={venture.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <div className="text-gray-400 text-6xl">📷</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      {/* Badges */}
                      <div className="flex gap-3">
                        <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1">
                          {venture.status || "Active"}
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                          {venture.industry || venture.category || "SaaS"}
                        </Badge>
                      </div>

                      {/* Title and Tagline */}
                      <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">{venture.name}</h2>
                        <p className="text-xl text-gray-600">{venture.tagline || venture.shortDescription}</p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">{venture.description}</p>

                      {/* Metrics */}
                      {venture.metrics && venture.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-6">
                          {venture.metrics.slice(0, 3).map((metric, metricIndex) => (
                            <div key={metricIndex} className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{metric.value}</div>
                              <div className="text-sm text-gray-600">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                        {venture.foundedYear && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Founded {venture.foundedYear}</span>
                          </div>
                        )}
                        {venture.teamSize && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{venture.teamSize} people</span>
                          </div>
                        )}
                        {venture.growth && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            <span>{venture.growth}</span>
                          </div>
                        )}
                      </div>

                      {/* Technologies */}
                      {venture.technologies && venture.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {venture.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Buttons */}
                      <div className="flex gap-4">
                        <Button asChild className="bg-purple-600 hover:bg-purple-700">
                          <Link href={`/ventures/${venture.slug}`}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        {venture.website && (
                          <Button variant="outline" asChild>
                            <a href={venture.website} target="_blank" rel="noopener noreferrer">
                              Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-gray-600">No ventures found. Check back soon for updates!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

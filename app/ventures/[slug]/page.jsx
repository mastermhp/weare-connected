import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Users, Calendar, TrendingUp, Target, Zap, Award } from "lucide-react"
import Footer from "@/app/components/footer"
import { getVentureBySlug, getVentures } from "@/app/lib/data"
import Header from "@/app/components/header"

export async function generateStaticParams() {
  const ventures = await getVentures()
  return ventures.map((venture) => ({
    slug: venture.slug,
  }))
}

export async function generateMetadata({ params }) {
  const venture = await getVentureBySlug(params.slug)

  if (!venture) {
    return {
      title: "Venture Not Found",
    }
  }

  return {
    title: `${venture.name} - ${venture.tagline || venture.shortDescription} | Connected`,
    description: venture.description,
  }
}

export default async function VentureDetailPage({ params }) {
  const venture = await getVentureBySlug(params.slug)

  if (!venture) {
    notFound()
  }

  // Map icon components to metric icons
  const iconMap = {
    Users: Users,
    Target: Target,
    Zap: Zap,
    Award: Award,
    TrendingUp: TrendingUp,
    Calendar: Calendar,
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6 mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
                <Link href="/ventures">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Ventures
                </Link>
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Content */}
              <div className="space-y-8">
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
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">{venture.name}</h1>
                  <p className="text-2xl text-gray-600">{venture.tagline || venture.shortDescription}</p>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-600 leading-relaxed">
                  {venture.fullDescription || venture.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-8 text-gray-600">
                  {venture.foundedYear && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>Founded {venture.foundedYear}</span>
                    </div>
                  )}
                  {venture.teamSize && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>{venture.teamSize} people</span>
                    </div>
                  )}
                  {venture.growth && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>{venture.growth}</span>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  {venture.website && (
                    <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                      <a href={venture.website} target="_blank" rel="noopener noreferrer">
                        Visit Website <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
                {venture.featuredImage?.url || venture.image ? (
                  <Image
                    src={venture.featuredImage?.url || venture.image}
                    alt={venture.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-gray-400 text-8xl">📷</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Section */}
        {venture.metrics && venture.metrics.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Key Metrics</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {venture.metrics.map((metric, index) => {
                  const IconComponent = iconMap[metric.icon] || Target
                  return (
                    <div key={index} className="text-center">
                      <div className="mb-4">
                        <IconComponent className="h-12 w-12 text-purple-600 mx-auto" />
                      </div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">{metric.value}</div>
                      <div className="text-gray-600">{metric.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {venture.features && venture.features.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="grid lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-4xl font-bold mb-8 text-gray-900">Key Features</h2>
                  <div className="space-y-4">
                    {venture.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {venture.technologies && venture.technologies.length > 0 && (
                  <div>
                    <h2 className="text-4xl font-bold mb-8 text-gray-900">Technology Stack</h2>
                    <div className="flex flex-wrap gap-3">
                      {venture.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="px-4 py-2 text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {venture.testimonials && venture.testimonials.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">What Our Users Say</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {venture.testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-none shadow-lg">
                    <CardContent className="p-8">
                      <p className="text-lg mb-6 italic text-gray-700">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src={testimonial.image || "/placeholder.svg?height=60&width=60"}
                            alt={testimonial.author}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.author}</div>
                          <div className="text-sm text-gray-600">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-purple-600 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Interested in {venture.name}?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get in touch to learn more about our venture or explore partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              {venture.website && (
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <a href={venture.website} target="_blank" rel="noopener noreferrer">
                    Visit {venture.name}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

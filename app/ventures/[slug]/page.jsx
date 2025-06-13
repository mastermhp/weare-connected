import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Users, Calendar, TrendingUp, Award, Target, Zap } from "lucide-react"
import Footer from "@/app/components/footer"
import { getVenture, getVentures } from "@/app/lib/data"
import Header from "@/app/components/header"

export async function generateStaticParams() {
  const ventures = await getVentures()
  return ventures.map((venture) => ({
    slug: venture.slug,
  }))
}

export async function generateMetadata({ params }) {
  const venture = await getVenture(params.slug)

  if (!venture) {
    return {
      title: "Venture Not Found",
    }
  }

  return {
    title: `${venture.name} - ${venture.tagline} | Connected`,
    description: venture.description,
  }
}

export default async function VentureDetailPage({ params }) {
  const venture = await getVenture(params.slug)

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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Button variant="ghost" asChild>
                <Link href="/ventures">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Ventures
                </Link>
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20">
                    <Image
                      src={venture.logo || "/placeholder.svg?height=120&width=120"}
                      alt={`${venture.name} logo`}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={venture.status === "Active" ? "default" : "secondary"}>{venture.status}</Badge>
                      <Badge variant="outline">{venture.category}</Badge>
                    </div>
                    <h1 className="text-4xl font-bold text-primary font-syne">{venture.name}</h1>
                    <p className="text-xl text-muted-foreground">{venture.tagline}</p>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8">{venture.fullDescription}</p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Founded {venture.founded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{venture.team}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>{venture.growth}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild>
                    <a href={venture.website} target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={venture.image || "/placeholder.svg?height=600&width=1200"}
                  alt={venture.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 font-syne">Key Metrics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {venture.metrics &&
                venture.metrics.map((metric, index) => {
                  const IconComponent = iconMap[metric.icon] || Target
                  return (
                    <Card key={index} className="text-center border-none shadow-sm">
                      <CardContent className="p-6">
                        <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />
                        <div className="text-2xl font-bold text-primary mb-2">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-lynx-white">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-syne">Key Features</h2>
                <div className="space-y-4">
                  {venture.features &&
                    venture.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 font-syne">Technology Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {venture.technologies &&
                    venture.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 font-syne">Achievements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {venture.achievements &&
                venture.achievements.map((achievement, index) => (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-1" />
                        <span>{achievement}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {venture.testimonials && venture.testimonials.length > 0 && (
          <section className="py-20 bg-lynx-white">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold text-center mb-12 font-syne">What Our Users Say</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {venture.testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={testimonial.image || "/placeholder.svg?height=60&width=60"}
                            alt={testimonial.author}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">
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
        <section className="py-20 bg-primary text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-syne">Interested in {venture.name}?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get in touch to learn more about our venture or explore partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <a href={venture.website} target="_blank" rel="noopener noreferrer">
                  Visit {venture.name}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

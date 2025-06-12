import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Users, Calendar, TrendingUp, Award, Target, Zap } from "lucide-react"
import Footer from "@/app/components/footer"
import Header from "@/app/components/header"

const ventureData = {
  techflow: {
    id: "techflow",
    name: "TechFlow",
    tagline: "Workflow automation reimagined",
    description:
      "A comprehensive SaaS platform that revolutionizes how teams manage workflows and automate repetitive tasks.",
    fullDescription:
      "TechFlow was born from the frustration of managing complex workflows across multiple tools. Our platform provides a unified solution that integrates with your existing tools while offering powerful automation capabilities. With an intuitive drag-and-drop interface and advanced analytics, teams can streamline their processes and focus on what matters most.",
    category: "SaaS",
    status: "Active",
    founded: "2022",
    team: "12 people",
    growth: "+150% YoY",
    image: "/placeholder.svg?height=600&width=1200&text=TechFlow+Dashboard",
    logo: "/placeholder.svg?height=120&width=120&text=TF",
    website: "https://techflow.com",
    metrics: [
      { label: "Active Users", value: "10,000+", icon: Users },
      { label: "Projects Managed", value: "50,000+", icon: Target },
      { label: "Time Saved", value: "2M+ hours", icon: Zap },
      { label: "Customer Satisfaction", value: "4.8/5", icon: Award },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker", "Redis", "TypeScript", "GraphQL"],
    features: [
      "Drag-and-drop workflow builder",
      "Real-time collaboration",
      "Advanced analytics and reporting",
      "Integration with 100+ tools",
      "Custom automation rules",
      "Mobile app for iOS and Android",
    ],
    achievements: [
      "Featured in TechCrunch as 'Startup to Watch'",
      "Winner of SaaS Innovation Award 2023",
      "Reached 10,000 active users in 18 months",
      "Secured $2M in Series A funding",
    ],
    testimonials: [
      {
        quote:
          "TechFlow has transformed how our team works. We've reduced manual work by 70% and improved our delivery time significantly.",
        author: "Sarah Johnson",
        role: "Product Manager",
        company: "InnovateCorp",
        image: "/placeholder.svg?height=60&width=60&text=SJ",
      },
      {
        quote:
          "The automation capabilities are incredible. What used to take hours now happens automatically in minutes.",
        author: "Michael Chen",
        role: "Operations Director",
        company: "ScaleUp Inc",
        image: "/placeholder.svg?height=60&width=60&text=MC",
      },
    ],
  },
  designhub: {
    id: "designhub",
    name: "DesignHub",
    tagline: "Creative solutions for modern brands",
    description:
      "A full-service design agency specializing in brand identity, digital experiences, and creative campaigns.",
    fullDescription:
      "DesignHub combines strategic thinking with creative excellence to help brands stand out in today's competitive landscape. Our team of designers, strategists, and developers work collaboratively to create cohesive brand experiences that resonate with audiences and drive business results.",
    category: "Agency",
    status: "Active",
    founded: "2021",
    team: "8 people",
    growth: "+85% YoY",
    image: "/placeholder.svg?height=600&width=1200&text=DesignHub+Portfolio",
    logo: "/placeholder.svg?height=120&width=120&text=DH",
    website: "https://designhub.com",
    metrics: [
      { label: "Happy Clients", value: "200+", icon: Users },
      { label: "Projects Completed", value: "500+", icon: Target },
      { label: "Awards Won", value: "15", icon: Award },
      { label: "Client Satisfaction", value: "4.9/5", icon: Zap },
    ],
    technologies: ["Figma", "Adobe Creative Suite", "Webflow", "Framer", "Sketch", "Principle", "After Effects"],
    features: [
      "Brand identity design",
      "Website and app design",
      "Marketing campaigns",
      "Packaging design",
      "Motion graphics",
      "Design system creation",
    ],
    achievements: [
      "Awwwards Site of the Day (3 times)",
      "Dribbble Team of the Year 2023",
      "Featured in Design Week Magazine",
      "Helped 50+ startups establish their brand identity",
    ],
    testimonials: [
      {
        quote:
          "DesignHub created a brand identity that perfectly captures our vision. The attention to detail is exceptional.",
        author: "Emily Rodriguez",
        role: "CEO",
        company: "GreenTech Solutions",
        image: "/placeholder.svg?height=60&width=60&text=ER",
      },
    ],
  },
  marketpulse: {
    id: "marketpulse",
    name: "MarketPulse",
    tagline: "Data-driven marketing intelligence",
    description:
      "Advanced analytics platform providing real-time market insights and competitive intelligence for businesses.",
    fullDescription:
      "MarketPulse leverages artificial intelligence and machine learning to analyze vast amounts of market data, providing businesses with actionable insights to make informed decisions. Our platform tracks competitor activities, market trends, and consumer behavior to give you a competitive edge.",
    category: "Analytics",
    status: "Active",
    founded: "2023",
    team: "6 people",
    growth: "+200% YoY",
    image: "/placeholder.svg?height=600&width=1200&text=MarketPulse+Analytics",
    logo: "/placeholder.svg?height=120&width=120&text=MP",
    website: "https://marketpulse.com",
    metrics: [
      { label: "Data Points Analyzed", value: "1B+", icon: Target },
      { label: "Reports Generated", value: "10,000+", icon: Zap },
      { label: "Prediction Accuracy", value: "95%", icon: Award },
      { label: "Enterprise Clients", value: "50+", icon: Users },
    ],
    technologies: ["Python", "TensorFlow", "BigQuery", "React", "D3.js", "Apache Kafka", "Elasticsearch"],
    features: [
      "Real-time market monitoring",
      "Competitor analysis",
      "Trend prediction",
      "Custom dashboards",
      "API integrations",
      "Automated reporting",
    ],
    achievements: [
      "Processed over 1 billion data points",
      "Achieved 95% prediction accuracy",
      "Helped clients increase ROI by 40% on average",
      "Featured in Forbes as 'AI Company to Watch'",
    ],
    testimonials: [
      {
        quote: "MarketPulse gives us insights we never had before. It's like having a crystal ball for market trends.",
        author: "David Park",
        role: "CMO",
        company: "RetailMax",
        image: "/placeholder.svg?height=60&width=60&text=DP",
      },
    ],
  },
  ecolife: {
    id: "ecolife",
    name: "EcoLife",
    tagline: "Sustainable living made simple",
    description:
      "A lifestyle platform connecting eco-conscious consumers with sustainable products and green living solutions.",
    fullDescription:
      "EcoLife is on a mission to make sustainable living accessible and enjoyable for everyone. Our platform curates eco-friendly products, provides sustainability tips, and connects like-minded individuals who care about the environment. We believe that small changes can make a big impact.",
    category: "Lifestyle",
    status: "Beta",
    founded: "2024",
    team: "4 people",
    growth: "New",
    image: "/placeholder.svg?height=600&width=1200&text=EcoLife+App",
    logo: "/placeholder.svg?height=120&width=120&text=EL",
    website: "https://ecolife.com",
    metrics: [
      { label: "Beta Users", value: "1,000+", icon: Users },
      { label: "Eco Products", value: "500+", icon: Target },
      { label: "CO2 Saved", value: "10 Tons", icon: Zap },
      { label: "Partner Brands", value: "25", icon: Award },
    ],
    technologies: ["React Native", "Firebase", "Stripe", "Node.js", "MongoDB", "AWS"],
    features: [
      "Curated eco-friendly products",
      "Sustainability tracking",
      "Community challenges",
      "Carbon footprint calculator",
      "Educational content",
      "Reward system",
    ],
    achievements: [
      "1,000+ beta users in first month",
      "Partnership with 25 sustainable brands",
      "Featured in Sustainability Today",
      "Helped users save 10 tons of CO2",
    ],
    testimonials: [
      {
        quote: "EcoLife makes it so easy to find sustainable alternatives. I love the community aspect too!",
        author: "Alex Wong",
        role: "Environmental Advocate",
        company: "GreenFuture",
        image: "/placeholder.svg?height=60&width=60&text=AW",
      },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(ventureData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }) {
  const venture = ventureData[params.slug]

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

export default function VentureDetailPage({ params }) {
  const venture = ventureData[params.slug]

  if (!venture) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
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
                      src={venture.logo || "/placeholder.svg"}
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
                <Image src={venture.image || "/placeholder.svg"} alt={venture.name} fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 font-syne">Key Metrics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {venture.metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <Card key={index} className="text-center border-none shadow-sm">
                    <CardContent className="p-6">
                      <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
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
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-syne">Key Features</h2>
                <div className="space-y-4">
                  {venture.features.map((feature, index) => (
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
                  {venture.technologies.map((tech) => (
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
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 font-syne">Achievements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {venture.achievements.map((achievement, index) => (
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
        <section className="py-20 bg-lynx-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 font-syne">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {venture.testimonials.map((testimonial, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
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

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
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

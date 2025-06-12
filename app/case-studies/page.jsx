import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Users, DollarSign, Clock } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import Image from "next/image"

export const metadata = {
  title: "Case Studies | Connected",
  description: "Discover how Connected has helped businesses scale and achieve transformative growth.",
}

const caseStudies = [
  {
    id: "fintech-startup",
    title: "FinTech Startup Scales to $50M Valuation",
    client: "PayFlow Technologies",
    industry: "Financial Technology",
    duration: "18 months",
    investment: "$2.5M",
    results: {
      revenue: "400% increase",
      users: "100K+ active users",
      valuation: "$50M Series A",
    },
    image: "/fintech-logo.png",
    description:
      "How we helped a payment processing startup scale from MVP to market leader through strategic investment and business development.",
    tags: ["FinTech", "Series A", "B2B SaaS"],
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform Achieves Market Leadership",
    client: "ShopSmart Solutions",
    industry: "E-commerce",
    duration: "24 months",
    investment: "$5M",
    results: {
      revenue: "600% growth",
      users: "500K+ merchants",
      valuation: "$120M Series B",
    },
    image: "/ecommerce-logo.png",
    description:
      "Transforming a small e-commerce tool into a comprehensive platform serving hundreds of thousands of merchants worldwide.",
    tags: ["E-commerce", "Series B", "Platform"],
  },
  {
    id: "healthtech-innovation",
    title: "HealthTech Innovation Improves Patient Outcomes",
    client: "MedConnect Pro",
    industry: "Healthcare Technology",
    duration: "30 months",
    investment: "$8M",
    results: {
      revenue: "300% increase",
      users: "50K+ healthcare providers",
      valuation: "$200M Series C",
    },
    image: "/healthtech-logo.png",
    description:
      "Revolutionizing healthcare delivery through innovative technology that connects patients with healthcare providers seamlessly.",
    tags: ["HealthTech", "Series C", "B2B"],
  },
  {
    id: "edtech-platform",
    title: "EdTech Platform Transforms Online Learning",
    client: "LearnForward",
    industry: "Education Technology",
    duration: "20 months",
    investment: "$3.5M",
    results: {
      revenue: "500% growth",
      users: "1M+ students",
      valuation: "$75M Series A",
    },
    image: "/edtech-logo.png",
    description:
      "Building the future of education with an AI-powered learning platform that adapts to individual student needs.",
    tags: ["EdTech", "AI", "B2C"],
  },
  {
    id: "cleantech-startup",
    title: "CleanTech Startup Drives Sustainability",
    client: "GreenEnergy Solutions",
    industry: "Clean Technology",
    duration: "36 months",
    investment: "$12M",
    results: {
      revenue: "800% increase",
      users: "10K+ businesses",
      valuation: "$300M Series B",
    },
    image: "/cleantech-logo.png",
    description:
      "Accelerating the transition to renewable energy with innovative solutions that make clean energy accessible to businesses of all sizes.",
    tags: ["CleanTech", "Sustainability", "B2B"],
  },
  {
    id: "ai-startup",
    title: "AI Startup Revolutionizes Data Analytics",
    client: "DataMind AI",
    industry: "Artificial Intelligence",
    duration: "15 months",
    investment: "$4M",
    results: {
      revenue: "700% growth",
      users: "25K+ data scientists",
      valuation: "$90M Series A",
    },
    image: "/ai-logo.png",
    description:
      "Democratizing advanced data analytics with AI-powered tools that make complex analysis accessible to non-technical users.",
    tags: ["AI", "Analytics", "B2B SaaS"],
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-syne">Case Studies</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover how Connected has helped businesses scale and achieve transformative growth through strategic
                investment, innovation, and partnership.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Portfolio Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">$500M+</div>
                <div className="text-muted-foreground">Total Valuation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2M+</div>
                <div className="text-muted-foreground">Users Impacted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 bg-lynx-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real results from real partnerships. See how we've helped companies across various industries achieve
                remarkable growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Card key={study.id} className="hover:shadow-lg transition-all duration-300 border-none">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Image
                          src={study.image || "/placeholder.svg?height=48&width=48"}
                          alt={study.client}
                          width={32}
                          height={32}
                          className="rounded"
                        />
                      </div>
                      <Badge variant="outline">{study.industry}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{study.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span>{study.results.revenue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{study.results.users}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span>{study.results.valuation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{study.duration}</span>
                      </div>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/case-studies/${study.id}`}>
                        Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-syne">Our Proven Process</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                How we work with portfolio companies to achieve exceptional results.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Assessment",
                  description: "Deep dive into business model, market opportunity, and growth potential.",
                },
                {
                  step: "02",
                  title: "Strategy",
                  description: "Develop comprehensive growth strategy aligned with market dynamics.",
                },
                {
                  step: "03",
                  title: "Execution",
                  description: "Implement strategic initiatives with hands-on support and resources.",
                },
                {
                  step: "04",
                  title: "Scale",
                  description: "Accelerate growth through partnerships, funding, and market expansion.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-syne">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our portfolio of successful companies and let us help you achieve transformative growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Start Your Journey</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/ventures">View Our Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

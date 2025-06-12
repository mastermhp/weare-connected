import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Calendar, Users, Award, TrendingUp } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

export const metadata = {
  title: "Press Kit | Connected",
  description: "Media resources, company information, and press materials for Connected.",
}

const pressReleases = [
  {
    title: "Connected Announces $50M Series B Funding Round",
    date: "June 1, 2024",
    excerpt: "Funding will accelerate expansion of innovation ecosystem and support for portfolio companies.",
    category: "Funding",
  },
  {
    title: "Connected Portfolio Company TechFlow Reaches $50M Valuation",
    date: "May 15, 2024",
    excerpt: "Workflow automation platform achieves major milestone with Series A funding.",
    category: "Portfolio",
  },
  {
    title: "Connected Named 'Innovation Hub of the Year' by Tech Awards",
    date: "April 20, 2024",
    excerpt: "Recognition highlights Connected's impact on startup ecosystem and innovation.",
    category: "Awards",
  },
  {
    title: "Connected Launches Sustainability Initiative for Portfolio Companies",
    date: "March 10, 2024",
    excerpt: "New program helps startups integrate sustainable practices from day one.",
    category: "Sustainability",
  },
]

const mediaAssets = [
  {
    title: "Company Logos",
    description: "High-resolution logos in various formats",
    items: ["PNG", "SVG", "EPS"],
    size: "2.5 MB",
  },
  {
    title: "Executive Photos",
    description: "Professional headshots of leadership team",
    items: ["High-res", "Web-ready", "Black & white"],
    size: "15 MB",
  },
  {
    title: "Product Screenshots",
    description: "Screenshots of our platform and services",
    items: ["Dashboard", "Analytics", "Mobile app"],
    size: "8 MB",
  },
  {
    title: "Brand Guidelines",
    description: "Complete brand identity guidelines",
    items: ["Colors", "Typography", "Usage rules"],
    size: "5 MB",
  },
]

const keyStats = [
  { label: "Portfolio Companies", value: "25+", icon: TrendingUp },
  { label: "Total Funding Raised", value: "$500M+", icon: Award },
  { label: "Team Members", value: "75+", icon: Users },
  { label: "Years in Operation", value: "4+", icon: Calendar },
]

export default function PressKitPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-syne">Press Kit</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Media resources, company information, and press materials for journalists, partners, and stakeholders.
              </p>
              <Button size="lg" asChild>
                <a href="/press-kit-download.zip" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Complete Press Kit
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-syne">About Connected</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Connected is a leading innovation and technology company that bridges the gap between groundbreaking
                    ideas and market-ready solutions. Founded in 2020, we specialize in building, investing in, and
                    scaling technology ventures across multiple industries.
                  </p>
                  <p>
                    Our mission is to empower entrepreneurs and businesses with the resources, expertise, and
                    connections they need to transform innovative ideas into successful ventures that create lasting
                    impact.
                  </p>
                  <p>
                    With a portfolio of 25+ companies and over $500M in total funding raised, Connected has established
                    itself as a key player in the startup ecosystem, helping companies scale from MVP to market leaders.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=1200&text=Connected+Office"
                  alt="Connected Office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-20 bg-lynx-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Key Statistics</h2>
              <p className="text-xl text-muted-foreground">Numbers that showcase our impact and growth</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {keyStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="text-center border-none shadow-sm">
                    <CardContent className="p-6">
                      <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recent Press Releases */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Recent Press Releases</h2>
              <p className="text-xl text-muted-foreground">Latest news and announcements from Connected</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{release.category}</Badge>
                          <span className="text-sm text-muted-foreground">{release.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                          {release.title}
                        </h3>
                        <p className="text-muted-foreground">{release.excerpt}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground ml-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">
                View All Press Releases <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="py-20 bg-lynx-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Media Assets</h2>
              <p className="text-xl text-muted-foreground">High-quality assets for media coverage and partnerships</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaAssets.map((asset, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{asset.title}</CardTitle>
                    <CardDescription>{asset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {asset.items.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{asset.size}</span>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Leadership Team</h2>
              <p className="text-xl text-muted-foreground">Meet the executives leading Connected's vision</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO & Founder",
                  bio: "Former tech executive with 15+ years of experience in scaling startups and building innovation ecosystems.",
                  image: "/placeholder.svg?height=300&width=300&text=SJ",
                },
                {
                  name: "Michael Chen",
                  role: "CTO",
                  bio: "Technology innovator with expertise in AI, machine learning, and software architecture.",
                  image: "/placeholder.svg?height=300&width=300&text=MC",
                },
                {
                  name: "Emily Rodriguez",
                  role: "COO",
                  bio: "Operations expert specializing in business development and strategic partnerships.",
                  image: "/placeholder.svg?height=300&width=300&text=ER",
                },
              ].map((member, index) => (
                <Card key={index} className="border-none shadow-sm overflow-hidden">
                  <div className="relative h-64">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-lynx-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Media Contact</h2>
              <p className="text-xl text-muted-foreground">For press inquiries and media requests</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Press Relations</h3>
                      <p className="text-muted-foreground">
                        For all media inquiries, interview requests, and press-related questions
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <strong>Email:</strong> press@connected.com
                      </p>
                      <p>
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </p>
                      <p>
                        <strong>Response Time:</strong> Within 24 hours
                      </p>
                    </div>
                    <div className="pt-4">
                      <Button asChild>
                        <Link href="mailto:press@connected.com">Contact Press Team</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-syne">Usage Guidelines</h2>
              <p className="text-xl text-muted-foreground">
                Please follow these guidelines when using our brand assets
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-green-600">Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Use our official logos and brand colors</li>
                    <li>• Maintain proper spacing around logos</li>
                    <li>• Use high-resolution images for print</li>
                    <li>• Credit Connected in all media coverage</li>
                    <li>• Contact us for approval of major usage</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-red-600">Don't</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Modify or distort our logos</li>
                    <li>• Use outdated brand assets</li>
                    <li>• Place logos on busy backgrounds</li>
                    <li>• Use our brand for endorsements</li>
                    <li>• Combine our logo with other brands</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

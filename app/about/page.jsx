import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Award, Target, TrendingUp } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

export const metadata = {
  title: "About Us | Connected",
  description: "Learn about Connected's mission, vision, and the team behind our innovation.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-syne">Our Story</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Connected was founded in 2020 with a simple mission: to bridge the gap between innovative ideas and
                  market-ready solutions. We believe in the power of technology to transform industries and improve
                  lives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="/ventures">
                      Explore Our Ventures <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=1200&text=Team+Photo"
                  alt="Connected Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-syne">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  To empower entrepreneurs and businesses with the resources, expertise, and connections they need to
                  transform innovative ideas into successful ventures that create lasting impact.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 font-syne">Our Vision</h2>
                <p className="text-lg text-muted-foreground">
                  To build an ecosystem where innovation thrives, where barriers to entrepreneurship are removed, and
                  where technology serves as a force for positive change in society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-lynx-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-syne">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do and define our company culture.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                      <path d="M5 3v4"></path>
                      <path d="M19 17v4"></path>
                      <path d="M3 5h4"></path>
                      <path d="M17 19h4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We embrace new ideas and technologies to solve complex problems and create meaningful impact.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                  <p className="text-muted-foreground">
                    We believe in the power of diverse perspectives and working together to achieve extraordinary
                    results.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in everything we do, setting high standards and continuously improving.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-syne">Our Leadership Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the experienced professionals guiding our vision and strategy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO & Founder",
                  bio: "Former tech executive with 15+ years of experience in scaling startups.",
                  image: "/placeholder.svg?height=300&width=300&text=SJ",
                },
                {
                  name: "Michael Chen",
                  role: "CTO",
                  bio: "Tech innovator with expertise in AI, machine learning, and software architecture.",
                  image: "/placeholder.svg?height=300&width=300&text=MC",
                },
                {
                  name: "Emily Rodriguez",
                  role: "COO",
                  bio: "Operations expert specializing in business development and strategic partnerships.",
                  image: "/placeholder.svg?height=300&width=300&text=ER",
                },
                {
                  name: "David Park",
                  role: "Chief Investment Officer",
                  bio: "Former VC partner with a track record of successful early-stage investments.",
                  image: "/placeholder.svg?height=300&width=300&text=DP",
                },
                {
                  name: "Alex Wong",
                  role: "Head of Innovation",
                  bio: "Serial entrepreneur who has founded and exited three successful tech startups.",
                  image: "/placeholder.svg?height=300&width=300&text=AW",
                },
                {
                  name: "Priya Sharma",
                  role: "Chief Marketing Officer",
                  bio: "Marketing strategist with expertise in brand building and growth marketing.",
                  image: "/placeholder.svg?height=300&width=300&text=PS",
                },
              ].map((member, index) => (
                <Card key={index} className="border-none shadow-sm overflow-hidden">
                  <div className="relative h-64">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-20 bg-lynx-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-syne">Our Journey</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Key milestones in our growth and evolution.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  year: "2020",
                  title: "Connected is Born",
                  description:
                    "Founded with a vision to bridge the gap between innovative ideas and market-ready solutions.",
                  metrics: { ventures: "2", team: "5 people", funding: "$1M seed" },
                },
                {
                  year: "2021",
                  title: "First Major Success",
                  description:
                    "Our first portfolio company, TechFlow, secures Series A funding and reaches 10,000 users.",
                  metrics: { ventures: "5", team: "15 people", funding: "$5M raised" },
                },
                {
                  year: "2022",
                  title: "Expansion Phase",
                  description:
                    "Opened new headquarters and expanded our portfolio to include companies across multiple industries.",
                  metrics: { ventures: "12", team: "30 people", funding: "$15M raised" },
                },
                {
                  year: "2023",
                  title: "Global Recognition",
                  description: "Named 'Innovation Hub of the Year' and expanded operations to international markets.",
                  metrics: { ventures: "20", team: "50+ people", funding: "$30M raised" },
                },
                {
                  year: "2024",
                  title: "Sustainable Growth",
                  description: "Launched our sustainability initiative and continued to scale our portfolio companies.",
                  metrics: { ventures: "25+", team: "75+ people", funding: "$50M+ raised" },
                },
              ].map((milestone, index) => (
                <div key={index} className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-1">
                    <div className="text-4xl font-bold text-primary font-syne">{milestone.year}</div>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="md:col-span-1">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          <strong>{milestone.metrics.ventures}</strong> ventures
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          <strong>{milestone.metrics.team}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          <strong>{milestone.metrics.funding}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-syne">Recognition & Awards</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're proud to be recognized for our contributions to innovation and entrepreneurship.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  award: "Innovation Hub of the Year",
                  organization: "Tech Innovation Awards",
                  year: "2023",
                  icon: Award,
                },
                {
                  award: "Top 10 Venture Builders",
                  organization: "Entrepreneur Magazine",
                  year: "2023",
                  icon: Award,
                },
                {
                  award: "Best Workplace for Innovators",
                  organization: "Business Insider",
                  year: "2022",
                  icon: Award,
                },
                {
                  award: "Impact Investor of the Year",
                  organization: "Social Enterprise Forum",
                  year: "2022",
                  icon: Award,
                },
                {
                  award: "Technology Visionary Award",
                  organization: "Future Tech Summit",
                  year: "2021",
                  icon: Award,
                },
                {
                  award: "Startup Ecosystem Builder",
                  organization: "Founders Association",
                  year: "2021",
                  icon: Award,
                },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <Icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-xl font-bold mb-1">{item.award}</h3>
                      <p className="text-muted-foreground mb-2">{item.organization}</p>
                      <Badge variant="outline">{item.year}</Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 font-syne">Join Our Journey</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Whether you're an entrepreneur with a groundbreaking idea, an investor looking for opportunities, or a
              talented professional seeking a new challenge, we'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
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
    </div>
  )
}

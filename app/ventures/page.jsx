import { getVentures } from "../lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Calendar, Users, TrendingUp } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

export const metadata = {
  title: "Our Ventures | Connected",
  description:
    "Discover the innovative ventures we're building across various industries, each designed to solve real-world problems and create lasting impact.",
}

export default async function VenturesPage() {
  // Fetch ventures data
  const ventures = await getVentures()

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Ventures</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Discover the innovative ventures we're building across various industries, each designed to solve
                  real-world problems and create lasting impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ventures Grid */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ventures.length > 0 ? (
                ventures.map((venture) => (
                  <Card key={venture.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={
                            venture.status === "Active"
                              ? "default"
                              : venture.status === "Scaling"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {venture.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{venture.category}</span>
                      </div>
                      <CardTitle className="text-xl">{venture.name}</CardTitle>
                      <CardDescription>{venture.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{venture.founded}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{venture.team}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span>{venture.growth}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {venture.technologies &&
                            venture.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                        </div>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/ventures/${venture.slug}`}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">No ventures found. Check back soon for updates!</p>
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

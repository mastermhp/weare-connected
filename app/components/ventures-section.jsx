"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Calendar, Users, TrendingUp } from "lucide-react"

export default function VenturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const ventures = [
    {
      id: 1,
      title: "EcoTech Solutions",
      description: "Sustainable technology platform for environmental monitoring and carbon tracking.",
      status: "Active",
      category: "CleanTech",
      founded: "2024",
      team: "8 members",
      growth: "+150%",
      tags: ["Sustainability", "IoT", "Analytics"],
    },
    {
      id: 2,
      title: "FinFlow",
      description: "Next-generation financial management platform for small businesses and freelancers.",
      status: "Scaling",
      category: "FinTech",
      founded: "2023",
      team: "12 members",
      growth: "+200%",
      tags: ["Finance", "SaaS", "AI"],
    },
    {
      id: 3,
      title: "HealthHub",
      description: "Digital health platform connecting patients with healthcare providers seamlessly.",
      status: "Development",
      category: "HealthTech",
      founded: "2024",
      team: "6 members",
      growth: "New",
      tags: ["Healthcare", "Telemedicine", "Mobile"],
    },
  ]

  return (
    <section ref={ref} className=" py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm font-medium text-primary">
              Our Ventures
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Building the Future</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Discover the innovative ventures we're building across various industries, each designed to solve
              real-world problems and create lasting impact.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ventures.map((venture, index) => (
            <motion.div
              key={venture.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={
                        venture.status === "Active" ? "default" : venture.status === "Scaling" ? "secondary" : "outline"
                      }
                    >
                      {venture.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{venture.category}</span>
                  </div>
                  <CardTitle className="text-xl">{venture.title}</CardTitle>
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
                      {venture.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/ventures/${venture.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Button asChild size="lg">
            <Link href="/ventures">
              View All Ventures <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

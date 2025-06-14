import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Users, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function VenturesSection({ ventures = [] }) {

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // If no ventures are provided, use fallback data
  const venturesList =
    ventures.length > 0
      ? ventures
      : [
          {
            slug: "techflow",
            name: "TechFlow",
            tagline: "Workflow automation reimagined",
            description:
              "A comprehensive SaaS platform that revolutionizes how teams manage workflows and automate repetitive tasks.",
            image: "/placeholder.svg?height=600&width=1200&text=TechFlow+Dashboard",
            logo: "/placeholder.svg?height=120&width=120&text=TF",
          },
          {
            slug: "designhub",
            name: "DesignHub",
            tagline: "Creative solutions for modern brands",
            description:
              "A full-service design agency specializing in brand identity, digital experiences, and creative campaigns.",
            image: "/placeholder.svg?height=600&width=1200&text=DesignHub+Portfolio",
            logo: "/placeholder.svg?height=120&width=120&text=DH",
          },
          {
            slug: "healthhub",
            name: "HealthHub",
            tagline: "Transforming patient care",
            description:
              "A digital health platform that connects patients, providers, and caregivers to improve healthcare outcomes.",
            image: "/placeholder.svg?height=600&width=1200&text=HealthHub+Platform",
            logo: "/placeholder.svg?height=120&width=120&text=HH",
          },
        ]

  return (
    <section ref={ref} className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
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

          {venturesList.map((venture) => (
            <Link href={`/ventures/${venture.slug}`} key={venture.slug} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={venture.image || "/placeholder.svg?height=600&width=1200&text=Venture"}
                    alt={venture.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {venture.logo && (
                    <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full bg-white shadow-md overflow-hidden">
                      <Image
                        src={venture.logo || "/placeholder.svg"}
                        alt={`${venture.name} logo`}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{venture.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{venture.tagline}</p>
                  <p className="text-gray-600 mb-4 flex-grow">{venture.description}</p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
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







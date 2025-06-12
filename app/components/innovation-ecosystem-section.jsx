"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap, Users, Lightbulb, Rocket, Globe, Target } from "lucide-react"

export default function InnovationEcosystemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const ecosystemComponents = [
    {
      icon: Lightbulb,
      title: "Ideation Lab",
      description: "Where breakthrough concepts are born through research, market analysis, and creative thinking.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Talent Network",
      description: "A curated community of entrepreneurs, designers, developers, and industry experts.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Rocket,
      title: "Venture Studio",
      description: "Full-stack company building with shared resources, expertise, and operational support.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      title: "Market Access",
      description: "Strategic partnerships and networks that accelerate go-to-market and scaling efforts.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      title: "Impact Measurement",
      description: "Rigorous tracking of social, environmental, and economic impact across all ventures.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Zap,
      title: "Technology Stack",
      description: "Cutting-edge tools and platforms that enable rapid prototyping and scalable solutions.",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section ref={ref} className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm font-medium text-primary">
              Innovation Ecosystem
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How We Build</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Our comprehensive ecosystem provides everything needed to transform ideas into successful ventures, from
              initial concept to market leadership.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ecosystemComponents.map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${component.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <component.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{component.title}</h3>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4">End-to-End Support</h3>
            <p className="text-lg text-muted-foreground mb-6">
              From initial ideation to market success, our ecosystem provides comprehensive support at every stage of
              the venture building process.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="px-4 py-2">
                Research & Validation
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Product Development
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Go-to-Market
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Scaling & Growth
              </Badge>
            </div>
          </div>
          <Button asChild size="lg">
            <Link href="/about">
              Learn About Our Process <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

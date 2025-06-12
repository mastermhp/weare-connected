"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Users, Lightbulb, Rocket, Target } from "lucide-react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We push boundaries and challenge conventional thinking to create breakthrough solutions.",
    },
    {
      icon: Users,
      title: "People-Centered",
      description: "Every venture we build puts human needs and experiences at the center of design.",
    },
    {
      icon: Rocket,
      title: "Rapid Execution",
      description: "From concept to market, we move fast while maintaining quality and attention to detail.",
    },
    {
      icon: Target,
      title: "Impact Driven",
      description: "We measure success not just in profits, but in the positive change we create.",
    },
  ]

  return (
    <section ref={ref} className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm font-medium text-primary">
              About Connected
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Who We Are</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-md/relaxed ">
              We're a venture studio that builds companies from the ground up. Our team of entrepreneurs, designers, and
              engineers work together to identify opportunities and create solutions that make a real difference.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
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
          <div className="max-w-3xl mx-auto mt-40 mb-8">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground">
              To build a portfolio of ventures that not only succeed commercially but also contribute to solving
              real-world problems. We believe in the power of technology and human creativity to create positive change.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="px-4 py-2">
              12+ Active Ventures
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              50+ Team Members
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              8+ Industries
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              $10M+ Revenue Generated
            </Badge>
          </div>
          <Button asChild size="lg">
            <Link href="/about">
              Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Lightbulb, Rocket, Target } from "lucide-react";

export default function AboutSection({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Use data from props if available, otherwise use default values
  const values = data?.values || [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We push boundaries and challenge the status quo to create cutting-edge solutions that transform industries.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of community and partnerships to achieve extraordinary results and sustainable growth.",
    },
    {
      icon: Rocket,
      title: "Rapid Execution",
      description:
        "From concept to market, we move fast while maintaining quality and attention to detail.",
    },
    {
      icon: Target,
      title: "Impact",
      description:
        "We're committed to creating meaningful change and lasting value that drives transformative growth across markets.",
    },
  ];

  const mission =
    data?.mission ||
    "To build a portfolio of ventures that not only succeed commercially but also contribute to solving real-world problems. We believe in the power of technology and human creativity to create positive change.";
  const stats = data?.stats || [
    "12+ Active Ventures",
    "50+ Team Members",
    "8+ Industries",
    "$10M+ Revenue Generated",
  ];

  return (
    <section ref={ref} className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm font-medium text-primary">
              About Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Who We Are
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connected began with a vision to nurture and scale innovative
              ideas into leading market solutions. We are more than just a
              conglomerate; we are a community of visionaries and creators
              dedicated to making a significant impact through our collective
              expertise and passion for innovation.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto grid max-w-6xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Our Vision & Mission</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-50 border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-900 mb-2">Vision</h4>
                <p className="text-purple-800">
                  To be the leading force in business innovation, setting new
                  standards and driving transformative change across industries
                  globally.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900 mb-2">Mission</h4>
                <p className="text-blue-800">
                  Our mission is to empower, connect, and elevate businesses by
                  providing comprehensive support and resources, enabling them
                  to thrive in their respective markets and achieve sustainable
                  growth.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">What We Do</h3>
            <div className="space-y-3">
              {[
                "Strategic Investment and Business Support",
                "Industry-specific Consultation and Expertise",
                "Innovation Incubation and Development",
                "Market Analysis and Business Strategy Implementation",
                "Networking and Collaborative Growth Opportunities",
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-muted-foreground">{service}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon || Lightbulb;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center"> */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  <Icon className="h-12 w-12 text-white m-auto" />
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
                {/* </CardContent>
                </Card> */}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {stats.map((stat, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2">
                {stat}
              </Badge>
            ))}
          </div>
          <Button asChild size="lg">
            <Link href="/about">
              Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

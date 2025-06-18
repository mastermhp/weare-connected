"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Lightbulb, Linkedin, Twitter, Mail } from "lucide-react"
// import Header from "@/components/header"
import Footer from "../components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Header from "../components/header"

const teamMembers = [
  {
    name: "Ikramul Haque Ikram",
    role: "Chairman & Managing Director",
    bio: "Visionary leader with extensive experience in strategic business development and venture building.",
    image: "/professional-ceo-portrait.png",
    linkedin: "#",
    twitter: "#",
    email: "ikram@connected.com",
  },
  {
    name: "Mayeen Rahman",
    role: "Chief Executive Officer (CEO)",
    bio: "Innovative executive focused on scaling businesses and driving sustainable growth across markets.",
    image: "/professional-woman-executive.png",
    linkedin: "#",
    twitter: "#",
    email: "mayeen@connected.com",
  },
  {
    name: "Touhidul Haque",
    role: "Chief Technical Officer (CTO)",
    bio: "Technology leader specializing in cutting-edge solutions and digital transformation initiatives.",
    image: "/professional-cto-portrait.png",
    linkedin: "#",
    twitter: "#",
    email: "touhidul@connected.com",
  },
  {
    name: "Md. Minhaz Imran",
    role: "Executive Director & COO",
    bio: "Operations specialist focused on scaling systems and optimizing business processes for maximum efficiency.",
    image: "/production-director-portrait.png",
    linkedin: "#",
    twitter: "#",
    email: "minhaz@connected.com",
  },
  {
    name: "Rasel Ahmed Shifat",
    role: "Executive Director & Production Head",
    bio: "Production specialist with expertise in managing complex projects and delivering exceptional results.",
    image: "/production-director-portrait.png",
    linkedin: "#",
    twitter: "#",
    email: "rasel@connected.com",
  },
  {
    name: "Shafin Haider",
    role: "Creative Director – Social & Visual Media",
    bio: "Creative professional focused on building compelling brand narratives and driving visual excellence.",
    image: "/professional-woman-designer.png",
    linkedin: "#",
    twitter: "#",
    email: "shafin@connected.com",
  },
]

export default function AboutPageClient() {
  return (
    <>
    <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex items-center justify-center -mt-[80px] sm:-mt-[100px] md:-mt-[120px] pt-[120px] sm:pt-[160px] md:pt-[200px]">


        {/* Hero section background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-[#E9E6FF]/40 to-[#AA99FF]/30 -top-[120px] -mt-[120px] pt-[120px]">
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-primary/8" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(101,41,178,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(101,41,178,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        
        <div className="pt-32 pb-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 mx-auto max-w-4xl"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pot-black mb-6 font-syne">
                About Connected
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
                <span className="text-pot-black font-semibold">Connected isn't just a name — it's a philosophy.</span>
              </p>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
                We are a modern venture ecosystem that builds, launches, and scales high-impact businesses across
                digital, tech, media, consumer goods, and beyond.
              </p>
              <p className="text-lg sm:text-xl text-pot-black font-medium max-w-3xl mx-auto leading-relaxed">
                We don't follow the market. We build what the market follows.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-8 font-syne">Who We Are</h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              Connected is a multi-vertical venture company that operates at the intersection of{" "}
              <span className="text-pot-black font-semibold">innovation, creativity, and execution.</span> We design
              ventures from the ground up — powering ideas with infrastructure, capital, and world-class teams.
            </p>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg font-bold text-pot-black mb-8"
            >
              We don't just launch brands. We build machines that scale.
            </motion.p>
            <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
              From stealth-mode tools to high-visibility consumer brands, everything we create is tied together by one
              vision:{" "}
              <span className="text-pot-black font-semibold">
                To shape how the next generation lives, works, and grows.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20 bg-lynx-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(101,41,178,0.03)_1px,transparent_1px),linear-gradient(-45deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="text-center lg:text-left border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto lg:mx-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-pot-black mb-4 font-syne">Our Mission</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    To empower bold ideas and ambitious founders by providing the systems, strategy, and scale needed to{" "}
                    <span className="text-pot-black font-semibold">dominate their industries.</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="text-center lg:text-left border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 mx-auto lg:mx-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-pot-black mb-4 font-syne">Our Vision</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    To become the most influential venture ecosystem in Asia —{" "}
                    <span className="text-pot-black font-semibold">
                      exporting culture, products, and technology to the world.
                    </span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-8 font-syne">What We Do</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Build and operate ventures in-house from concept to execution",
              "Provide growth infrastructure — media, marketing, tech, and brand strategy",
              "Incubate smart ideas with internal capital and core leadership support",
              "Create unfair advantages through proprietary tools, networks, and insights",
              "Scale with speed, backed by remote talent and lean operation systems",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{item}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Ecosystem Section */}
      <section className="py-16 sm:py-20 bg-lynx-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-4 font-syne">Our Ecosystem</h2>
            <p className="text-lg text-gray-600 mb-8">
              <span className="text-pot-black font-semibold">We don't reveal everything we build.</span> But here's a
              glimpse of the industries we touch:
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Digital Advertising & Media",
                description: "Performance marketing, creative assets, content automation, and monetization systems.",
              },
              {
                title: "Tech & SaaS Infrastructure",
                description:
                  "Tools that power online businesses: browser systems, automation, security, and backend tech.",
              },
              {
                title: "Consumer Products & DTC",
                description:
                  "Aesthetic, functional products built with deep insight, viral storytelling, and modern branding.",
              },
              {
                title: "Lifestyle, Wellness & Fitness",
                description:
                  "Ventures that improve how people look, feel, and perform — from daily routines to peak habits.",
              },
              {
                title: "Food & Urban Experience",
                description: "Fast, modern, and scalable food brands with focus on convenience, culture, and branding.",
              },
            ].map((ecosystem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-4"></div>
                    <h3 className="font-bold text-lg mb-3 text-pot-black">{ecosystem.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{ecosystem.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12 max-w-2xl mx-auto"
          >
            <p className="text-base text-gray-600 leading-relaxed">
              <span className="text-pot-black font-semibold">Each venture is unique. Each one stands on its own.</span>
              <br />
              But behind all of them is one root system: <span className="text-pot-black font-bold">Connected.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-4 font-syne">What Makes Us Different</h2>
            <p className="text-lg text-gray-600 mb-8">
              <span className="text-pot-black font-semibold">We don't just talk ideas — we execute them.</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              "Built completely remote with global talent",
              "Cross-functional leadership across tech, design, operations, and marketing",
              "Projects span from stealth-mode to viral consumer brands",
              "Unapologetically ambitious, brutally efficient, and culture-driven",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base text-gray-600 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12 max-w-2xl mx-auto"
          >
            <p className="text-lg font-medium text-pot-black">
              No middlemen. No wasted time. No vanity metrics.
              <br />
              <span className="font-bold">Just results, impact, and ownership.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 bg-lynx-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12 mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-4 font-syne">Leadership</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Our leadership blends strategy, execution, and creative firepower.
            </p>
            <p className="text-base font-medium text-pot-black">
              <span className="font-bold">We don't run companies. We launch weapons.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 mx-auto w-full max-w-sm lg:max-w-none bg-white">
                  <CardContent className="p-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-1 text-pot-black">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                    <div className="flex justify-center space-x-3">
                      <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 text-gray-600" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4 text-gray-600" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
                        <a href={`mailto:${member.email}`}>
                          <Mail className="h-4 w-4 text-gray-600" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 mx-auto max-w-4xl"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-4 font-syne">Our Impact</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to{" "}
              <span className="text-pot-black font-semibold">building successful ventures.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                number: "16+",
                label: "Countries Touched",
                description: "With global users, clients, and partners",
              },
              {
                number: "12+",
                label: "Ventures Built",
                description: "Built or in progress across multiple industries",
              },
              {
                number: "50+",
                label: "Team Members",
                description: "Full-time and remote talent globally",
              },
              {
                number: "$100M+",
                label: "Total Market Cap",
                description: "Of upcoming projects and ventures",
              },
              {
                number: "1000s",
                label: "Clients Served",
                description: "Users and partners served globally",
              },
              {
                number: "5",
                label: "Core Industries",
                description: "Digital, Tech, Consumer, Lifestyle, Food",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="text-center group"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base font-medium text-pot-black mb-1">{stat.label}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 sm:py-20 bg-lynx-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-4 font-syne">Our Culture</h2>
            <p className="text-lg text-gray-600 mb-8">
              <span className="text-pot-black font-semibold">Connected is not a 9-to-5 company. It's a mindset.</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {[
              "We move fast, but with precision.",
              "We prioritize ownership, not permission.",
              "We respect creativity, but execute with systems.",
              "We work hard, and then work harder.",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base text-gray-600 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-600 mb-4">
              We're building a home for the smartest minds, wildest thinkers, and most relentless builders.
            </p>
            <p className="text-lg font-medium text-pot-black">
              <span className="font-bold">If you can't stand the average — you'll love it here.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white text-gray-900 relative overflow-hidden">
        {/* Creative background elements */}
        <div className="absolute inset-0 bg-white">
          {/* Animated floating shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-16 h-16 bg-secondary/15 rotate-45 animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-accent/20 rounded-full animate-ping"></div>

          {/* Curved lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" fill="none">
            <path
              d="M0,200 Q250,100 500,200 T1000,200"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M0,250 Q300,150 600,250 T1000,250"
              stroke="url(#gradient2)"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Dotted pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(101,41,178,0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Fire effect container */}
            <div className="relative bg-gradient-to-br from-white via-primary/5 to-secondary/10 rounded-[2rem] p-8 sm:p-12 border-4 border-dashed border-primary/30 shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500 overflow-hidden">
              {/* Fire flames - organic shapes */}
              <div className="absolute -inset-2 rounded-[2rem] overflow-hidden pointer-events-none">
                {/* Top fire flames */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`flame-top-${i}`}
                    className="absolute bg-gradient-to-t from-primary via-secondary to-accent opacity-70"
                    style={{
                      left: `${15 + i * 12}%`,
                      top: "-20px",
                      width: "12px",
                      height: "30px",
                      clipPath:
                        "polygon(40% 100%, 20% 80%, 30% 60%, 10% 40%, 25% 20%, 45% 30%, 60% 10%, 80% 25%, 70% 45%, 90% 65%, 75% 85%, 55% 75%)",
                    }}
                    animate={{
                      scaleY: [1, 1.8, 1.2, 1.5, 1],
                      scaleX: [1, 0.8, 1.1, 0.9, 1],
                      opacity: [0.5, 0.9, 0.7, 0.8, 0.5],
                      y: [0, -5, 2, -3, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Bottom fire flames */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`flame-bottom-${i}`}
                    className="absolute bg-gradient-to-b from-primary via-secondary to-accent opacity-70"
                    style={{
                      left: `${20 + i * 12}%`,
                      bottom: "-20px",
                      width: "12px",
                      height: "30px",
                      clipPath:
                        "polygon(40% 0%, 20% 20%, 30% 40%, 10% 60%, 25% 80%, 45% 70%, 60% 90%, 80% 75%, 70% 55%, 90% 35%, 75% 15%, 55% 25%)",
                    }}
                    animate={{
                      scaleY: [1, 1.8, 1.2, 1.5, 1],
                      scaleX: [1, 0.8, 1.1, 0.9, 1],
                      opacity: [0.5, 0.9, 0.7, 0.8, 0.5],
                      y: [0, 5, -2, 3, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3 + 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Left fire flames */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`flame-left-${i}`}
                    className="absolute bg-gradient-to-r from-primary via-secondary to-accent opacity-70"
                    style={{
                      left: "-20px",
                      top: `${25 + i * 15}%`,
                      width: "30px",
                      height: "12px",
                      clipPath:
                        "polygon(100% 40%, 80% 20%, 60% 30%, 40% 10%, 20% 25%, 30% 45%, 10% 60%, 25% 80%, 45% 70%, 65% 90%, 85% 75%, 75% 55%)",
                    }}
                    animate={{
                      scaleX: [1, 1.8, 1.2, 1.5, 1],
                      scaleY: [1, 0.8, 1.1, 0.9, 1],
                      opacity: [0.5, 0.9, 0.7, 0.8, 0.5],
                      x: [0, -5, 2, -3, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Right fire flames */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`flame-right-${i}`}
                    className="absolute bg-gradient-to-l from-primary via-secondary to-accent opacity-70"
                    style={{
                      right: "-20px",
                      top: `${30 + i * 15}%`,
                      width: "30px",
                      height: "12px",
                      clipPath:
                        "polygon(0% 40%, 20% 20%, 40% 30%, 60% 10%, 80% 25%, 70% 45%, 90% 60%, 75% 80%, 55% 70%, 35% 90%, 15% 75%, 25% 55%)",
                    }}
                    animate={{
                      scaleX: [1, 1.8, 1.2, 1.5, 1],
                      scaleY: [1, 0.8, 1.1, 0.9, 1],
                      opacity: [0.5, 0.9, 0.7, 0.8, 0.5],
                      x: [0, 5, -2, 3, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.4 + 0.7,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Funky corner decorations - minimal */}
              <motion.div
                className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-secondary to-accent rounded-sm"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Funky inner pattern with animation */}
              <motion.div
                className="absolute inset-4 border-2 border-dotted border-secondary/20 rounded-2xl"
                animate={{ rotate: [0, 1, -1, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Ember particles - minimal */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                  }}
                />
              ))}

              <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-syne text-gray-900 relative z-10">
                What's Coming Next
              </h2>
              <p className="text-lg sm:text-xl mb-8 text-gray-700 max-w-2xl mx-auto relative z-10">
                We're just getting started. More ventures. More firepower. More disruption. More ways to win.
              </p>
              <p className="text-lg font-medium text-pot-black mb-8 relative z-10">
                <span className="font-bold">We don't ask for permission. We just build.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-lg"
                    asChild
                  >
                    <Link href="/ventures">View Our Ventures</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}

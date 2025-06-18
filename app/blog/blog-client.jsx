"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User, Clock } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import { motion } from "framer-motion"

export default function BlogClientPage({ posts }) {
  return (
    <>
    <Header />
      <div className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden -mt-[80px] sm:-mt-[100px] md:-mt-[120px] pt-[120px] sm:pt-[160px] md:pt-[200px]">
        {/* Hero section background that extends behind header */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-[#E9E6FF]/40 to-[#AA99FF]/30 -top-[120px] -mt-[120px] pt-[120px]">
          {/* Animated mesh gradient - identical to hero */}
          {/* Floating particles */}
          {[...Array(50)].map((_, i) => (
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

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(101,41,178,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(101,41,178,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        
        <div className="pt-32 pb-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 max-w-7xl">
            <div className="text-center mb-12 mx-auto max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pot-black mb-4 font-syne">Our Blog</h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Insights, stories, and updates from the Connected team. Discover the latest trends in technology,
                entrepreneurship, and innovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the content with white background */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow duration-300 mx-auto w-full max-w-sm md:max-w-none"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/blog/${post.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">No blog posts found. Check back soon for updates!</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12 mx-auto max-w-2xl">
            <p className="text-muted-foreground">
              Want to stay updated? Follow us on social media for the latest insights and updates.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

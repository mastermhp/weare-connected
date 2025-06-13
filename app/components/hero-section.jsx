"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react"
import Link from "next/link"

export default function HeroSection({ data }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Use data from props if available, otherwise use default values
  const title = data?.title || "We Build Connected Futures"
  const subtitle = data?.subtitle || "Innovative ventures that shape industries and move culture forward."
  const description =
    data?.description || "From AI-powered platforms to sustainable lifestyle brands, we create solutions that matter."
  const stats = data?.stats || [
    { icon: Target, label: "Active Ventures", value: "12+" },
    { icon: Zap, label: "Team Members", value: "50+" },
    { icon: Sparkles, label: "Industries", value: "8+" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-6 py-3 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Building Tomorrow's Solutions
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="text-slate-900">We Build</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Connected
              </span>
              <br />
              <span className="text-slate-900">Futures</span>
            </h1>

            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-medium text-slate-700">{subtitle}</p>
              <p className="text-lg md:text-xl text-slate-600">{description}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/ventures">
                Explore Our Ventures <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/50 transition-all duration-300"
            >
              <Link href="/about">Learn Our Story</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 w-full max-w-4xl">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm md:text-base text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

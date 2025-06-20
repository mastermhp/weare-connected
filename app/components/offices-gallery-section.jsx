"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import Gallery from "@/components/gallery"
import { Building, MapPin, Users, ArrowRight, Sparkles } from "lucide-react"
import Gallery from "@/components/ui/gallery"

const OfficesGallerySection = ({ content }) => {
  const [officesData, setOfficesData] = useState({
    title: "Our Workspace",
    subtitle:
      "Where innovation meets execution. Our modern office spaces are designed to foster creativity, collaboration, and peak performance.",
    galleries: [],
  })
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [featuredOffice, setFeaturedOffice] = useState(null)

  const categories = ["All", "Headquarters", "Regional Office", "Co-working Space", "Innovation Hub", "Remote Office"]

  useEffect(() => {
    const fetchOfficesData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/content/offices")
        if (response.ok) {
          const offices = await response.json()
          setOfficesData((prev) => ({
            ...prev,
            galleries: offices,
          }))
          // Set first office as featured
          if (offices.length > 0) {
            setFeaturedOffice(offices[0])
          }
        }
      } catch (error) {
        console.error("Error fetching offices data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOfficesData()

    if (content?.offices) {
      setOfficesData((prev) => ({
        ...prev,
        title: content.offices.title || prev.title,
        subtitle: content.offices.subtitle || prev.subtitle,
      }))
    }
  }, [content])

  const filteredGalleries = officesData.galleries.filter(
    (gallery) => selectedCategory === "All" || gallery.category === selectedCategory,
  )

  const getCategoryStats = () => {
    const stats = {
      total: officesData.galleries.length,
      capacity: officesData.galleries.reduce((sum, office) => sum + (office.capacity || 0), 0),
      locations: new Set(
        officesData.galleries.map((office) => office.location.split(",")[1]?.trim() || office.location),
      ).size,
    }
    return stats
  }

  const stats = getCategoryStats()

  const features = [
    {
      icon: Sparkles,
      title: "Modern Design",
      description: "Clean, contemporary spaces that reflect our innovative approach",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Building,
      title: "Smart Spaces",
      description: "Technology-integrated environments for enhanced productivity",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Flexible Collaboration",
      description: "Adaptable environments for teamwork, focus, and creativity",
      color: "from-green-500 to-emerald-500",
    },
  ]

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Featured Office Skeleton */}
          <div className="mb-16">
            <div className="h-96 bg-gray-200 rounded-3xl animate-pulse"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                <div className="h-16 w-16 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>

          {/* Gallery Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (officesData.galleries.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{officesData.title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold text-gray-800">Where innovation meets execution.</span>{" "}
            {officesData.subtitle.replace("Where innovation meets execution. ", "")}
          </p>
        </motion.div>

        {/* Featured Office Hero */}
        {featuredOffice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-20"
          >
            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
              <img
                src={featuredOffice.mainImage || "/placeholder.svg?height=500&width=1200"}
                alt={featuredOffice.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold mb-2"
                >
                  {featuredOffice.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg opacity-90"
                >
                  {featuredOffice.description || "Open collaboration space with panoramic city views"}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Animated Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Building, label: "Global Offices", value: stats.total, suffix: "" },
            { icon: MapPin, label: "Locations", value: stats.locations, suffix: "" },
            { icon: Users, label: "Total Capacity", value: stats.capacity, suffix: "+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-[#6529B2] to-[#8B5CF6] rounded-2xl">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.5, type: "spring" }}
                  className="text-4xl font-bold text-gray-900 mb-2"
                >
                  {stat.value}
                  {stat.suffix}
                </motion.div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#6529B2] to-[#8B5CF6] text-white shadow-lg shadow-purple-500/25"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200"
              }`}
            >
              {category}
              {category !== "All" && (
                <span className="ml-2 text-xs opacity-75">
                  ({officesData.galleries.filter((g) => g.category === category).length})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Offices Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {filteredGalleries.map((gallery, index) => (
              <motion.div
                key={gallery._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="transform transition-all duration-300"
              >
                <Gallery gallery={gallery} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} p-5 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredGalleries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <Building className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No offices found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try selecting a different category to explore our workspace locations.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default OfficesGallerySection

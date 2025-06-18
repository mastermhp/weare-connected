"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, DollarSign, Users, Search } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"
import Link from "next/link"
import { motion } from "framer-motion"

const benefits = [
  "Competitive salary and equity",
  "Health, dental, and vision insurance",
  "Flexible work arrangements",
  "Professional development budget",
  "Unlimited PTO",
  "Modern office spaces",
]

export default function CareersClientPage({ jobs = [] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Get unique departments and locations from real data
  const departments = ["all", ...new Set(jobs.map((job) => job.department).filter(Boolean))]
  const locations = ["all", ...new Set(jobs.map((job) => job.location).filter(Boolean))]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter
    const matchesLocation = locationFilter === "all" || job.location.includes(locationFilter)

    return matchesSearch && matchesDepartment && matchesLocation
  })

  // Format posted date
  const formatPostedDate = (dateString) => {
    if (!dateString) return "Recently"

    const postedDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - postedDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? "s" : ""} ago`
    return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? "s" : ""} ago`
  }

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Hero section background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-accent/20 to-secondary/30 -top-[120px] -mt-[120px] pt-[120px]">
          {/* Floating particles */}
          {[...Array(35)].map((_, i) => (
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

        <Header />
        <div className="pt-32 pb-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 max-w-7xl">
            <div className="text-center mb-12 mx-auto max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pot-black mb-6 font-syne">
                Join Our Team
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Help us build the future by joining our team of innovators, creators, and problem-solvers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments
                  .filter((dept) => dept !== "all")
                  .map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations
                  .filter((loc) => loc !== "all")
                  .map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-2 font-syne">Open Positions</h2>
              <p className="text-muted-foreground">
                {filteredJobs.length} position{filteredJobs.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl sm:text-2xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                        <CardDescription className="text-sm sm:text-base leading-relaxed">
                          {job.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:text-right">
                        <Button asChild>
                          <Link href={`/careers/${job.slug}`}>Apply Now</Link>
                        </Button>
                        <p className="text-sm text-muted-foreground">{formatPostedDate(job.posted)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Key Requirements:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No positions match your search criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setDepartmentFilter("all")
                    setLocationFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-lynx-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12 mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-pot-black mb-4 font-syne">Why Work With Us?</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We offer competitive benefits and a culture that values innovation, growth, and work-life balance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-none shadow-sm mx-auto w-full max-w-sm lg:max-w-none">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                  <p className="font-medium">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto relative">
            {/* Fire Effect Box */}
            <div className="relative bg-white rounded-2xl p-8 sm:p-12 text-center overflow-hidden border-4 border-transparent">
              {/* Fire Flames */}
              {/* Top flames */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`top-${i}`}
                  className="absolute -top-4 bg-gradient-to-t from-primary via-secondary to-accent rounded-full opacity-80"
                  style={{
                    left: `${15 + i * 14}%`,
                    width: "20px",
                    height: "30px",
                    clipPath: "polygon(50% 0%, 20% 100%, 80% 100%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    y: [0, -5, 2, -3, 0],
                    opacity: [0.6, 0.9, 0.7, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}

              {/* Bottom flames */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`bottom-${i}`}
                  className="absolute -bottom-4 bg-gradient-to-b from-accent via-secondary to-primary rounded-full opacity-80"
                  style={{
                    left: `${15 + i * 14}%`,
                    width: "20px",
                    height: "30px",
                    clipPath: "polygon(50% 100%, 20% 0%, 80% 0%)",
                  }}
                  animate={{
                    scale: [1, 1.1, 0.95, 1.15, 1],
                    y: [0, 5, -2, 4, 0],
                    opacity: [0.7, 0.9, 0.6, 0.85, 0.7],
                  }}
                  transition={{
                    duration: 1.8 + Math.random(),
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.15,
                  }}
                />
              ))}

              {/* Left flames */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`left-${i}`}
                  className="absolute -left-4 bg-gradient-to-r from-secondary via-primary to-accent rounded-full opacity-75"
                  style={{
                    top: `${25 + i * 15}%`,
                    width: "30px",
                    height: "20px",
                    clipPath: "polygon(0% 50%, 100% 20%, 100% 80%)",
                  }}
                  animate={{
                    scale: [1, 1.3, 0.8, 1.2, 1],
                    x: [0, -3, 1, -2, 0],
                    opacity: [0.6, 0.9, 0.5, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 2.2 + Math.random(),
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.25,
                  }}
                />
              ))}

              {/* Right flames */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`right-${i}`}
                  className="absolute -right-4 bg-gradient-to-l from-accent via-secondary to-primary rounded-full opacity-75"
                  style={{
                    top: `${25 + i * 15}%`,
                    width: "30px",
                    height: "20px",
                    clipPath: "polygon(100% 50%, 0% 20%, 0% 80%)",
                  }}
                  animate={{
                    scale: [1, 1.25, 0.85, 1.15, 1],
                    x: [0, 3, -1, 2, 0],
                    opacity: [0.65, 0.9, 0.55, 0.85, 0.65],
                  }}
                  transition={{
                    duration: 1.9 + Math.random(),
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Corner decorations */}
              <motion.div
                className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-sm shadow-lg shadow-primary/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-bl from-secondary to-accent rounded-sm shadow-lg shadow-secondary/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-accent rounded-full opacity-60"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${30 + Math.random() * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Inner border */}
              <motion.div
                className="absolute inset-4 border-2 border-dotted border-primary/30 rounded-xl pointer-events-none"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-syne text-pot-black">
                  Don't See the Right Role?
                </h2>
                <p className="text-lg sm:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
                  We're always looking for talented individuals. Send us your resume and let us know how you'd like to
                  contribute.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-secondary hover:via-accent hover:to-primary text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(101,41,178,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(101,41,178,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

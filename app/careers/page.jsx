"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [typeFilter, setTypeFilter] = useState("All Types")

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/content/jobs")

        if (!response.ok) {
          throw new Error("Failed to fetch jobs")
        }

        const data = await response.json()
        setJobs(data)
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError("Failed to load job listings. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())

    // Department filter
    const matchesDepartment = departmentFilter === "All Departments" || job.department === departmentFilter

    // Location filter
    const matchesLocation = locationFilter === "All Locations" || job.location === locationFilter

    // Type filter
    const matchesType = typeFilter === "All Types" || job.type === typeFilter

    return matchesSearch && matchesDepartment && matchesLocation && matchesType
  })

  // Get unique values for filters
  const departments = ["All Departments", ...new Set(jobs.map((job) => job.department))]
  const locations = ["All Locations", ...new Set(jobs.map((job) => job.location))]
  const types = ["All Types", ...new Set(jobs.map((job) => job.type))]

  // Format posted date
  const formatPostedDate = (date) => {
    if (!date) return "Recently"

    const postedDate = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now - postedDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    return `${diffDays} days ago`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find your next opportunity and join our mission to build innovative solutions.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading positions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {/* Jobs List */}
        {!loading && !error && (
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job._id || job.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Posted {formatPostedDate(job.createdAt || job.postedDate)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 md:mt-0">
                        <div className="mr-6 text-right">
                          <span className="text-sm text-gray-500">{job.experienceLevel}</span>
                        </div>
                        <Button asChild className="bg-purple-700 hover:bg-purple-800">
                          <Link href={`/careers/${job.slug}`}>
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

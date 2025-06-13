"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft, Share2, Bookmark, Check, Users } from "lucide-react"
import Link from "next/link"

export default function JobPageClient({ job }) {
  const [similarJobs, setSimilarJobs] = useState([])

  useEffect(() => {
    const fetchSimilarJobs = async () => {
      try {
        const response = await fetch("/api/content/jobs")
        if (response.ok) {
          const allJobs = await response.json()
          const similar = allJobs
            .filter((j) => j.slug !== job.slug && (j.department === job.department || j.location === job.location))
            .slice(0, 3)
          setSimilarJobs(similar)
        }
      } catch (error) {
        console.error("Error fetching similar jobs:", error)
      }
    }

    fetchSimilarJobs()
  }, [job])

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
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" asChild className="flex items-center text-gray-600 hover:text-gray-900">
            <Link href="/careers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Careers
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center">
                  <Badge className="bg-purple-100 text-purple-800 mr-2">{job.department}</Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>{job.type}</span>
              </div>
              {job.salary && (
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Posted {formatPostedDate(job.createdAt || job.postedDate)}</span>
              </div>
            </div>

            {job.technologies && job.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {job.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            <Button asChild className="bg-purple-700 hover:bg-purple-800 w-full sm:w-auto">
              <Link href={`/careers/${job.slug}/apply`}>Apply for this Position</Link>
            </Button>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex">
                    <Check className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits & Perks */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
              <ul className="space-y-3">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex">
                    <Check className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Apply */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Apply</h3>
            <Button asChild className="bg-purple-700 hover:bg-purple-800 w-full mb-3">
              <Link href={`/careers/${job.slug}/apply`}>Apply Now</Link>
            </Button>
            <Button variant="outline" className="w-full">
              Save for Later
            </Button>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Application deadline:</p>
              <p className="font-medium">Open until filled</p>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Job Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Department</span>
                <span className="font-medium">{job.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{job.experienceLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employment Type</span>
                <span className="font-medium">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-medium">{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Range</span>
                  <span className="font-medium">{job.salary}</span>
                </div>
              )}
            </div>
          </div>

          {/* About Company */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About Connected</h3>
            <p className="text-gray-700 mb-4">
              We're a forward-thinking company that connects businesses with innovative solutions. Join our team and be
              part of something extraordinary.
            </p>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>50-200 employees</span>
            </div>
          </div>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <Link
                    key={similarJob.id}
                    href={`/careers/${similarJob.slug}`}
                    className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded-md transition-colors"
                  >
                    <h4 className="font-medium text-gray-900">{similarJob.title}</h4>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                      <span>{similarJob.department}</span>
                      <span>•</span>
                      <span>{similarJob.location}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

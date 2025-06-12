"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, MapPin, Clock, Users, Briefcase, Eye, FileText } from "lucide-react"

const mockJobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    applications: 24,
    salary: "$80,000 - $120,000",
    experience: "5+ years",
    description: "We are looking for a senior full stack developer to join our growing team...",
    requirements: ["React/Next.js", "Node.js", "PostgreSQL", "AWS"],
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    status: "Active",
    applications: 18,
    salary: "$65,000 - $85,000",
    experience: "3+ years",
    description: "Join our design team to create beautiful and intuitive user experiences...",
    requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Paused",
    applications: 12,
    salary: "$90,000 - $130,000",
    experience: "4+ years",
    description: "Help us scale our infrastructure and improve deployment processes...",
    requirements: ["Docker", "Kubernetes", "AWS/GCP", "CI/CD"],
    postedDate: "2024-01-05",
    deadline: "2024-02-05",
  },
  {
    id: 4,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    applications: 31,
    salary: "$60,000 - $80,000",
    experience: "3+ years",
    description: "Lead our marketing efforts and drive growth through various channels...",
    requirements: ["Digital Marketing", "SEO/SEM", "Analytics", "Content Strategy"],
    postedDate: "2024-01-20",
    deadline: "2024-02-20",
  },
  {
    id: 5,
    title: "Junior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    status: "Draft",
    applications: 0,
    salary: "$45,000 - $65,000",
    experience: "1-2 years",
    description: "Perfect opportunity for a junior developer to grow with our team...",
    requirements: ["HTML/CSS", "JavaScript", "React", "Git"],
    postedDate: "2024-01-25",
    deadline: "2024-02-25",
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const departments = ["All", "Engineering", "Design", "Marketing", "Sales", "Operations"]
  const statuses = ["All", "Active", "Paused", "Draft", "Closed"]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment
    const matchesStatus = selectedStatus === "All" || job.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Closed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDepartmentColor = (department) => {
    switch (department) {
      case "Engineering":
        return "bg-blue-100 text-blue-800"
      case "Design":
        return "bg-purple-100 text-purple-800"
      case "Marketing":
        return "bg-pink-100 text-pink-800"
      case "Sales":
        return "bg-green-100 text-green-800"
      case "Operations":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jobs Management</h1>
          <p className="text-gray-600 mt-1">Manage job postings and track applications</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#6529B2] hover:bg-[#5420A0] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>Add a new job opening to attract top talent</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" placeholder="e.g., Senior Full Stack Developer" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Operations</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Remote, New York" />
                </div>
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input id="experience" placeholder="e.g., 3+ years" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" placeholder="e.g., $80,000 - $120,000" />
                </div>
                <div>
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                <Textarea id="requirements" placeholder="React, Node.js, PostgreSQL, AWS..." rows={2} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#6529B2] hover:bg-[#5420A0] text-white">Post Job</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <div className="p-3 bg-[#6529B2] bg-opacity-10 rounded-full">
                <Briefcase className="w-6 h-6 text-[#6529B2]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Postings</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.filter((j) => j.status === "Active").length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.reduce((sum, j) => sum + j.applications, 0)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(jobs.reduce((sum, j) => sum + j.applications, 0) / jobs.length)}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept} Department
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status} Status
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Badge className={getDepartmentColor(job.department)}>{job.department}</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.experience}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {job.requirements.slice(0, 4).map((req, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.requirements.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:text-right space-y-2">
                  <div className="text-lg font-semibold text-[#6529B2]">{job.salary}</div>
                  <div className="text-sm text-gray-600">
                    <div>{job.applications} applications</div>
                    <div>Posted: {new Date(job.postedDate).toLocaleDateString()}</div>
                    <div>Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Briefcase className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

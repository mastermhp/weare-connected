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
import { Plus, Edit, Trash2, Search, Eye, TrendingUp, Award, ExternalLink } from "lucide-react"

const mockCaseStudies = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    client: "TechMart Inc.",
    category: "Web Development",
    status: "Published",
    description:
      "Complete redesign and development of a modern e-commerce platform with improved user experience and performance.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    duration: "6 months",
    teamSize: 8,
    results: {
      conversionRate: "+45%",
      pageSpeed: "+60%",
      userSatisfaction: "4.8/5",
    },
    publishDate: "2024-01-15",
    featured: true,
    url: "https://techmart.com",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    client: "SecureBank",
    category: "Mobile Development",
    status: "Published",
    description:
      "Secure and user-friendly mobile banking application with advanced security features and intuitive design.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    duration: "8 months",
    teamSize: 12,
    results: {
      downloads: "500K+",
      rating: "4.9/5",
      transactions: "+200%",
    },
    publishDate: "2024-01-10",
    featured: true,
    url: "https://securebank.com/app",
  },
  {
    id: 3,
    title: "Healthcare Dashboard",
    client: "MedTech Solutions",
    category: "UI/UX Design",
    status: "Published",
    description:
      "Comprehensive healthcare dashboard for medical professionals with real-time patient monitoring and analytics.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "D3.js", "Python", "Docker"],
    duration: "4 months",
    teamSize: 6,
    results: {
      efficiency: "+35%",
      errorReduction: "-50%",
      userAdoption: "95%",
    },
    publishDate: "2024-01-05",
    featured: false,
    url: "https://medtech.com/dashboard",
  },
  {
    id: 4,
    title: "AI-Powered Analytics Platform",
    client: "DataCorp",
    category: "Data Science",
    status: "Draft",
    description:
      "Advanced analytics platform with machine learning capabilities for business intelligence and predictive analytics.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Python", "TensorFlow", "React", "Kubernetes"],
    duration: "10 months",
    teamSize: 15,
    results: {
      accuracy: "94%",
      processing: "+300%",
      insights: "10x faster",
    },
    publishDate: null,
    featured: false,
    url: null,
  },
]

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState(mockCaseStudies)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const categories = [
    "All",
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Data Science",
    "Digital Marketing",
  ]
  const statuses = ["All", "Published", "Draft", "Archived"]

  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || study.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || study.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 border-green-200"
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Archived":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Web Development":
        return "bg-blue-100 text-blue-800"
      case "Mobile Development":
        return "bg-green-100 text-green-800"
      case "UI/UX Design":
        return "bg-purple-100 text-purple-800"
      case "Data Science":
        return "bg-orange-100 text-orange-800"
      case "Digital Marketing":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
          <p className="text-gray-600 mt-1">Showcase your successful projects and client work</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#6529B2] hover:bg-[#5420A0] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Case Study</DialogTitle>
              <DialogDescription>Add a new case study to showcase your work</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="Enter project title" />
                </div>
                <div>
                  <Label htmlFor="client">Client Name</Label>
                  <Input id="client" placeholder="Enter client name" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>UI/UX Design</option>
                    <option>Data Science</option>
                    <option>Digital Marketing</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 6 months" />
                </div>
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input id="teamSize" type="number" placeholder="e.g., 8" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the project and its objectives..." rows={3} />
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input id="technologies" placeholder="React, Node.js, PostgreSQL, AWS..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="result1">Key Result 1</Label>
                  <Input id="result1" placeholder="e.g., +45% conversion rate" />
                </div>
                <div>
                  <Label htmlFor="result2">Key Result 2</Label>
                  <Input id="result2" placeholder="e.g., +60% page speed" />
                </div>
                <div>
                  <Label htmlFor="result3">Key Result 3</Label>
                  <Input id="result3" placeholder="e.g., 4.8/5 user satisfaction" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="url">Project URL</Label>
                  <Input id="url" placeholder="https://example.com" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#6529B2] hover:bg-[#5420A0] text-white">Create Case Study</Button>
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
                <p className="text-sm font-medium text-gray-600">Total Studies</p>
                <p className="text-2xl font-bold text-gray-900">{caseStudies.length}</p>
              </div>
              <div className="p-3 bg-[#6529B2] bg-opacity-10 rounded-full">
                <Award className="w-6 h-6 text-[#6529B2]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {caseStudies.filter((s) => s.status === "Published").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{caseStudies.filter((s) => s.featured).length}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(caseStudies.map((s) => s.category)).size}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
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
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
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
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCaseStudies.map((study) => (
          <Card key={study.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden relative">
              <img src={study.image || "/placeholder.svg"} alt={study.title} className="w-full h-full object-cover" />
              {study.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#6529B2] text-white">Featured</Badge>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Badge className={getStatusColor(study.status)}>{study.status}</Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">{study.title}</h3>
                  <p className="text-gray-600 mb-2">{study.client}</p>
                  <Badge className={getCategoryColor(study.category)} variant="secondary">
                    {study.category}
                  </Badge>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{study.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium ml-1">{study.duration}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Team:</span>
                  <span className="font-medium ml-1">{study.teamSize} members</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-gray-900">Key Results:</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {Object.entries(study.results).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-[#6529B2]">{value}</div>
                      <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {study.technologies.slice(0, 4).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {study.technologies.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{study.technologies.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-500">
                  {study.publishDate ? (
                    <>Published: {new Date(study.publishDate).toLocaleDateString()}</>
                  ) : (
                    "Not published"
                  )}
                </div>
                <div className="flex gap-2">
                  {study.url && (
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCaseStudies.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Award className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No case studies found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

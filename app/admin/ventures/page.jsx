"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Eye, Loader2, Building } from "lucide-react"
import Link from "next/link"
import ImageUpload from "@/app/components/admin/image-upload"

const mockVentures = [
  {
    _id: 1,
    name: "TechFlow",
    slug: "techflow",
    description:
      "A comprehensive SaaS platform that revolutionizes how teams manage workflows and automate repetitive tasks.",
    tagline: "Workflow automation reimagined",
    category: "SaaS",
    status: "active",
    foundedYear: "2022",
    teamSize: "12",
    growth: "+150% YoY",
    website: "https://techflow.example.com",
    metrics: [
      { label: "Active Users", value: "10K+" },
      { label: "Projects", value: "50K+" },
      { label: "Time Saved", value: "2M+ hrs" },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    logo: "/placeholder.svg?height=100&width=100",
    featuredImage: "/placeholder.svg?height=400&width=600",
  },
  {
    _id: 2,
    name: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    tagline: "Native and cross-platform mobile apps",
    category: "Technology",
    status: "active",
    foundedYear: "2023",
    teamSize: "8",
    growth: "+120% YoY",
    website: "https://mobileappdevelopment.com",
    metrics: [
      { label: "Apps Delivered", value: "50+" },
      { label: "Downloads", value: "1M+" },
      { label: "Client Satisfaction", value: "4.9/5" },
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase"],
    logo: "/placeholder.svg?height=100&width=100",
    featuredImage: "/placeholder.svg?height=200&width=300",
  },
]

export default function VenturesPage() {
  const router = useRouter()
  const [ventures, setVentures] = useState(mockVentures)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [ventureToDelete, setVentureToDelete] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    tagline: "",
    category: "SaaS",
    status: "active",
    foundedYear: "",
    teamSize: "",
    growth: "",
    website: "",
    metrics: [
      { label: "Active Users", value: "" },
      { label: "Projects", value: "" },
      { label: "Time Saved", value: "" },
    ],
    technologies: [],
    logo: null,
    featuredImage: null,
  })
  const [techInput, setTechInput] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch ventures
  useEffect(() => {
    fetchVentures()
  }, [statusFilter, searchTerm])

  const fetchVentures = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams({
        status: statusFilter !== "all" ? statusFilter : "",
        search: searchTerm,
      })

      const response = await fetch(`/api/admin/ventures?${queryParams}`)

      if (!response.ok) {
        throw new Error("Failed to fetch ventures")
      }

      const data = await response.json()
      setVentures(data)
    } catch (err) {
      console.error("Error fetching ventures:", err)
      setError("Failed to load ventures. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Auto-generate slug from name
    if (name === "name" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
      setFormData((prev) => ({ ...prev, slug }))
    }

    // Clear validation error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleMetricChange = (index, field, value) => {
    const updatedMetrics = [...formData.metrics]
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: value }
    setFormData((prev) => ({ ...prev, metrics: updatedMetrics }))
  }

  const addMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { label: "", value: "" }],
    }))
  }

  const removeMetric = (index) => {
    const updatedMetrics = [...formData.metrics]
    updatedMetrics.splice(index, 1)
    setFormData((prev) => ({ ...prev, metrics: updatedMetrics }))
  }

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }))
      setTechInput("")
    }
  }

  const removeTechnology = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const handleLogoUpload = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      logo: imageData,
    }))
  }

  const handleFeaturedImageUpload = (imageData) => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: imageData,
    }))
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.description.trim()) errors.description = "Description is required"
    if (!formData.slug.trim()) errors.slug = "Slug is required"
    if (!formData.tagline.trim()) errors.tagline = "Tagline is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateVenture = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)

      const response = await fetch("/api/admin/ventures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create venture")
      }

      const data = await response.json()

      // Add new venture to state and close modal
      setVentures((prev) => [data.venture, ...prev])
      setIsCreateModalOpen(false)

      // Reset form
      setFormData({
        name: "",
        slug: "",
        description: "",
        tagline: "",
        category: "SaaS",
        status: "active",
        foundedYear: "",
        teamSize: "",
        growth: "",
        website: "",
        metrics: [
          { label: "Active Users", value: "" },
          { label: "Projects", value: "" },
          { label: "Time Saved", value: "" },
        ],
        technologies: [],
        logo: null,
        featuredImage: null,
      })
    } catch (err) {
      console.error("Error creating venture:", err)
      setFormErrors((prev) => ({ ...prev, submit: err.message }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClick = (venture) => {
    setVentureToDelete(venture)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteVenture = async () => {
    if (!ventureToDelete) return

    try {
      setIsSubmitting(true)

      const response = await fetch(`/api/admin/ventures/${ventureToDelete._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete venture")
      }

      // Remove venture from state
      setVentures((prev) => prev.filter((venture) => venture._id !== ventureToDelete._id))
      setIsDeleteModalOpen(false)
      setVentureToDelete(null)
    } catch (err) {
      console.error("Error deleting venture:", err)
      setError("Failed to delete venture. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ventures Management</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage your ventures and portfolio companies</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-emperor hover:bg-purple-emperor/90">
              <Plus className="h-4 w-4 mr-2" />
              New Venture
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Venture</DialogTitle>
              <DialogDescription>Fill in the details to add a new venture to your portfolio</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateVenture} className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter venture name"
                        />
                        {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="slug">
                          Slug <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          placeholder="enter-venture-slug"
                        />
                        {formErrors.slug && <p className="text-sm text-red-500">{formErrors.slug}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tagline">
                          Tagline <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="tagline"
                          name="tagline"
                          value={formData.tagline}
                          onChange={handleInputChange}
                          placeholder="Brief tagline (e.g. Workflow automation reimagined)"
                        />
                        {formErrors.tagline && <p className="text-sm text-red-500">{formErrors.tagline}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Comprehensive description of the venture"
                          rows={4}
                        />
                        {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          placeholder="e.g. SaaS, Fintech"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="scaling">Scaling</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="foundedYear">Founded Year</Label>
                        <Input
                          id="foundedYear"
                          name="foundedYear"
                          value={formData.foundedYear}
                          onChange={handleInputChange}
                          placeholder="e.g. 2022"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="teamSize">Team Size</Label>
                        <Input
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleInputChange}
                          placeholder="e.g. 12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="growth">Growth</Label>
                        <Input
                          id="growth"
                          name="growth"
                          value={formData.growth}
                          onChange={handleInputChange}
                          placeholder="e.g. +150% YoY"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics, Technologies, and Images */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Metrics</h3>
                    <div className="space-y-4">
                      {formData.metrics.map((metric, index) => (
                        <div key={index} className="grid grid-cols-5 gap-2 items-center">
                          <div className="col-span-2">
                            <Input
                              placeholder="Label (e.g. Active Users)"
                              value={metric.label}
                              onChange={(e) => handleMetricChange(index, "label", e.target.value)}
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              placeholder="Value (e.g. 10K+)"
                              value={metric.value}
                              onChange={(e) => handleMetricChange(index, "value", e.target.value)}
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => removeMetric(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={addMetric}>
                        <Plus className="h-4 w-4 mr-2" /> Add Metric
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Technologies</h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add technology (e.g. React)"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTechnology())}
                        />
                        <Button type="button" onClick={handleAddTechnology}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="px-2 py-1">
                            {tech}
                            <button
                              type="button"
                              className="ml-2 text-gray-500 hover:text-gray-700"
                              onClick={() => removeTechnology(tech)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Images</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <ImageUpload onImageUpload={handleLogoUpload} defaultImage={formData.logo} label="Company Logo" />
                      <ImageUpload
                        onImageUpload={handleFeaturedImageUpload}
                        defaultImage={formData.featuredImage}
                        label="Featured Image"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {formErrors.submit && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{formErrors.submit}</div>
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Venture"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search ventures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-emperor focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="scaling">Scaling</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-emperor" />
          <span className="ml-2 text-lg text-gray-600">Loading ventures...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p>{error}</p>
          <Button variant="outline" className="mt-2" onClick={fetchVentures}>
            Try Again
          </Button>
        </div>
      )}

      {/* Ventures List */}
      {!loading && !error && (
        <div className="grid gap-6">
          {ventures.map((venture) => (
            <Card key={venture._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo */}
                  <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {venture.logo ? (
                      <img
                        src={venture.logo || "/placeholder.svg"}
                        alt={`${venture.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Building className="h-12 w-12 text-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{venture.name}</h3>
                          <Badge className={getStatusColor(venture.status)}>{venture.status}</Badge>
                          {venture.category && (
                            <Badge variant="outline" className="text-xs">
                              {venture.category}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{venture.tagline || venture.shortDescription}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/ventures/${venture.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/ventures/${venture._id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteClick(venture)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Details */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Details</h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                          {venture.foundedYear && <div>Founded: {venture.foundedYear}</div>}
                          {venture.teamSize && <div>Team: {venture.teamSize} people</div>}
                          {venture.growth && <div>Growth: {venture.growth}</div>}
                          {venture.website && (
                            <a
                              href={venture.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-emperor hover:underline"
                            >
                              Website
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Metrics</h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          {venture.metrics && venture.metrics.length > 0 ? (
                            venture.metrics.map((metric, i) => (
                              <div key={i} className="text-gray-600">
                                <span className="font-medium text-purple-emperor">{metric.value}</span>{" "}
                                <span>{metric.label}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-400">No metrics added</span>
                          )}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {venture.technologies && venture.technologies.length > 0 ? (
                            venture.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-400">No technologies added</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && ventures.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ventures found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first venture"}
            </p>
            <Button className="bg-purple-emperor hover:bg-purple-emperor/90" onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Venture
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the venture "{ventureToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteVenture} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

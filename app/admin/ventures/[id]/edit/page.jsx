"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Loader2, Eye, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import ImageUpload from "@/app/components/admin/image-upload"

export default function EditVenture({ params }) {
  const router = useRouter()
  const [ventureId, setVentureId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
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

  // Resolve params and fetch venture data
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setVentureId(resolvedParams.id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (ventureId) {
      fetchVenture()
    }
  }, [ventureId])

  const fetchVenture = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/ventures/${ventureId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch venture")
      }

      const venture = await response.json()

      // Format data for form
      setFormData({
        name: venture.name || "",
        slug: venture.slug || "",
        description: venture.description || "",
        tagline: venture.tagline || "",
        category: venture.category || "SaaS",
        status: venture.status || "active",
        foundedYear: venture.foundedYear || "",
        teamSize: venture.teamSize || "",
        growth: venture.growth || "",
        website: venture.website || "",
        metrics: venture.metrics || [
          { label: "Active Users", value: "" },
          { label: "Projects", value: "" },
          { label: "Time Saved", value: "" },
        ],
        technologies: venture.technologies || [],
        logo: venture.logo || null,
        featuredImage: venture.featuredImage || null,
      })
    } catch (err) {
      console.error("Error fetching venture:", err)
      setError("Failed to load venture. Please try again.")
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setSaving(true)

      const response = await fetch(`/api/admin/ventures/${ventureId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update venture")
      }

      // Redirect back to ventures management page
      router.push("/admin/ventures")
    } catch (err) {
      console.error("Error updating venture:", err)
      setFormErrors((prev) => ({ ...prev, submit: err.message }))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-purple-emperor" />
        <span className="ml-2 text-lg text-gray-600">Loading venture...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/admin/ventures")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Error</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <p>{error}</p>
              <Button variant="outline" className="mt-2" onClick={() => router.push("/admin/ventures")}>
                Return to Ventures Management
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/admin/ventures")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Venture</h1>
            <p className="text-gray-600 mt-1">Update venture information and settings</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href={`/ventures/${formData.slug}`} target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="bg-purple-emperor hover:bg-purple-emperor/90">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Edit Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/ventures")}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-purple-emperor hover:bg-purple-emperor/90">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

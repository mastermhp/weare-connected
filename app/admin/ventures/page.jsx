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
import { Plus, Edit, Trash2, Search, Eye, Star, Users } from "lucide-react"

const mockVentures = [
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    description: "Custom web applications and websites built with modern technologies",
    category: "Development",
    status: "Active",
    price: "$5,000 - $50,000",
    features: ["React/Next.js", "Node.js Backend", "Database Integration", "Responsive Design"],
    clients: 45,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: 2,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    category: "Development",
    status: "Active",
    price: "$10,000 - $100,000",
    features: ["React Native", "Flutter", "Native iOS/Android", "API Integration"],
    clients: 32,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: 3,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "User-centered design solutions for digital products",
    category: "Design",
    status: "Active",
    price: "$3,000 - $25,000",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    clients: 28,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-22",
  },
  {
    id: 4,
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Comprehensive digital marketing strategies and campaigns",
    category: "Marketing",
    status: "Paused",
    price: "$2,000 - $15,000",
    features: ["SEO Optimization", "Social Media", "Content Marketing", "PPC Campaigns"],
    clients: 18,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
]

export default function VenturesPage() {
  const [ventures, setVentures] = useState(mockVentures)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const categories = ["All", "Development", "Design", "Marketing", "Consulting"]

  const filteredVentures = ventures.filter((venture) => {
    const matchesSearch =
      venture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venture.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || venture.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ventures Management</h1>
          <p className="text-gray-600 mt-1">Manage your services and business ventures</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#6529B2] hover:bg-[#5420A0] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Venture
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Venture</DialogTitle>
              <DialogDescription>Add a new service or business venture to your portfolio</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter venture title" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Consulting</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter venture description" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price Range</Label>
                  <Input id="price" placeholder="e.g., $5,000 - $50,000" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Active</option>
                    <option>Paused</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#6529B2] hover:bg-[#5420A0] text-white">Create Venture</Button>
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
                <p className="text-sm font-medium text-gray-600">Total Ventures</p>
                <p className="text-2xl font-bold text-gray-900">{ventures.length}</p>
              </div>
              <div className="p-3 bg-[#6529B2] bg-opacity-10 rounded-full">
                <Eye className="w-6 h-6 text-[#6529B2]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ventures.filter((v) => v.status === "Active").length}
                </p>
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
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{ventures.reduce((sum, v) => sum + v.clients, 0)}</p>
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
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search ventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-[#6529B2] hover:bg-[#5420A0]" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ventures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVentures.map((venture) => (
          <Card key={venture.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={venture.image || "/placeholder.svg"}
                alt={venture.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{venture.title}</h3>
                  <Badge className={getStatusColor(venture.status)}>{venture.status}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{venture.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{venture.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Price Range:</span>
                  <span className="font-medium text-[#6529B2]">{venture.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Clients:</span>
                  <span className="font-medium">{venture.clients}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {venture.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {venture.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{venture.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVentures.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ventures found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

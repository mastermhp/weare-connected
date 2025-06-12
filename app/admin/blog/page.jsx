"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar, User, MoreHorizontal, FileText } from "lucide-react"

const mockBlogPosts = [
  {
    id: 1,
    title: "The Future of Web Development in 2024",
    slug: "future-web-development-2024",
    author: "John Doe",
    status: "published",
    category: "Technology",
    publishedAt: "2024-01-15",
    views: 1250,
    excerpt: "Exploring the latest trends and technologies shaping web development...",
  },
  {
    id: 2,
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-applications",
    author: "Jane Smith",
    status: "draft",
    category: "Development",
    publishedAt: null,
    views: 0,
    excerpt: "Best practices for creating maintainable React applications...",
  },
  {
    id: 3,
    title: "UI/UX Design Trends for Modern Websites",
    slug: "ui-ux-design-trends-modern-websites",
    author: "Mike Johnson",
    status: "published",
    category: "Design",
    publishedAt: "2024-01-10",
    views: 890,
    excerpt: "Latest design trends that are shaping user experiences...",
  },
  {
    id: 4,
    title: "The Rise of AI in Web Development",
    slug: "rise-of-ai-web-development",
    author: "Sarah Wilson",
    status: "scheduled",
    category: "AI",
    publishedAt: "2024-01-20",
    views: 0,
    excerpt: "How artificial intelligence is revolutionizing web development...",
  },
]

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPosts = mockBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage your blog posts</p>
        </div>
        <Button className="bg-purple-emperor hover:bg-purple-emperor/90" asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search posts..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                    <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.publishedAt || "Not published"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views} views</span>
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first blog post"}
            </p>
            <Button className="bg-purple-emperor hover:bg-purple-emperor/90" asChild>
              <Link href="/admin/blog/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

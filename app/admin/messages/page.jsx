"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Mail,
  MailOpen,
  Reply,
  Archive,
  Trash2,
  Star,
  Calendar,
  User,
  Building,
  Phone,
  Send,
} from "lucide-react"

const mockMessages = [
  {
    id: 1,
    name: "John Smith",
    email: "john@techcorp.com",
    company: "TechCorp Inc.",
    phone: "+1 (555) 123-4567",
    subject: "Partnership Opportunity",
    message:
      "Hi, I'm interested in discussing a potential partnership between our companies. We're looking for innovative solutions in the web development space...",
    status: "unread",
    priority: "high",
    receivedAt: "2024-01-15T10:30:00Z",
    tags: ["partnership", "business"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@startup.io",
    company: "StartupIO",
    phone: "+1 (555) 987-6543",
    subject: "Project Inquiry",
    message:
      "We're a growing startup looking for help with our mobile app development. Could we schedule a call to discuss our requirements?",
    status: "read",
    priority: "medium",
    receivedAt: "2024-01-14T15:45:00Z",
    tags: ["project", "mobile"],
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@email.com",
    company: "",
    phone: "",
    subject: "Career Opportunities",
    message:
      "I'm a senior developer with 8 years of experience. I'd love to learn more about career opportunities at Connected.",
    status: "replied",
    priority: "low",
    receivedAt: "2024-01-13T09:15:00Z",
    tags: ["career", "hiring"],
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily@designstudio.com",
    company: "Design Studio",
    phone: "+1 (555) 456-7890",
    subject: "Collaboration Request",
    message:
      "We're impressed by your recent work and would like to explore collaboration opportunities for our upcoming projects.",
    status: "unread",
    priority: "high",
    receivedAt: "2024-01-12T14:20:00Z",
    tags: ["collaboration", "design"],
  },
]

export default function MessagesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState("")

  const filteredMessages = mockMessages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-gray-100 text-gray-800"
      case "replied":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleReply = () => {
    // Handle reply logic here
    console.log("Replying to:", selectedMessage.email, "Message:", replyText)
    setReplyText("")
    setSelectedMessage(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Manage contact form submissions and customer inquiries</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-blue-600">
            {mockMessages.filter((m) => m.status === "unread").length} Unread
          </Badge>
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive All Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
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
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="grid gap-4">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`hover:shadow-lg transition-shadow cursor-pointer ${
              message.status === "unread" ? "border-l-4 border-l-blue-500" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      {message.status === "unread" ? (
                        <Mail className="h-5 w-5 text-blue-600" />
                      ) : (
                        <MailOpen className="h-5 w-5 text-gray-400" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                    </div>
                    <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                    <Star className={`h-4 w-4 ${getPriorityColor(message.priority)}`} />
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{message.email}</span>
                    </div>
                    {message.company && (
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{message.company}</span>
                      </div>
                    )}
                    {message.phone && (
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{message.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(message.receivedAt)}</span>
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2">{message.subject}</h4>
                  <p className="text-gray-600 mb-3 line-clamp-2">{message.message}</p>

                  <div className="flex items-center space-x-2">
                    {message.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(message)}>
                        <Reply className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Reply to {message.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Original Message:</h4>
                          <p className="text-sm text-gray-600">{message.message}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply:</label>
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply here..."
                            rows={6}
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-purple-emperor hover:bg-purple-emperor/90" onClick={handleReply}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No messages have been received yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

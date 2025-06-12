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
import { Plus, Edit, Trash2, Search, Mail, Linkedin, Twitter, Github, MapPin, Calendar, Users } from "lucide-react"

const mockTeamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO & Founder",
    department: "Leadership",
    email: "sarah@company.com",
    bio: "Visionary leader with 15+ years of experience in tech startups and product development.",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "San Francisco, CA",
    joinDate: "2020-01-15",
    status: "Active",
    skills: ["Leadership", "Strategy", "Product Management", "Fundraising"],
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      github: null,
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    department: "Engineering",
    email: "michael@company.com",
    bio: "Full-stack engineer passionate about scalable architecture and emerging technologies.",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Remote",
    joinDate: "2020-02-01",
    status: "Active",
    skills: ["React", "Node.js", "AWS", "System Architecture"],
    social: {
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen",
      github: "https://github.com/michaelchen",
    },
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Head of Design",
    department: "Design",
    email: "emily@company.com",
    bio: "Creative designer focused on user-centered design and creating delightful experiences.",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "New York, NY",
    joinDate: "2020-03-15",
    status: "Active",
    skills: ["UI/UX Design", "Figma", "User Research", "Design Systems"],
    social: {
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      twitter: "https://twitter.com/emilyrodriguez",
      github: null,
    },
  },
  {
    id: 4,
    name: "David Kim",
    role: "Senior Developer",
    department: "Engineering",
    email: "david@company.com",
    bio: "Backend specialist with expertise in microservices and database optimization.",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Seattle, WA",
    joinDate: "2021-01-10",
    status: "Active",
    skills: ["Python", "PostgreSQL", "Docker", "Kubernetes"],
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      twitter: null,
      github: "https://github.com/davidkim",
    },
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Manager",
    department: "Marketing",
    email: "lisa@company.com",
    bio: "Growth-focused marketer with a passion for data-driven campaigns and brand building.",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "Austin, TX",
    joinDate: "2021-06-01",
    status: "On Leave",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    social: {
      linkedin: "https://linkedin.com/in/lisathompson",
      twitter: "https://twitter.com/lisathompson",
      github: null,
    },
  },
]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const departments = ["All", "Leadership", "Engineering", "Design", "Marketing", "Sales", "Operations"]
  const statuses = ["All", "Active", "On Leave", "Inactive"]

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || member.department === selectedDepartment
    const matchesStatus = selectedStatus === "All" || member.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Inactive":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDepartmentColor = (department) => {
    switch (department) {
      case "Leadership":
        return "bg-purple-100 text-purple-800"
      case "Engineering":
        return "bg-blue-100 text-blue-800"
      case "Design":
        return "bg-pink-100 text-pink-800"
      case "Marketing":
        return "bg-green-100 text-green-800"
      case "Sales":
        return "bg-orange-100 text-orange-800"
      case "Operations":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">Manage team members and their information</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#6529B2] hover:bg-[#5420A0] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Add a new member to your team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="e.g., Senior Developer" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Leadership</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Operations</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., San Francisco, CA" />
                </div>
                <div>
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Brief description about the team member..." rows={3} />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input id="skills" placeholder="React, Node.js, AWS, Leadership..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input id="twitter" placeholder="https://twitter.com/..." />
                </div>
                <div>
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input id="github" placeholder="https://github.com/..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#6529B2] hover:bg-[#5420A0] text-white">Add Member</Button>
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
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
              </div>
              <div className="p-3 bg-[#6529B2] bg-opacity-10 rounded-full">
                <Users className="w-6 h-6 text-[#6529B2]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter((m) => m.status === "Active").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(teamMembers.map((m) => m.department)).size}</p>
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
                <p className="text-sm font-medium text-gray-600">Remote Workers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter((m) => m.location === "Remote").length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <MapPin className="w-6 h-6 text-yellow-600" />
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
                  placeholder="Search team members..."
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
                    {dept} {dept !== "All" ? "Department" : ""}
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
                    {status} {status !== "All" ? "Status" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                  </div>
                  <Badge className={getDepartmentColor(member.department)} variant="secondary">
                    {member.department}
                  </Badge>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {member.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(member.joinDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {member.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{member.skills.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {member.social.linkedin && (
                    <Button size="sm" variant="outline" className="p-2">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                  {member.social.twitter && (
                    <Button size="sm" variant="outline" className="p-2">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  )}
                  {member.social.github && (
                    <Button size="sm" variant="outline" className="p-2">
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
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

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

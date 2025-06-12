"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Eye,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const stats = [
  {
    title: "Total Visitors",
    value: "24,567",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
    color: "text-blue-600",
  },
  {
    title: "Blog Posts",
    value: "156",
    change: "+3",
    trend: "up",
    icon: FileText,
    color: "text-purple-emperor",
  },
  {
    title: "Active Jobs",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Briefcase,
    color: "text-green-600",
  },
  {
    title: "New Messages",
    value: "47",
    change: "+8",
    trend: "up",
    icon: MessageSquare,
    color: "text-orange-600",
  },
  {
    title: "Team Members",
    value: "28",
    change: "+1",
    trend: "up",
    icon: Users,
    color: "text-cobalite",
  },
  {
    title: "Revenue",
    value: "$125,430",
    change: "-2.3%",
    trend: "down",
    icon: DollarSign,
    color: "text-red-600",
  },
]

const recentActivity = [
  {
    action: "New blog post published",
    title: "Future of Web Development 2024",
    time: "2 hours ago",
    type: "blog",
  },
  {
    action: "Job application received",
    title: "Senior Frontend Developer",
    time: "4 hours ago",
    type: "job",
  },
  {
    action: "Contact form submission",
    title: "Partnership inquiry from TechCorp",
    time: "6 hours ago",
    type: "message",
  },
  {
    action: "New team member added",
    title: "Sarah Johnson - UX Designer",
    time: "1 day ago",
    type: "team",
  },
  {
    action: "Venture updated",
    title: "EcoTech Solutions case study",
    time: "2 days ago",
    type: "venture",
  },
]

const quickActions = [
  { title: "Create Blog Post", href: "/admin/blog/new", color: "bg-purple-emperor" },
  { title: "Add Job Listing", href: "/admin/jobs/new", color: "bg-cobalite" },
  { title: "Upload Media", href: "/admin/media", color: "bg-green-600" },
  { title: "View Messages", href: "/admin/messages", color: "bg-orange-600" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your website.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button className="bg-purple-emperor hover:bg-purple-emperor/90">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ml-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "blog"
                        ? "bg-purple-emperor"
                        : activity.type === "job"
                          ? "bg-cobalite"
                          : activity.type === "message"
                            ? "bg-orange-600"
                            : activity.type === "team"
                              ? "bg-green-600"
                              : "bg-blue-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.title}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Button key={action.title} className={`w-full justify-start ${action.color} hover:opacity-90`} asChild>
                  <a href={action.href}>{action.title}</a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

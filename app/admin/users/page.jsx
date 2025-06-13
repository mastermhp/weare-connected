"use client"

import { useState } from "react"
import { UserX, UserCheck, Trash2, Search } from "lucide-react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      profileImage: "/placeholder.svg?height=40&width=40",
      isActive: true,
      createdAt: "2023-05-15T10:30:00Z",
      lastLogin: "2023-06-10T14:22:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      profileImage: "/placeholder.svg?height=40&width=40",
      isActive: true,
      createdAt: "2023-04-20T09:15:00Z",
      lastLogin: "2023-06-12T11:45:00Z",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      profileImage: "/placeholder.svg?height=40&width=40",
      isActive: false,
      createdAt: "2023-03-10T16:20:00Z",
      lastLogin: "2023-05-05T08:30:00Z",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      profileImage: "/placeholder.svg?height=40&width=40",
      isActive: true,
      createdAt: "2023-06-01T13:45:00Z",
      lastLogin: "2023-06-11T19:10:00Z",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael@example.com",
      profileImage: "/placeholder.svg?height=40&width=40",
      isActive: true,
      createdAt: "2023-02-28T11:20:00Z",
      lastLogin: "2023-06-09T15:30:00Z",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleToggleStatus = (userId) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)))

    // In a real app, you would call an API here
    // Example:
    // const toggleUserStatus = async (userId, newStatus) => {
    //   const response = await fetch(`/api/admin/users/${userId}/status`, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ isActive: newStatus })
    //   });
    //   if (!response.ok) throw new Error('Failed to update user status');
    //   return response.json();
    // };
  }

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to permanently delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))

      // In a real app, you would call an API here
      // Example:
      // const deleteUser = async (userId) => {
      //   const response = await fetch(`/api/admin/users/${userId}`, {
      //     method: 'DELETE'
      //   });
      //   if (!response.ok) throw new Error('Failed to delete user');
      //   return response.json();
      // };
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-muted-foreground">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.profileImage || "/placeholder.svg"}
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-foreground">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`p-1 rounded-full ${
                            user.isActive
                              ? "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              : "text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          }`}
                          title={user.isActive ? "Deactivate user" : "Activate user"}
                        >
                          {user.isActive ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 rounded-full"
                          title="Delete user"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

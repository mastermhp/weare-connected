"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()

        if (data.authenticated) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      console.log(`Attempting user login for: ${email}`)

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error("Login error response:", errorData)
        throw new Error(errorData.message || "Login failed")
      }

      const data = await res.json()
      console.log("Login success response:", data)

      if (data.success) {
        // Refresh auth state
        const authCheck = await fetch("/api/auth/me")

        if (!authCheck.ok) {
          console.error("Auth check failed after login")
          throw new Error("Authentication failed")
        }

        const authData = await authCheck.json()

        if (authData.authenticated) {
          setUser(authData.user)
          return { success: true }
        } else {
          throw new Error("Authentication failed")
        }
      } else {
        throw new Error(data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message }
    }
  }

  // Admin login function
  const adminLogin = async (username, password) => {
    try {
      console.log(`Attempting admin login for: ${username}`)

      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error("Admin login error response:", errorData)
        throw new Error(errorData.message || "Admin login failed")
      }

      const data = await res.json()
      console.log("Admin login success response:", data)

      if (data.success) {
        // Refresh auth state
        const authCheck = await fetch("/api/auth/me")

        if (!authCheck.ok) {
          console.error("Auth check failed after admin login")
          throw new Error("Authentication failed")
        }

        const authData = await authCheck.json()

        if (authData.authenticated) {
          setUser(authData.user)
          return { success: true }
        } else {
          throw new Error("Authentication failed")
        }
      } else {
        throw new Error(data.message || "Admin login failed")
      }
    } catch (error) {
      console.error("Admin login error:", error)
      return { success: false, error: error.message }
    }
  }

  // Signup function
  const signup = async (userData) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Signup failed")
      }

      return { success: true }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, error: error.message }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Check if user is admin
  const isAdmin = user?.role === "admin"

  const value = {
    user,
    loading,
    login,
    adminLogin,
    signup,
    logout,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

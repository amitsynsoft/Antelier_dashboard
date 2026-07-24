"use client"

import * as React from "react"
import { currentUser } from "@/mock/dashboard-data"
import { UserProfile } from "@/types"

interface AuthContextType {
  isAuthenticated: boolean
  isFirstLogin: boolean
  user: UserProfile
  login: (email: string, isFirstTime?: boolean) => void
  logout: () => void
  setFirstLoginState: (val: boolean) => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = "antelier_auth_state_v1"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(true)
  const [isFirstLogin, setIsFirstLogin] = React.useState<boolean>(false)
  const [isHydrated, setIsHydrated] = React.useState(false)

  // Hydrate auth state safely after client mount to prevent SSR hydration errors
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setIsAuthenticated(Boolean(parsed.isAuthenticated))
        setIsFirstLogin(Boolean(parsed.isFirstLogin))
      }
    } catch (e) {
      console.error("Error loading auth state", e)
    }
    setIsHydrated(true)
  }, [])

  // Auto-save auth changes to localStorage after initial hydration
  React.useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ isAuthenticated, isFirstLogin })
      )
    } catch (e) {
      console.error("Error saving auth state", e)
    }
  }, [isAuthenticated, isFirstLogin, isHydrated])

  const login = (email: string, isFirstTime: boolean = false) => {
    setIsAuthenticated(true)
    setIsFirstLogin(isFirstTime)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const setFirstLoginState = (val: boolean) => {
    setIsFirstLogin(val)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isFirstLogin,
        user: currentUser,
        login,
        logout,
        setFirstLoginState
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

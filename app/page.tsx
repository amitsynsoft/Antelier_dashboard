"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function RootPage() {
  const router = useRouter()
  const { isAuthenticated, isFirstLogin } = useAuth()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    if (!isAuthenticated) {
      router.replace("/login")
    } else if (isFirstLogin) {
      router.replace("/workspace-setup")
    } else {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, isFirstLogin, router, mounted])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-muted-foreground text-xs font-mono">
      Initializing AntelierHub Workspace Route...
    </div>
  )
}

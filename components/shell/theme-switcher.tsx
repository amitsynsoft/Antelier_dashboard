"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-lg bg-muted/40 animate-pulse border border-border/50" />
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground shadow-2xs transition-all hover:bg-muted/60 hover:text-foreground focus:ring-2 focus:ring-ring focus:outline-none",
        className
      )}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-purple-400 transition-all" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

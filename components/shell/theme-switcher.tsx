"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Laptop } from "lucide-react"
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
    if (theme === "dark") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("system")
    } else {
      setTheme("dark")
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
      title={`Current theme: ${theme}. Click to change (HotKey: D)`}
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-purple-400 transition-all" />
      ) : theme === "light" ? (
        <Sun className="h-4 w-4 text-amber-500 transition-all" />
      ) : (
        <Laptop className="h-4 w-4 text-blue-500 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

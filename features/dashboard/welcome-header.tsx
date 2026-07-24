"use client"

import * as React from "react"
import { Sparkles, ChevronDown } from "lucide-react"

interface WelcomeHeaderProps {
  onTestAi?: () => void
}

export function WelcomeHeader({ onTestAi }: WelcomeHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-1">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          Welcome back, Alexandra <span className="animate-bounce inline-block">👋</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your AI workspace today.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onTestAi}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-2xs hover:opacity-95 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          <span>Test AI Assistant</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-80" />
        </button>
      </div>
    </div>
  )
}

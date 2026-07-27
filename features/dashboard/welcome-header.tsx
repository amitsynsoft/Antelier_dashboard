"use client"

import * as React from "react"
import { useWorkspace } from "@/context/workspace-context"
import { Sparkles, Building2 } from "lucide-react"

interface WelcomeHeaderProps {
  onTestAi?: () => void
}

export function WelcomeHeader({ onTestAi }: WelcomeHeaderProps) {
  const { state } = useWorkspace()

  return (
    <div className="flex flex-col gap-4 border-b border-border/50 py-1 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-1 flex items-center gap-2">
          {state.businessProfile.companyName && (
            <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
              <Building2 className="h-3.5 w-3.5" />
              {state.businessProfile.companyName}
            </span>
          )}
        </div>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back, Alexandra{" "}
          <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          {state.businessProfile.primaryIntakeGoal}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onTestAi}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-2xs transition-all hover:opacity-95 sm:text-sm"
        >
          <Sparkles className="h-4 w-4" />
          <span>Launch AI Simulator</span>
        </button>
      </div>
    </div>
  )
}

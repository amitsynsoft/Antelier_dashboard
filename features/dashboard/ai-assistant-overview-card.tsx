"use client"

import * as React from "react"
import { aiAssistantOverviewMock } from "@/mock/dashboard-data"
import { ArrowRight, Bot } from "lucide-react"

export function AiAssistantOverviewCard() {
  const data = aiAssistantOverviewMock

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">
          AI Assistant Overview
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {data.status}
        </span>
      </div>

      {/* Assistant Identity Box */}
      <div className="flex items-center gap-3.5 p-3 rounded-xl border border-border/60 bg-muted/30">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-2xs">
          A
        </div>
        <div className="space-y-0.5 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-foreground tracking-tight">
              {data.name}
            </span>
            <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold text-muted-foreground">
              {data.version}
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{data.role}</p>
        </div>
      </div>

      {/* Parameters Table */}
      <div className="divide-y divide-border/50 text-xs sm:text-sm">
        <div className="py-2.5 flex items-center justify-between">
          <span className="text-muted-foreground">Tone</span>
          <span className="font-semibold text-foreground">{data.tone}</span>
        </div>
        <div className="py-2.5 flex items-center justify-between">
          <span className="text-muted-foreground">Language</span>
          <span className="font-semibold text-foreground">{data.language}</span>
        </div>
        <div className="py-2.5 flex items-center justify-between">
          <span className="text-muted-foreground">Prompt Version</span>
          <span className="font-semibold text-foreground">{data.promptVersion}</span>
        </div>
        <div className="py-2.5 flex items-center justify-between">
          <span className="text-muted-foreground">Last Tested</span>
          <span className="font-semibold text-foreground">{data.lastTested}</span>
        </div>
      </div>

      {/* Footer CTA Button */}
      <a
        href="#prompt-studio"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary shadow-2xs hover:bg-primary hover:text-primary-foreground transition-all"
      >
        <span>Open Prompt Studio</span>
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

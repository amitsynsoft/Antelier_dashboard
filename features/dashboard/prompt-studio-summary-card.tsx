"use client"

import * as React from "react"
import { promptStudioSummaryMock } from "@/mock/dashboard-data"
import { ArrowRight, Sliders } from "lucide-react"

export function PromptStudioSummaryCard() {
  const data = promptStudioSummaryMock

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Prompt Studio</h3>
        <a
          href="#prompt-studio"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </a>
      </div>

      {/* Personality Banner */}
      <div className="p-3 rounded-xl border border-border/60 bg-muted/20 space-y-1">
        <p className="text-xs text-muted-foreground font-medium">
          Current Personality
        </p>
        <p className="text-base font-extrabold text-foreground tracking-tight">
          {data.personality}
        </p>
      </div>

      {/* 3 Metric Box Columns */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
          <p className="text-[11px] text-muted-foreground font-medium">Rules</p>
          <p className="text-base font-bold text-foreground mt-0.5">
            {data.rulesCount}
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
          <p className="text-[11px] text-muted-foreground font-medium">Restrictions</p>
          <p className="text-base font-bold text-foreground mt-0.5">
            {data.restrictionsCount}
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
          <p className="text-[11px] text-muted-foreground font-medium">Escalations</p>
          <p className="text-base font-bold text-foreground mt-0.5">
            {data.escalationsCount}
          </p>
        </div>
      </div>

      {/* Required Info */}
      <div className="flex items-center justify-between text-xs sm:text-sm py-1">
        <span className="text-muted-foreground">Required Info</span>
        <span className="font-semibold text-foreground">{data.requiredInfo}</span>
      </div>

      {/* Footer CTA Button */}
      <a
        href="#prompt-studio"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary shadow-2xs hover:bg-primary hover:text-primary-foreground transition-all"
      >
        <span>Edit Prompt</span>
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

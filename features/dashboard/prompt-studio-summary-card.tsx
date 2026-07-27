"use client"

import * as React from "react"
import { useWorkspace } from "@/context/workspace-context"
import { ArrowRight, Sliders } from "lucide-react"

export function PromptStudioSummaryCard() {
  const { state } = useWorkspace()
  const ai = state.aiAssistant
  const bp = state.businessProfile

  const brandToneTitle = bp.brandTone
    ? bp.brandTone.charAt(0).toUpperCase() + bp.brandTone.slice(1)
    : "Consultative"

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">Prompt Studio</h3>
        <a
          href="#prompt-studio"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Manage Rules
        </a>
      </div>

      {/* Personality Banner */}
      <div className="p-3 rounded-xl border border-border/60 bg-muted/20 space-y-1">
        <p className="text-xs text-muted-foreground font-medium">
          Active AI Persona Brand Tone
        </p>
        <p className="text-base font-extrabold text-foreground tracking-tight">
          {brandToneTitle} Tone & Style
        </p>
      </div>

      {/* 3 Metric Box Columns */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
          <p className="text-[11px] text-muted-foreground font-medium">Rules</p>
          <p className="text-base font-bold text-foreground mt-0.5">
            {ai.systemPrompt.trim() ? "Custom" : "Standard"}
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
          <p className="text-[11px] text-muted-foreground font-medium">Handoff</p>
          <p className="text-base font-bold text-primary mt-0.5 font-mono">
            {ai.handoffScoreThreshold}
          </p>
        </div>
        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
          <p className="text-[11px] text-muted-foreground font-medium">Agent</p>
          <p className="text-base font-bold text-foreground mt-0.5 truncate px-1">
            {ai.agentName.trim() || "Ava"}
          </p>
        </div>
      </div>

      {/* Required Info */}
      <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-t border-border/40 pt-2">
        <span className="text-muted-foreground">Target Industry</span>
        <span className="font-semibold text-foreground truncate max-w-[140px]">{bp.industry || "Enterprise"}</span>
      </div>

      {/* Footer CTA Button */}
      <a
        href="#prompt-studio"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary shadow-2xs hover:bg-primary hover:text-primary-foreground transition-all"
      >
        <span>Edit Prompt Studio</span>
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

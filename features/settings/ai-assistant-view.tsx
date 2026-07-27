"use client"

import * as React from "react"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { AiAssistantForm } from "@/components/forms/ai-assistant-form"
import { Sliders } from "lucide-react"

export function AiAssistantView() {
  return (
    <AppPage>
      <PageHeader
        title="Prompt Studio & AI Assistant Configuration"
        subtitle="Configure system prompts, persona tone, model selection, and escalation thresholds."
        icon={<Sliders className="h-5 w-5" />}
      />

      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
        <AiAssistantForm />
      </div>
    </AppPage>
  )
}

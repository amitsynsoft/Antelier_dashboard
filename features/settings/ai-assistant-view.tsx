"use client"

import * as React from "react"
import { AppPage, PageHeader } from "@/components/layout/app-page"
import { AiAssistantForm } from "@/components/forms/ai-assistant-form"
import { Sliders, Check } from "lucide-react"

export function AiAssistantView() {
  const [savedNotice, setSavedNotice] = React.useState(false)

  const triggerSaveNotice = () => {
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  return (
    <AppPage>
      <PageHeader
        title="Prompt Studio & AI Assistant Configuration"
        subtitle="Configure system prompts, persona tone, model selection, and escalation thresholds."
        icon={<Sliders className="h-5 w-5" />}
        badge={
          savedNotice ? (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
              <Check className="h-3.5 w-3.5" />
              Auto-saved
            </span>
          ) : undefined
        }
      />

      <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs">
        <AiAssistantForm onSavedNotice={triggerSaveNotice} />
      </div>
    </AppPage>
  )
}
